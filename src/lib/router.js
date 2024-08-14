class Router {
    constructor(request, response) {
        this.request = request;
        this.response = response;
    }

    async get(URL, ...args) {
        if (this.request.url === URL && this.request.method === 'GET' && args.length > 0) {
            const callback = args.pop();
            if (typeof callback !== 'function') {
                throw new Error('Callback should be function');
            }
            let index = 0;
            const next = async () => {
                if (index < args.length) {
                    const middleware = args[index];
                    index++;
                    if (typeof middleware !== 'function') {
                        throw new Error('Middleware should be function');
                    }
                    await middleware(this.request, this.response, next);
                } else {
                    await callback(this.request, this.response);
                }
            }
            await next();
        }
    }

    async post(URL, ...args) {
        if (this.request.url === URL && this.request.method === 'POST' && args.length > 0) {
            const callback = args.pop();
            if (typeof callback !== 'function') {
                throw new Error('Callback should be function');
            }
            let index = 0;
            const next = async () => {
                if (index < args.length) {
                    const middleware = args[index];
                    index++;
                    if (typeof middleware !== 'function') {
                        throw new Error('Middleware should be function');
                    }
                    await middleware(this.request, this.response, next);
                } else {
                    await callback(this.request, this.response);
                }
            }
            await next();
        }
    }
}

module.exports = Router;