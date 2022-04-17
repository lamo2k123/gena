const { join } = require('path');
const { readdirSync } = require('fs');

const DIR_GENERATORS = join(__dirname, 'generators');
const GENERATOR_FILES = readdirSync(DIR_GENERATORS, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => join(DIR_GENERATORS, dirent.name, 'index.js'));

module.exports = async (plop) => {
    for(const file of GENERATOR_FILES) {
        const module = await import(file);

        module.default(plop);
    }
};
