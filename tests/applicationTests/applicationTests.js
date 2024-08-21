const testUnknownUrl = require('./testUnknownUrl/testUnknownUrl');
const testUseMiddleware = require('./testUseMiddleware/testUseMiddleware');

module.exports = async function() {
    await testUnknownUrl();
    await testUseMiddleware();
}