const Database = require('./database');

class DataModel {
    constructor(collectionName) {
        this.collectionName = collectionName;
        this.db = Database;
    }

    async getAll() {
        const docs = await this.db.getList(this.collectionName);
        return docs.map((doc) => ({ id: doc.id, ...doc }));
    }

    async getById(id) {
        const doc = await this.db.get(this.collectionName, id);
        if (!doc) {
            throw new Error(`Document with ID '${id}' not found in collection '${this.collectionName}'`);
        }
        return { id: doc.id, ...doc };
    }

    async create(data) {
        const doc = await this.db.create(this.collectionName, data);
        return { id: doc.id, ...doc };
    }

    async update(id, data) {
        const doc = await this.db.set(this.collectionName, id, data);
        if (!doc) {
            throw new Error(`Document with ID '${id}' not found in collection '${this.collectionName}'`);
        }
        return { id: doc.id, ...doc };
    }

    async delete(id) {
        const doc = await this.db.del(this.collectionName, id);
        if (!doc) {
            throw new Error(`Document with ID '${id}' not found in collection '${this.collectionName}'`);
        }
        return { id };
    }
}

module.exports = DataModel;
