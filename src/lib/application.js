const http = require('node:http');
const Router = require('./router');

class Application {
    constructor() {
        this.server = http.createServer(async (req, res) => {
            await this.handle(req, res);
        });
        this.middlewares = []; // [{url: string, middlewares: []}]
        this.routers = [];     // [{url: string, router: Router}]
    }

    use(url, ...middlewares) {
        if (middlewares.length > 0) {
            const middlewareFunctions = middlewares.map(middleware => {
                if (typeof middleware === 'function') {
                    return middleware;
                } else {
                    throw new Error('Middleware should be a function');
                }
            })
            const existingUrl = this.middlewares.find((middleware) => middleware.url === url);
            if (existingUrl) {
                existingUrl.middlewares = [...existingUrl.middlewares, ...middlewareFunctions];
            } else {
                this.middlewares.push({url: url, middlewares: middlewareFunctions});
            }
        }
    }

    route(url, router) {
        if(!Router.prototype.isPrototypeOf(router)) {
            throw new Error('Router should be an object of class \'Router\'');
        }
        if(this.routers.find(router => router.url === url)) {
           throw new Error(`Url \'${url}\' is already exist`);
        }
        this.routers.push({url: url, router: router});
    }

    async handle(req, res) {
        const {method, url } = req;
        const baseMiddlewares = this.middlewares.find((middleware => url.startsWith(middleware.url)))?.middlewares || [];
        const appRouter = this.routers.find(router => url.startsWith(router.url));
        if (!appRouter) {
            res.statusCode = 404;
            res.end('Page not found');
            return;
        }
        const {url: routerUrl, router: router} = appRouter;
        const routerHandler = router.routes.find(router => router.method === method && url === `${routerUrl}${router.url}`);
        if (!routerHandler) {
            res.statusCode = 404;
            res.end('Page not found');
            return;
        } else {
            const middlewares = [...baseMiddlewares, ...routerHandler.middlewares];
            const callback = routerHandler.callback;
            let index = 0;
            const next = async () => {
                if (index < middlewares.length) {
                    const middleware = middlewares[index];
                    index++;
                    if (typeof middleware !== 'function') {
                        throw new Error('Middleware should be function');
                    }
                    await middleware(req, res, next);
                } else {
                    await callback(req, res);
                }
            }
            await next();
        }

    }

    listen(port, server_host, backlog) {
        this.server.listen(port, server_host, backlog);
    }
}

module.exports = new Application();