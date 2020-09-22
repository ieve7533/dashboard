const Route = require('../classes/Route');

class Commands extends Route {
    constructor(app) {
        super(app, '/commands');
    }
    createRoute() {
        this.route.get('/', async (req, res) => {
            try {
                const commands = await this.app.bot.getCommands();
                this.app.renderTemplate('Commands.ejs', req, res, { commands });
            } catch (e) {
                console.error(e);
                this.app.renderTemplate('500.ejs', req, res, {}, 500);
            }
        });
        return this.route;
    }
}

module.exports = Commands;