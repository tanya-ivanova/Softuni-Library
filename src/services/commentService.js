import * as request from "./requester";
import { host } from "../constants";

const baseUrl = `${host}/data/comments`;

export const create = (bookId, comment) => 
    request.post(baseUrl, {bookId, text: comment});

export const getByBookId = (bookId) => {
    const relations = encodeURIComponent(`user=_ownerId:users`);
    const search = encodeURIComponent(`bookId="${bookId}"`);
    
    return request.get(`${baseUrl}?where=${search}&load=${relations}`);
};
