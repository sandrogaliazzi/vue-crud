import { db } from "../firebase/databaseConfig"

const product = db.collection('products');

export default {

    getAll: () => {
        return product.orderBy('createdAt', 'desc')
    },

    add: (object) => {
        return product.add(object);
    },

    update: (object) => {
        return product.doc(object.id).update(object);
    },

    remove: (id) => {
        return product.doc(id).delete();
    },

    getProduct: (id) => {
        return product.doc(id).get();
    }

}