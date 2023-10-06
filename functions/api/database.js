class Database {
    constructor() {
        if (this.instance) {
            return this.instance;
        }
        Database.instance = this;

        const admin = require('firebase-admin');

        admin.initializeApp({
            credential: admin.credential.applicationDefault(),
        });

        this.firestore = admin.firestore();
    }

    async create(collection, document) {
        const newDocRef = this.firestore.collection(collection).doc();
        const documentWithId = {...document, id: newDocRef.id};
        const transactionResult = await this.firestore.runTransaction(async (transaction) => {
            transaction.create(newDocRef, documentWithId);
            return documentWithId;
        });
        return transactionResult;
    }

    async getList(collection) {
        const transactionResult = await this.firestore.runTransaction(async (transaction) => {
            const collectionRef = this.firestore.collection(collection);
            const result = await transaction.get(collectionRef);
            const list = [];
            result.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                list.push(data);
            });
            return list.length ? list : null;
        });
        return transactionResult;
    }

    async get(collection, id) {
        const docRef = this.firestore.collection(collection).doc(id);
        const transactionResult = await this.firestore.runTransaction(async (transaction) => {
            const result = await transaction.get(docRef);
            if (!result.exists) {
                return null;
            }
            const doc = result.data();
            doc.id = result.id;
            return doc;
        });
        return transactionResult;
    }

    async set(collection, id, document) {
        const docRef = this.firestore.collection(collection).doc(id);
        const transactionResult = await this.firestore.runTransaction(async (transaction) => {
            const result = await transaction.get(docRef);
            if (!result.exists) {
                return null;
            }
            transaction.set(docRef, document);
            return {...document, id};
        });
        return transactionResult;
    }

    async del(collection, id) {
        const docRef = this.firestore.collection(collection).doc(id);
        const transactionResult = await this.firestore.runTransaction(async (transaction) => {
            const result = await transaction.get(docRef);
            if (!result.exists) {
                return null;
            }
            transaction.delete(docRef);
            return {id};
        });
        return transactionResult;
    }
}

module.exports = new Database();
