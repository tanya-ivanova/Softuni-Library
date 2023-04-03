import {likeBook, getTotalLikesByBookId, getMyLikeByBookId} from "./likeService";
import * as request from "./requester";

jest.mock('./requester', () => ({
    get: jest.fn(),
    post: jest.fn(),    
}));

describe("likeBook", () => {
    it("should call request.post with the correct arguments", async () => {
        const bookId = "abc123";
        const responseData = { data: "some data" };
        jest.spyOn(request, 'post').mockResolvedValueOnce(responseData);

        const result = await likeBook(bookId);

        expect(request.post).toHaveBeenCalledWith('http://localhost:3030/data/likes', { bookId });
        expect(result).toBe(responseData);
    });
});

describe("getTotalLikesByBookId", () => {
    it("should call request.get with the correct arguments", async () => {
        const bookId = "abc123";
        const responseData = { count: 5 };
        jest.spyOn(request, 'get').mockResolvedValueOnce(responseData);

        const result = await getTotalLikesByBookId(bookId);

        expect(request.get).toHaveBeenCalledWith(`http://localhost:3030/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);
        expect(result).toBe(responseData);
    });
});

describe("getMyLikeByBookId", () => {
    it("should call request.get with the correct arguments", async () => {
        const bookId = "abc123";
        const userId = "xyz789";
        const responseData = { count: 1 };
        jest.spyOn(request, 'get').mockResolvedValueOnce(responseData);

        const result = await getMyLikeByBookId(bookId, userId);

        expect(request.get).toHaveBeenCalledWith(`http://localhost:3030/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
        expect(result).toBe(responseData);
    });
});