

class User {
    /**
     * 
     * @param {import('./Unicron')} client 
     * @param {{any}} raw 
     */
    constructor(client, raw = {}) {
        this.client = client;
        /**
         * @type {string}
         */
        this.id = raw.id;
    }
    /**
     * @returns {Promise<void>}
     */
    save() {
        return new Promise(async (resolve, reject) => {
            const payload = this.toJSON();
            await this.client.ws.post(`/api/user/${payload.id}`, payload).catch(reject);
            resolve();
        });
    }
    toJSON() {
        return {
            id: this.id,
        }
    }
}

module.exports = User;