const fs = require('node:fs');
const path = require('node:path');

class Env {
    constructor() {
        if (fs.existsSync(path.join(process.cwd(), '.env'))) {
            const data = fs.readFileSync(path.join(process.cwd(), '.env'), {encoding: 'utf-8'});
            const lines = data.split('\r\n');
            const regexConstruction = /^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.+?)\s*$/i;
            for (const line of lines) {
                const match = line.match(regexConstruction);
                if (match) {
                    const [_, name, value] = match;
                    process.env[name.trim()] = value.trim();
                }
            }
        }
    }
}

module.exports = new Env();