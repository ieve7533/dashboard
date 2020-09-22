const Route = require('../classes/Route');

class Page400 extends Route {
    constructor(app) {
        super(app, '/400');
    }
    createRoute() {
        this.route.get('/', (req, res) => {
            this.app.renderTemplate('400.ejs', req, res, {}, 400);
        });
        return this.route;
    }
}

module.exports = Page400;