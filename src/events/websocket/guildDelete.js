const BaseEvent = require('../../classes/WebSocketEvent');
class guildDelete extends BaseEvent {
    constructor(app) {
        super(app, 'guildDelete');
    }
    /**
     * 
     * @param {string} payload_id
     */
    emit(payload_id) {
        if (this.app.db.guilds.cache.has(payload_id)) this.app.db.guilds.cache.delete(payload_id);
        if (this.app.db.members.cache.has(payload_id)) this.app.db.members.cache.delete(payload_id);
        if (this.app.db.tags.cache.has(payload_id)) this.app.db.tags.cache.delete(payload_id);
    }
}
module.exports = guildDelete;