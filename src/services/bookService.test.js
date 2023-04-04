/* eslint-disable testing-library/no-await-sync-query */
import * as request from "./requester";
import {
    getAll,
    getAllAdmin,
    getByUserId,
    getOne,
    create,
    edit,
    remove,
    search,
    searchInGoogleGetMany,
    searchInGoogleGetOne,
} from './bookService';

// A mock implementation of the request.get function for testing purposes
jest.mock('./requester', () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    del: jest.fn(),
}));

describe('bookService functions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAll function', () => {
        test('should return a page of books and total pages', async () => {
            const page = 1;
            const count = 10;
            const books = [{ id: 1, title: 'Book 1' }, { id: 2, title: 'Book 2' }];
            jest.spyOn(request, 'get').mockResolvedValueOnce(books).mockResolvedValueOnce(count);

            const result = await getAll(page);

            expect(request.get).toHaveBeenCalledTimes(2);
            expect(request.get).toHaveBeenCalledWith(
                `http://localhost:3030/data/books?sortBy=_createdOn%20desc&pageSize=6&offset=0`
            );
            expect(request.get).toHaveBeenCalledWith(`http://localhost:3030/data/books?count`);
            expect(result.books).toBeDefined();
            expect(result.pages).toBeDefined();
            expect(Array.isArray(result.books)).toBe(true);
            expect(typeof result.pages).toBe('number');
        });
    });

    describe('getAllAdmin function', () => {
        test('should return books and total records', async () => {
            const currentPageSize = 6;
            const offset = 0;
            const count = 10;
            const books = [{ id: 1, title: 'Book 1' }, { id: 2, title: 'Book 2' }];
            jest.spyOn(request, 'get').mockResolvedValueOnce(books).mockResolvedValueOnce(count);

            const result = await getAllAdmin(currentPageSize, offset);

            expect(request.get).toHaveBeenCalledTimes(2);
            expect(request.get).toHaveBeenCalledWith(
                `http://localhost:3030/data/books?sortBy=_createdOn%20desc&pageSize=6&offset=0`
            );
            expect(request.get).toHaveBeenCalledWith(`http://localhost:3030/data/books?count`);
            expect(result.books).toBeDefined();
            expect(result.totalRecords).toBeDefined();
            expect(Array.isArray(result.books)).toBe(true);
            expect(typeof result.totalRecords).toBe('number');
        });
    });

    describe('getByUserId function', () => {
        test('should return books and total pages for a user', async () => {
            const userId = 1;
            const page = 1;
            const count = 10;
            const books = [{ id: 1, title: 'Book 1' }, { id: 2, title: 'Book 2' }];
            jest.spyOn(request, 'get').mockResolvedValueOnce(books).mockResolvedValueOnce(count);

            const result = await getByUserId(userId, page);

            expect(request.get).toHaveBeenCalledTimes(2);
            expect(request.get).toHaveBeenCalledWith(
                `http://localhost:3030/data/books?where=_ownerId%3D%221%22&sortBy=_createdOn%20desc&pageSize=6&offset=0`
            );
            expect(request.get).toHaveBeenCalledWith(`http://localhost:3030/data/books?where=_ownerId%3D%221%22&count`);
            expect(result.books).toBeDefined();
            expect(result.pages).toBeDefined();
        });
    });

    describe('getOne', () => {
        test("getOne should return the correct book", async () => {
            const bookId = 1;
            const bookData = { id: bookId, title: "Test Book" };
            jest.spyOn(request, 'get').mockResolvedValueOnce(bookData);

            const result = await getOne(bookId);

            expect(request.get).toHaveBeenCalledTimes(1);
            expect(request.get).toHaveBeenCalledWith(`http://localhost:3030/data/books/${bookId}`);
            expect(result).toEqual(bookData);
        });
    });

    describe('create', () => {
        test("create should return the created book data", async () => {
            const bookData = { title: "Test Book" };
            const createdBookData = { ...bookData, id: 1 };
            jest.spyOn(request, 'post').mockResolvedValueOnce(createdBookData);

            const result = await create(bookData);

            expect(request.post).toHaveBeenCalledTimes(1);
            expect(request.post).toHaveBeenCalledWith('http://localhost:3030/data/books', bookData);
            expect(result).toEqual(createdBookData);
        });
    });

    describe('edit', () => {
        test("edit should return the updated book data", async () => {
            const bookId = 1;
            const bookData = { title: "Test Book" };
            const updatedBookData = { ...bookData, id: bookId };
            jest.spyOn(request, 'put').mockResolvedValueOnce(updatedBookData);

            const result = await edit(bookId, bookData, true);

            expect(request.put).toHaveBeenCalledTimes(1);
            expect(request.put).toHaveBeenCalledWith(`http://localhost:3030/data/books/${bookId}`, bookData, false, true);
            expect(result).toEqual(updatedBookData);
        });
    });

    describe('remove', () => {
        test("remove should return the deleted book data", async () => {
            const bookId = 1;
            const deletedBookData = { id: bookId, title: "Test Book" };
            jest.spyOn(request, 'del').mockResolvedValueOnce(deletedBookData);

            const result = await remove(bookId, true);

            expect(request.del).toHaveBeenCalledTimes(1);
            expect(request.del).toHaveBeenCalledWith(`http://localhost:3030/data/books/${bookId}`, undefined, false, true);
            expect(result).toEqual(deletedBookData);
        });
    });

    describe('search', () => {
        test("search should return the matching books and the correct number of pages", async () => {
            const criteria = "title";
            const query = "Test";
            const page = 1;
            const books = [{ id: 1, title: "Test Book" }];
            const count = 1;
            jest.spyOn(request, 'get').mockResolvedValueOnce(books).mockResolvedValueOnce(count);

            const result = await search(criteria, query, page);

            expect(request.get).toHaveBeenCalledTimes(2);
            expect(request.get).toHaveBeenCalledWith(`http://localhost:3030/data/books?where=${criteria}%20LIKE%20%22${query}%22&pageSize=6&offset=0`);
            expect(request.get).toHaveBeenCalledWith(`http://localhost:3030/data/books?where=${criteria}%20LIKE%20%22${query}%22&count`);
            expect(result).toEqual({ books, pages: 1 });
        });
    });

    describe('searchInGoogleGetMany', () => {
        test("searchInGoogleGetMany should return the matching Google Books and the correct number of pages", async () => {
            const criteria = "title";
            const query = "Test";
            const page = 1;
            const googleBooks = [{ id: "1", volumeInfo: { title: "Test Book" } }];
            const count = 1;
            jest.spyOn(request, 'get').mockResolvedValueOnce(googleBooks).mockResolvedValueOnce(count);

            const result = await searchInGoogleGetMany(criteria, query, page);

            expect(request.get).toHaveBeenCalledTimes(2);
            expect(request.get).toHaveBeenCalledWith(`https://www.googleapis.com/books/v1/volumes?q=""+in${criteria}:${query}&startIndex=0&maxResults=6&key=AIzaSyDWxrFEuVaQZJZvXnBAVE-tWjzrFdMiU3c`, null, 'cors');
            expect(request.get).toHaveBeenCalledWith(`https://www.googleapis.com/books/v1/volumes?q=""+in${criteria}:${query}&key=AIzaSyDWxrFEuVaQZJZvXnBAVE-tWjzrFdMiU3c`, null, 'cors');
            expect(result).toEqual({ googleBooks, pages: 1 });
        });

        describe('searchInGoogleGetOne', () => {
            test("searchInGoogleGetOne should return the correct book", async () => {
                const googleBookId = 1;
                const bookData = { id: googleBookId, title: "Test Book" };
                jest.spyOn(request, 'get').mockResolvedValueOnce(bookData);

                const result = await searchInGoogleGetOne(googleBookId);

                expect(request.get).toHaveBeenCalledTimes(1);
                expect(request.get).toHaveBeenCalledWith(`https://www.googleapis.com/books/v1/volumes/${googleBookId}`, null, 'cors');
                expect(result).toEqual(bookData);
            });
        });
    });
});
