const fs = require('node:fs');
const path = require('node:path');

class Logger {
    constructor() {
        const logPath = process.env.LOG_FILE ? path.join(process.cwd(), process.env.LOG_FILE) : path.join(process.cwd(), 'app.log');
        if(path.extname(logPath) !== '.log') {
            throw new Error('Log file extension is not .log');
        }
        this.#createFile(logPath);
        this.logFilePath = logPath;
    }

    #createFile(logPath) {
        const logDirPath = path.dirname(logPath);
        if (!fs.existsSync(logDirPath)) {
            fs.mkdirSync(logDirPath, {recursive: true});
        }
        if (!fs.existsSync(logPath)) {
            fs.writeFileSync(logPath, '', {encoding: 'utf-8'});
        }
    }

    async #writeFile(message, level) {
        this.#createFile(this.logFilePath);
        const messageValue = `${new Date().toISOString()} [${level}]: ${message}`
        await fs.promises.appendFile(this.logFilePath, `${messageValue}\n`, {encoding: 'utf-8'});
        console.log(messageValue);
    }

    debug = async (message) => {
        await this.#writeFile(message, 'DEBUG');
    }
    info = async (message) => {
        await this.#writeFile(message, 'INFO');
    }
    warn = async (message) => {
        await this.#writeFile(message, 'WARN');
    }
    error = async (message) => {
        await this.#writeFile(message, 'ERROR');
    }
    critical = async (message) => {
        await this.#writeFile(message, 'CRITICAL');
    }

    test = async (message) => {
        await this.#writeFile(message, 'TEST');
    }

}

module.exports = new Logger();