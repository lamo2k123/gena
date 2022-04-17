const { readFileSync } = require('fs');
const { join, normalize } = require('path');
const SwaggerParser = require('@apidevtools/swagger-parser');
const Ajv = require('ajv');
const { compile } = require('json-schema-to-typescript');
const { ESLint } = require('eslint');

const config = require('./config.json');

const OUTPUT = join(__dirname, './../../../src/adapters/api');

const normalizeJSON = (json) => {
    if(typeof json === 'object' && json !== null) {
        if(json.type === 'object') {
            json.additionalProperties = false;
        }

        const keys = Object.keys(json);

        for(const key of keys) {
            if(key === 'title' || json[key]?.additionalProperties === false) {
                delete json[key];
            }

            normalizeJSON(json[key]);
        }
    }

    return json;
};

module.exports = (plop) => {
    const helpers = {
        camelCase: plop.getHelper('camelCase')
    };

    const store = {
        target   : '',
        swagger  : {},
        answers  : {},
        endpoints: [],
        collector: {}
    };

    plop.setGenerator('api', {
        description: 'Генерация адаптера API',
        prompts: async (inquirer) => {
            inquirer.registerPrompt('checkbox-plus', require('inquirer-checkbox-plus-prompt'));

            await inquirer
                .prompt([{
                    type   : 'input',
                    name   : 'host',
                    message: 'Укажите адрес на схему OpenAPI 3.0 (Пример: https://example.com/openapi.json):',
                    validate: async (input) => {
                        if(!input) {
                            return false;
                        }

                        store.swagger = await SwaggerParser.parse(input);

                        return true;
                    }
                }])
                .then((payload) => {
                    if(!store.answers[payload.host]) {
                        store.answers[payload.host] = {};
                    }

                    store.target = payload.host;
                });

            if(store.swagger.paths) {
                store.endpoints = Object
                    .keys(store.swagger.paths)
                    .reduce((accumulator, endpoint) => {
                        Object
                            .keys(store.swagger.paths[endpoint])
                            .forEach((method) => {
                                accumulator.push({
                                    name: `${endpoint} [${method}]`,
                                    endpoint,
                                    method
                                });
                            });

                        return accumulator;
                    }, []);

                await inquirer
                    .prompt([{
                        type      : 'checkbox-plus',
                        name      : 'endpoints',
                        message   : 'Выберите необходимые энпоинты (поиск по строке):',
                        pageSize  : 12,
                        highlight : true,
                        searchable: true,
                        default   : config[store.target].endpoints,
                        source    : async (answers, input = '') => {
                            return store.endpoints.map(({ name }) => name).filter((name) => name.includes(input.toLowerCase()));
                        }
                    }])
                    .then((payload) => {
                        store.answers[store.target] = {
                            ...store.answers[store.target],
                            ...payload
                        }
                    });
            }

            if(!config[store.target]?.['proxy-path']) {
                await inquirer
                    .prompt([{
                        type   : 'input',
                        name   : 'proxy-path',
                        message: 'Укажите прокси путь:',
                        validate: (input) => !!input
                    }])
                    .then((payload) => {
                        store.answers[store.target] = {
                            ...store.answers[store.target],
                            ...payload
                        }
                    });
            } else {
                store.answers[store.target]['proxy-path'] = config[store.target]['proxy-path'];
            }

            if(JSON.stringify(config) !== JSON.stringify(store.answers)) {
                await inquirer
                    .prompt([{
                        type   : 'confirm',
                        name   : 'config',
                        message: 'Хотите сохранить обновление конфигурации',
                        default: true
                    }])
                    .then((payload) => {
                        store.answers = {
                            ...store.answers,
                            ...payload
                        }
                    });
            }

            return store.answers;
        },
        actions: (answers) => {
            const result = [];

            if(answers.config) {
                const { config, ...payload } = answers;

                result.push({
                    type    : 'add',
                    force   : true,
                    path    : join(__dirname, 'config.json'),
                    template: JSON.stringify(payload, null, 4)
                })
            }

            result.push(
                async () => {
                    store.swagger = await SwaggerParser.dereference(store.swagger);

                    return 'Разворачивание JSON схем.';
                },
                (answers) => {
                    store.collector = answers[store.target].endpoints.reduce((accumulator, name) => {
                        const item = store.endpoints.find((endpoint) => endpoint.name === name);

                        if(item && store.swagger.paths[item.endpoint]) {
                            const endpoint = store.swagger.paths[item.endpoint][item.method];

                            Object
                                .keys(endpoint.responses)
                                .forEach((key) => {
                                    if(!accumulator[item.endpoint]) {
                                        accumulator[item.endpoint] = {};
                                    }

                                    if(!accumulator[item.endpoint][item.method]) {
                                        accumulator[item.endpoint][item.method] = {};
                                    }

                                    if(endpoint.responses[key]?.content?.['application/json']?.schema) {
                                        accumulator[item.endpoint][item.method][key] = endpoint.responses[key].content['application/json'].schema;
                                    }
                                });

                            if(item.method === 'get') {
                                if(endpoint.parameters) {
                                    const schema = endpoint.parameters.reduce((accumulator, current) => {
                                        if(current.required) {
                                            accumulator.required.push(current.name);
                                        }

                                        accumulator.properties[current.name] = { type: current.schema.type };

                                        return accumulator;
                                    }, {
                                        properties: {},
                                        required  : [],
                                        type      : 'object'
                                    });

                                    if(schema) {
                                        accumulator[item.endpoint][item.method]['parameters'] = schema;
                                    }
                                }
                            } else if(item.method === 'post' || item.method === 'patch') {
                                if(endpoint?.requestBody?.content?.['application/json']?.schema) {
                                    const schema = endpoint.requestBody?.content?.['application/json']?.schema;

                                    if(schema) {
                                        accumulator[item.endpoint][item.method]['parameters'] = schema;
                                    }
                                }
                            }
                        }

                        return accumulator;
                    }, {});

                    return 'Сборка эндпоинтов';
                },
                () => {
                    store.collector = normalizeJSON(store.collector);

                    return 'Нормализация JSON схем.';
                },
                () => {
                    const keys = Object.keys(store.collector);
                    const ajv = new Ajv({
                        nullable : true,
                        allErrors: true
                    });

                    for(const key of keys) {
                        ajv.validateSchema(store.collector[key])
                    }

                    return 'Валидация JSON схем.';
                },
                {
                    path        : join(OUTPUT, 'index.ts'),
                    templateFile: './generators/api/templates/index.ts.hbs',
                    type        : 'add',
                    skipIfExists: true
                },
                async () => {
                    const mainFile = readFileSync(join(OUTPUT, 'index.ts'), { encoding: 'utf8' });

                    for(const path in store.collector) {
                        for(const method in store.collector[path]) {
                            const types = [];
                            const importPath = normalize(`${store.answers[store.target]['proxy-path']}/${path}/${method}`);
                            const nameFunction = helpers.camelCase(importPath.replace(/all/, ''));

                            for(const key in store.collector[path][method]) {
                                const prefix = store.collector[path][method][key].type === 'object' ? 'i' : 't';

                                types.push(
                                    await compile(store.collector[path][method][key], Number(key) ? `${prefix}-code-${key}` : `${prefix}-${key}`, {
                                        bannerComment         : '',
                                        unreachableDefinitions: true,
                                        strictIndexSignatures : true,
                                        style                 : {
                                            printWidth : Infinity,
                                            singleQuote: true,
                                            tabWidth   : 4
                                        }
                                    })
                                );

                                result.push({
                                    path    : join(OUTPUT, store.answers[store.target]['proxy-path'], path, method, `${key}.json`),
                                    template: JSON.stringify(store.collector[path][method][key], null, 4),
                                    type    : 'add',
                                    force   : true
                                });
                            }

                            const importTemplate = `import { ${nameFunction} } from './${importPath}';`;

                            const reImport = new RegExp(`import { ${nameFunction}.* } from './${importPath}';`);

                            if(!reImport.test(mainFile)) {
                                result.push({
                                    path    : join(OUTPUT, 'index.ts'),
                                    template: importTemplate,
                                    pattern : '/* PLACEHOLDER: imports */',
                                    type    : 'append'
                                });
                            }

                            const reFunction = new RegExp(`: ${nameFunction}(<.*>)?\\(builder`);

                            if(!reFunction.test(mainFile)) {
                                result.push({
                                    path    : join(OUTPUT, 'index.ts'),
                                    template: `${nameFunction}: ${nameFunction}(builder),`,
                                    pattern : '// PLACEHOLDER: endpoints',
                                    type    : 'append'
                                });
                            }

                            result.push({
                                path        : join(OUTPUT, store.answers[store.target]['proxy-path'], path, method, 'index.ts'),
                                templateFile: './generators/api/templates/endpoint.ts.hbs',
                                type        : 'add',
                                force       : true,
                                data        : {
                                    types        : types.join('\n').trim(),
                                    method       : method.toUpperCase(),
                                    endpoint     : normalize(`/${store.answers[store.target]['proxy-path'] + path}`),
                                    isMutation   : ['PATCH', 'PUT', 'POST', 'DELETE'].includes(method.toUpperCase()),
                                    isCode200    : !!store.collector[path][method]['200'],
                                    prefixCode200: store.collector[path][method]['200']?.type === 'object' ? 'I' : 'T',
                                    isParameters : !!store.collector[path][method].parameters,
                                    nameFunction
                                }
                            });
                        }
                    }

                    return 'Сверка файлов JSON схем.';
                },
                () => {
                    result.push(
                        async () => {
                            const eslint = new ESLint({ fix: true });
                            const results = await eslint.lintFiles([join(OUTPUT, '**/*.ts')]);

                            await ESLint.outputFixes(results);

                            return 'Форматирование по стайл гайду';
                        }
                    );

                    return 'Создание задачи на eslint';
                }
            );

            return result;
        }
    });
};
