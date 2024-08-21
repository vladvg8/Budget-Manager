const http = require('node:http');
const assert = require('node:assert');
const Application = require('./../../../src/lib/application');
const Router = require('./../../../src/lib/router');
const logger = require('./../../../src/lib/logger');

const app = new Application();
const suit = 'testUnknownUrl';

module.exports = async function() {
    const router = new Router();
    router.post('/Home', (req, res) => {
        res.statusCode = 200;
        res.end('POST request successful');
    });
    app.route('', router);
    app.listen(3001, 'localhost');
    let data = '';
    await fetch('http://localhost:3001/AboutUs', {method: 'POST'}).
        then(res => res.text()).then(res => data = res);
    try {
        assert.strictEqual(data, 'Page not found');
        await logger.test(`Suit: ${suit}, test: postHomePage, status: success`);
    } catch(ex) {
        await logger.test(`Suit: ${suit}, test: postHomePage, status: failed, message: ${ex.message}`);
    }
    finally {
        app.close();
    }
};