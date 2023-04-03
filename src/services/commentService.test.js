/* eslint-disable testing-library/no-await-sync-query */
import { create, getByBookId } from "./commentService";
import * as request from "./requester";

jest.mock('./requester', () => ({
    get: jest.fn(),
    post: jest.fn(),
}));

describe("create", () => {
    it("should call request.post with the correct arguments", async () => {
        const bookId = "abc123";
        const comment = 'comment';
        const responseData = { data: "some data" };
        jest.spyOn(request, 'post').mockResolvedValueOnce(responseData);

        const result = await create(bookId, comment);

        expect(request.post).toHaveBeenCalledWith('http://localhost:3030/data/comments', { bookId, text: comment });
        expect(result).toBe(responseData);
    });
});

describe("getByBookId", () => {
    it("should call request.get with the correct arguments", async () => {
        const bookId = "abc123";
        const responseData = { data: "some data" };
        const relations = encodeURIComponent(`user=_ownerId:users`);
        const search = encodeURIComponent(`bookId="${bookId}"`);

        jest.spyOn(request, 'get').mockResolvedValueOnce(responseData);

        const result = await getByBookId(bookId);

        expect(request.get).toHaveBeenCalledWith(`http://localhost:3030/data/comments?where=${search}&load=${relations}`);
        expect(result).toBe(responseData);
    });
});
