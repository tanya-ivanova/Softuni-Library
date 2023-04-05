import * as request from "./requester";
import { HOST, GOOGLE_API, PAGE_SIZE } from "../constants";

const baseUrl = `${HOST}/data/books`;

export const getAll = async (page) => {    
    const [books, count] = await Promise.all([
        request.get(`${baseUrl}?sortBy=_createdOn%20desc&pageSize=${PAGE_SIZE}&offset=` + (page - 1) * PAGE_SIZE),
        request.get(`${baseUrl}?count`)
    ]);

    return {
        books,
        pages: Math.ceil(count / PAGE_SIZE) || 1
    };
};

export const getAllAdmin = async (currentPageSize, offset) => {    
    const [books, totalRecords] = await Promise.all([
        request.get(`${baseUrl}?sortBy=_createdOn%20desc&pageSize=${currentPageSize}&offset=${offset}`),
        request.get(`${baseUrl}?count`)
    ]);

    return {
        books,
        totalRecords
    };
}

export const getByUserId = async (userId, page) => {

    const [books, count] = await Promise.all([
        request.get(`${baseUrl}?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc&pageSize=${PAGE_SIZE}&offset=` + (page - 1) * PAGE_SIZE),
        request.get(`${baseUrl}?where=_ownerId%3D%22${userId}%22&count`)
    ]);

    return {
        books,
        pages: Math.ceil(count / PAGE_SIZE) || 1
    };
};

export const getOne = (bookId) => request.get(`${baseUrl}/${bookId}`);

export const create = (bookData) => request.post(baseUrl, bookData);

export const edit = (bookId, bookData, isAdmin) => request.put(`${baseUrl}/${bookId}`, bookData, false, isAdmin);

export const remove = (bookId, isAdmin) => request.del(`${baseUrl}/${bookId}`, undefined, false, isAdmin);

export const search = async (criteria, query, page) => {

    const [books, count] = await Promise.all([
        request.get(`${baseUrl}?where=${criteria}%20LIKE%20%22${query}%22&pageSize=${PAGE_SIZE}&offset=` + (page - 1) * PAGE_SIZE),
        request.get(`${baseUrl}?where=${criteria}%20LIKE%20%22${query}%22&count`)
    ]);

    return {
        books,
        pages: Math.ceil(count / PAGE_SIZE) || 1
    };
}

export const searchInGoogleGetMany = async (criteria, query, page) => {

    const [googleBooks, countResult] = await Promise.all([
        request.get(`${GOOGLE_API}?q=""+in${criteria}:${query}&startIndex=${(page - 1) * PAGE_SIZE}&maxResults=${PAGE_SIZE}&key=AIzaSyDWxrFEuVaQZJZvXnBAVE-tWjzrFdMiU3c`, null, 'cors'),
        request.get(`${GOOGLE_API}?q=""+in${criteria}:${query}&key=AIzaSyDWxrFEuVaQZJZvXnBAVE-tWjzrFdMiU3c`, null, 'cors')
    ]);
    const count = await countResult.totalItems;

    return {
        googleBooks,
        pages: Math.ceil(count / PAGE_SIZE) || 1
    };
};

export const searchInGoogleGetOne = (googleBookId) => {
    return request.get(`${GOOGLE_API}/${googleBookId}`, null, 'cors');
};
