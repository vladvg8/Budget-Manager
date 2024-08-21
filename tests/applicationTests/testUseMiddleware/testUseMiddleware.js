const useOneSuccessMiddleware = require('./useOneSuccessMiddleware');
const tesChainOfMiddlewares = require('./testChainOfMiddlewares');
const testChainOfMiddlewaresWithRouteMiddleware = require('./testChainOfMiddlewaresWithRouteMiddleware');
const denyRequestInUseMiddleware = require('./denyRequestInUseMiddleware');
const denyRequestInRouterMiddleware = require('./denyRequestInRouterMiddleware');

module.exports = async function() {
    await useOneSuccessMiddleware();
    await tesChainOfMiddlewares();
    await testChainOfMiddlewaresWithRouteMiddleware();
    await denyRequestInUseMiddleware();
    await denyRequestInRouterMiddleware();
}