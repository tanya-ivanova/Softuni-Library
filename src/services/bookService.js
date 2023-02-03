import * as request from "./requester";

const baseUrl = 'http://localhost:3030/data/books';
const pageSize = 3;

export const getAll = async (page) => {
    //request.get(`${baseUrl}?sortBy=_createdOn%20desc`);
    const [books, count] = await Promise.all([
        request.get(`${baseUrl}?sortBy=_createdOn%20desc&pageSize=${pageSize}&offset=` + (page - 1) * pageSize),
        request.get(`${baseUrl}?count`)
    ]);
    
    return {
        books,
        pages: Math.ceil(count / pageSize)
    };
};

export const getOne = (bookId) => request.get(`${baseUrl}/${bookId}`);

export const getByUserId = (userId) => request.get(`${baseUrl}?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);

export const create = (bookData) => request.post(baseUrl, bookData);

export const edit = (bookId, bookData) => request.put(`${baseUrl}/${bookId}`, bookData);

export const remove = (bookId) => request.del(`${baseUrl}/${bookId}`);

export const search = (criteria, query) => request.get(`${baseUrl}?where=${criteria}%20LIKE%20%22${query}%22`);

