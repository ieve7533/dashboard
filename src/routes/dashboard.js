const Route = require('../classes/Route');
const Guild = require('../classes/DiscordGuild');

const Validate = require('../validator');

function getError(code) {
    switch (Number(code)) {
        case 1000:
            return 'Sorry, Invalid Values Detected';
        case 1001:
            return 'Sorry, the Body is not an object';
        case 1002:
            return 'Sorry, the prefix cannot exceed more than 5 characters';
        case 1003:
            return 'Sorry, that\'s an Invalid or Unknown Channel';
        case 1004:
            return 'Sorry, that\'s an Invalid or Unknown Category Channel';
        case 1005:
            return 'Sorry, that\'s an Invalid or Unknown Voice Channel';
        case 1006:
            return 'Sorry, that\'s an Invalid or Unknown Action';
        case 1007:
            return 'Sorry, that\'s an Invalid or Unknown Role';
        case 1008:
            return 'Sorry, that\'s an Invalid or Unknown Verification Type';
        case 1009:
            return 'Sorry, the Welcome/Farewell Message cannot exceed more than 1024 characters';
        case 1010:
            return 'Sorry, you need to put a valid duration';
        case 1011:
            return 'Sorry, Warn Threshold should be a number';
        case 1012:
            return 'Sorry, that is not a Boolean';
    }
}

class Dashboard extends Route {
    constructor(app) {
        super(app, '/dashboard');
    }
    createRoute() {
        this.route.use(this.app.isAuthenticated);
        this.route.get('/', async (req, res) => {
            try {
                const guilds = req.user.guilds;
                this.app.renderTemplate('Dashboard.ejs', req, res, { guilds });
            } catch (e) {
                console.error(e);
                this.app.renderTemplate('500.ejs', req, res, {}, 500);
            }
        });
        this.route.get('/manage/:id', async (req, res) => {
            try {
                const userGuilds = req.user.guilds;
                const botGuilds = await this.app.bot.getGuilds().catch((e) => { throw e; });
                const guild = userGuilds.find((g) => g.id === req.params.id && botGuilds.find((bg) => bg === req.params.id));
                if (!guild) return res.redirect('/invite');
                const settings = await this.app.db.guilds.fetch(guild.id).catch((e) => { throw e; });
                const channels = await this.app.bot.getGuildChannels(guild.id).catch((e) => { throw e; });
                const roles = await this.app.bot.getGuildRoles(guild.id).catch((e) => { throw e; });
                const stat = new Guild(Object.assign(guild, { channels, roles }));
                this.app.renderTemplate('Manage.ejs', req, res, {
                    guild: stat,
                    settings
                });
            } catch (e) {
                console.error(e);
                this.app.renderTemplate('500.ejs', req, res, {}, 500);
            }
        });
        this.route.post('/manage/:id', async (req, res) => {
            try {
                const userGuilds = req.user.guilds;
                const botGuilds = await this.app.bot.getGuilds().catch((e) => { throw e; });
                const guild = userGuilds.find((g) => g.id === req.params.id && botGuilds.find((bg) => bg === req.params.id));
                if (!guild) return res.sendStatus(403);
                const settings = await this.app.db.guilds.fetch(guild.id).catch((e) => { throw e; });
                const channels = await this.app.bot.getGuildChannels(guild.id).catch((e) => { throw e; });
                const roles = await this.app.bot.getGuildRoles(guild.id).catch((e) => { throw e; });
                const partial = Validate(req.body, channels, roles);
                for (const key of Object.keys(partial)) settings[key] = partial[key];
                await settings.save().catch((e) => { throw e; });
                res.sendStatus(200);
            } catch (e) {
                if (typeof e === 'number') return res.status(400).send(getError(e));
                console.error(e);
                res.status(500).send(e);
            }
        });
        return this.route;
    }
}

module.exports = Dashboard;