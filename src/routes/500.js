const Route = require('../classes/Route');

class Page500 extends Route {
    constructor(app) {
        super(app, '/500');
    }
    createRoute() {
        this.route.get('/', (req, res) => {
            this.app.renderTemplate('500.ejs', req, res, {}, 500);
        });
        return this.route;
    }
}

module.exports = Page500;