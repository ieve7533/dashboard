const Route = require('../classes/Route');

class ComingSoon extends Route {
    constructor(app) {
        super(app, '/coming-soon');
    }
    createRoute() {
        this.route.get('/', (req, res) => {
            this.app.renderTemplate('ComingSoon.ejs', req, res);
        });
        return this.route;
    }
}

module.exports = ComingSoon;