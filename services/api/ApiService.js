import { handleRequest } from './ApiClient';
const db = process.env.NEXT_PUBLIC_API_URL;

export async function getCollection(collection) {
    return handleRequest('GET', `${db}/${collection}`);
}

export async function getDoc(collection, id) {
    return handleRequest('GET', `${db}/${collection}/${id}`);
}
  
export async function createDoc(collection, document) {
    return handleRequest('POST', `${db}/${collection}`, document);
}
  
export async function deleteDoc(collection, id) {
    return handleRequest('DELETE', `${db}/${collection}/${id}`);
}
  
export async function updateDoc(collection, id, document) {
    return handleRequest('PATCH', `${db}/${collection}/${id}`, document);
}
