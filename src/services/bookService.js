import * as request from "./requester";

const baseUrl = 'http://localhost:3030/data/books';

export const getAll = () => request.get(`${baseUrl}?sortBy=_createdOn%20desc`);

export const getOne = (bookId) => request.get(`${baseUrl}/${bookId}`);

export const getByUserId = (userId) => request.get(`${baseUrl}?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);

export const create = (bookData) => request.post(baseUrl, bookData);

export const edit = (bookId, bookData) => request.put(`${baseUrl}/${bookId}`, bookData);

export const remove = (bookId) => request.del(`${baseUrl}/${bookId}`);