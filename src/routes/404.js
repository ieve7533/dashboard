const Route = require('../classes/Route');

class Page404 extends Route {
    constructor(app) {
        super(app, '/404');
    }
    createRoute() {
        this.route.get('/', (req, res) => {
            this.app.renderTemplate('404.ejs', req, res, {}, 400);
        });
        return this.route;
    }
}

module.exports = Page404;