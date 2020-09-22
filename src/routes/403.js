const Route = require('../classes/Route');

class Page403 extends Route {
    constructor(app) {
        super(app, '/403');
    }
    createRoute() {
        this.route.get('/', (req, res) => {
            this.app.renderTemplate('403.ejs', req, res, {}, 403);
        });
        return this.route;
    }
}

module.exports = Page403;