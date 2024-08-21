const http = require('node:http');
const assert = require('node:assert');
const logger = require('./../../../src/lib/logger');
const Application = require('./../../../src/lib/application');
const Router = require('./../../../src/lib/router');

const app = new Application();
const suit = 'testUseMiddleware';

module.exports = async function() {
    const router = new Router();
    router.get('/Home', (req, res) => {
        res.statusCode = 200;
        res.end('Success');
    })
    app.use('', (req, res, next) => {
        next();
    }, (req, res, next) => {
        res.end('Denied');
    })
    app.route('', router);
    app.listen(3005, 'localhost');
    http.get('http://localhost:3005/Home', async (res) => {
        let data = '';
        for await (const chunk of res) {
            data += chunk;
        }
        try {
            assert.strictEqual(data, 'Denied');
            await logger.test(`Suit: ${suit}, test: denyRequestInRouterMiddleware, status: success`);
        } catch(ex) {
            await logger.test(`Suit: ${suit}, test: denyRequestInRouterMiddleware, status: failed, message: ${ex.message}`);
        } finally {
            app.close();
        }
    })
}