const http = require('node:http');
const assert = require('node:assert');
const logger = require('./../../../src/lib/logger');
const Application = require('./../../../src/lib/application');
const Router = require('./../../../src/lib/router');

const app = new Application();
const suit = 'testUseMiddleware';

module.exports = async function() {
    const router = new Router();
    router.get('/Home', (req, res, next) => {
        next();
    },(req, res) => {
        res.statusCode = 200;
        res.end('Success');
    })
    app.use('', (req, res, next) => {
        next();
    }, (req, res, next) => {
        next();
    })
    app.route('', router);
    app.listen(3004, 'localhost');
    http.get('http://localhost:3004/Home', async (res) => {
        let data = '';
        for await (const chunk of res) {
            data += chunk;
        }
        try {
            assert.strictEqual(data, 'Success');
            await logger.test(`Suit: ${suit}, test: testChainOfMiddlewaresWithRouteMiddleware, status: success`);
        } catch(ex) {
            await logger.test(`Suit: ${suit}, test: testChainOfMiddlewaresWithRouteMiddleware, status: failed, message: ${ex.message}`);
        } finally {
            app.close();
        }
    })
}