const http = require('node:http');
const assert = require('node:assert');
const Application = require('./../../../src/lib/application');
const Router = require('./../../../src/lib/router');
const logger = require('./../../../src/lib/logger');

const app = new Application();
const suit = 'testUnknownUrl';

module.exports = async function() {
  const router = new Router();
  router.get('/Home', (req, res) => {
    res.statusCode = 200;
    res.end('GET request successful');
  });
  app.route('', router);
  app.listen(3000, 'localhost');
  http.get('http://localhost:3000/AboutUs', async (res) => {
      let data = '';
      for await (const chunk of res) {
          data += chunk;
      }
      try {
          assert.strictEqual(data, 'Page not found');
          await logger.test(`Suit: ${suit}, test: getHomePage, status: success`);
      } catch(ex) {
          await logger.test(`Suit: ${suit}, test: getHomePage, status: failed, message: ${ex.message}`);
      }
      finally {
        app.close();
      }
  })
};