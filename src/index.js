const http = require('node:http');
const env = require('./lib/env');
const logger = require('./lib/logger');
const Router = require('./lib/router');
const app = require('./lib/application');


const PORT = process.env.PORT || 9999;
const SERVER_HOST = process.env.SERVER_HOST || 'localhost';

app.listen(PORT, SERVER_HOST, async () => {
    await logger.info(`Server started on port ${PORT}`);
})
