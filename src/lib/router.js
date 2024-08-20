class Router {
    constructor() {
        this.routes = []; // [{method: string, url: string, middlewares: [], callback: function}]
    }

    #pushRout(method, url, ...args) {
        if (args.length > 0) {
            const callback = args.pop();
            if (typeof callback !== 'function') {
                throw new Error('Callback should be a function');
            }
            const middlewares = args.map(middleware => {
                if (typeof middleware === 'function') {
                    return middleware;
                } else {
                    throw new Error('Middleware should be a function');
                }
            });
            this.routes.push({method: method, url: url, middlewares: middlewares, callback: callback});
        } else {
            throw new Error(`${method} method should receive at least one function`);
        }
    }

    get(url, ...args) {
        this.#pushRout('GET', url, ...args);
    }

    post(url, ...args) {
        this.#pushRout('POST', url, ...args);
    }
}

module.exports = Router;