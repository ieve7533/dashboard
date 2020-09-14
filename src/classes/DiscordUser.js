const { Permissions } = require('discord.js');

class DiscordUser {
    constructor(data = {}) {
        this.id = data.id;
        this.username = data.username;
        this.discriminator = data.discriminator;
        this.avatar = data.avatar ? data.avatar : '';
        this.avatarURL = this.avatar.length ? `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}` : `https://dummyimage.com/128x128/23272A/ffffff.png&text=NoPFP`;
        this.accessToken = data.accessToken;
        this.refreshToken = data.refreshToken;
        this.permission = data.permission;
        this.tag = `${this.username}#${this.discriminator}`;
        this.guilds = data.guilds.filter((g) => (new Permissions(g.permissions)).has('MANAGE_GUILD'));
    }
    toJSON() {
        return {
            id: this.id,
            username: this.username,
            discriminator: this.discriminator,
            avatar: this.avatar,
            avatarURL: this.avatarURL,
            accessToken: this.accessToken,
            refreshToken: this.refreshToken,
            tag: this.tag,
            guilds: this.guilds,
        }
    }
}

module.exports = DiscordUser;