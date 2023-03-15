import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { AuthContext } from "../../contexts/AuthContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import BookDetails from "./BookDetails";
import * as bookService from '../../services/bookService';
import * as likeService from '../../services/likeService';
import * as commentService from '../../services/commentService';

describe('BookDetails component', () => {    
    const mockBook = {
        _id: 1,
        _ownerId: '234',
        imageUrl: 'http://something',
        title: 'The way of kings',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
        year: '2012',
        summary: 'Great book!'
    };
    const mockTotalLikes = 2;
    const mockIsLiked = false;
    const mockComments = [];

    beforeEach(() => {
        jest.spyOn(bookService, "getOne").mockResolvedValue(mockBook);
        jest.spyOn(likeService, "getTotalLikesByBookId").mockResolvedValue(mockTotalLikes);
        jest.spyOn(likeService, "getMyLikeByBookId").mockResolvedValue(mockIsLiked);
        jest.spyOn(commentService, "getByBookId").mockResolvedValue(mockComments);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    afterEach(cleanup);

    test('renders the image', async () => {
        render(
            <AuthContext.Provider value={{
                user: { _id: '456' }
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <BookDetails />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const imageElement = await screen.findByAltText('The way of kings');
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute('src', 'http://something');
    });

    test('renders the title', async () => {
        render(
            <AuthContext.Provider value={{
                user: { _id: '456' }
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <BookDetails />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const titleElement = await screen.findByText('The way of kings', { exact: true });
        expect(titleElement).toBeInTheDocument();
    });

    test('renders the author', async () => {
        render(
            <AuthContext.Provider value={{
                user: { _id: '456' }
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <BookDetails />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const authorElement = await screen.findByText('Brandon Sanderson', { exact: true });
        expect(authorElement).toBeInTheDocument();
    });

    test('renders the genre', async () => {
        render(
            <AuthContext.Provider value={{
                user: { _id: '456' }
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <BookDetails />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const genreElement = await screen.findByText('Fantasy', { exact: false });
        expect(genreElement).toBeInTheDocument();
    });

    test('renders the year', async () => {
        render(
            <AuthContext.Provider value={{
                user: { _id: '456' }
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <BookDetails />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const yearElement = await screen.findByText('2012', { exact: false });
        expect(yearElement).toBeInTheDocument();
    });

    test('renders the summary', async () => {
        render(
            <AuthContext.Provider value={{
                user: { _id: '456' }
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <BookDetails />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const summaryElement = await screen.findByText('Great book!', { exact: false });
        expect(summaryElement).toBeInTheDocument();
    });
});

describe('BookDetails component - parsing the summary', () => {    
    const mockBook = {
        _id: 1,
        _ownerId: '234',
        imageUrl: 'http://something',
        title: 'The way of kings',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
        year: '2012',
        summary: '<p>Great book!</p>'
    };
    const mockTotalLikes = 2;
    const mockIsLiked = false;
    const mockComments = [];

    beforeEach(() => {
        jest.spyOn(bookService, "getOne").mockResolvedValue(mockBook);
        jest.spyOn(likeService, "getTotalLikesByBookId").mockResolvedValue(mockTotalLikes);
        jest.spyOn(likeService, "getMyLikeByBookId").mockResolvedValue(mockIsLiked);
        jest.spyOn(commentService, "getByBookId").mockResolvedValue(mockComments);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    afterEach(cleanup);

    test('parse the summary and renders it', async () => {
        render(
            <AuthContext.Provider value={{
                user: { _id: '456' }
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <MemoryRouter>
                        <BookDetails />
                    </MemoryRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const summaryElement = await screen.findByText('Great book!', { exact: false });
        expect(summaryElement).toBeInTheDocument();
    });
});

describe('BookDetails component - testing the author link', () => {    
    const mockBook = {
        _id: 1,
        _ownerId: '234',
        imageUrl: 'http://something',
        title: 'The way of kings',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
        year: '2012',
        summary: '<p>Great book!</p>'
    };
    const mockTotalLikes = 2;
    const mockIsLiked = false;
    const mockComments = [];

    beforeEach(() => {
        jest.spyOn(bookService, "getOne").mockResolvedValue(mockBook);
        jest.spyOn(likeService, "getTotalLikesByBookId").mockResolvedValue(mockTotalLikes);
        jest.spyOn(likeService, "getMyLikeByBookId").mockResolvedValue(mockIsLiked);
        jest.spyOn(commentService, "getByBookId").mockResolvedValue(mockComments);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    afterEach(cleanup);

    test('renders the author link in EN', async () => {
        render(
            <AuthContext.Provider value={{
                user: { _id: '456' }
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <BrowserRouter>
                        <BookDetails />
                    </BrowserRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const authorLink = await screen.findByText('here', {exact: false});
        expect(authorLink).toBeInTheDocument();
        expect(authorLink.getAttribute('href')).toBe('/searchInGoogle?query=Brandon-Sanderson?searchBy=author');
    });

    test('renders the author link in BG', async () => {
        render(
            <AuthContext.Provider value={{
                user: { _id: '456' }
            }}>
                <LanguageContext.Provider value={{
                    language: 'bulgarian',
                    setAppLanguage: () => { }
                }}>
                    <BrowserRouter>
                        <BookDetails />
                    </BrowserRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const authorLink = await screen.findByText('тук', {exact: false});
        expect(authorLink).toBeInTheDocument();
        expect(authorLink.getAttribute('href')).toBe('/searchInGoogle?query=Brandon-Sanderson?searchBy=author');
    });
});

describe('BookDetails component - testing Delete and Edit buttons when the user is the owner', () => {    
        
    const mockBook = {
        _id: 1,
        _ownerId: '234',
        imageUrl: 'http://something',
        title: 'The way of kings',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
        year: '2012',
        summary: '<p>Great book!</p>'
    };
    const mockTotalLikes = 2;
    const mockIsLiked = false;
    const mockComments = [];

    beforeEach(() => {
        jest.spyOn(bookService, "getOne").mockResolvedValue(mockBook);
        jest.spyOn(likeService, "getTotalLikesByBookId").mockResolvedValue(mockTotalLikes);
        jest.spyOn(likeService, "getMyLikeByBookId").mockResolvedValue(mockIsLiked);
        jest.spyOn(commentService, "getByBookId").mockResolvedValue(mockComments);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    afterEach(cleanup);

    test('renders the edit button in EN', async () => {
        render(
            <AuthContext.Provider value={{
                user: { _id: '234' }
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <BrowserRouter>
                        <BookDetails />
                    </BrowserRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const editButton = await screen.findByText('Edit', {exact: true});
        expect(editButton).toBeInTheDocument();
        expect(editButton.getAttribute('href')).toBe('/catalog/1/edit');
    });

    test('renders the edit button in BG', async () => {
        render(
            <AuthContext.Provider value={{
                user: { _id: '234' }
            }}>
                <LanguageContext.Provider value={{
                    language: 'bulgarian',
                    setAppLanguage: () => { }
                }}>
                    <BrowserRouter>
                        <BookDetails />
                    </BrowserRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const editButton = await screen.findByText('Промени', {exact: true});
        expect(editButton).toBeInTheDocument();
        expect(editButton.getAttribute('href')).toBe('/catalog/1/edit');
    });

    test('renders the delete button in EN', async () => {
        const showModalHandler = jest.fn();

        render(
            <AuthContext.Provider value={{
                user: { _id: '234' }
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <BrowserRouter>
                        <BookDetails />
                    </BrowserRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const deleteButton = await screen.findByText('Delete', {exact: true});
        expect(deleteButton).toBeInTheDocument();
        //fireEvent.click(deleteButton);
        //expect(showModalHandler).toHaveBeenCalled();
    });

    test('renders the delete button in BG', async () => {
        const showModalHandler = jest.fn();

        render(
            <AuthContext.Provider value={{
                user: { _id: '234' }
            }}>
                <LanguageContext.Provider value={{
                    language: 'bulgarian',
                    setAppLanguage: () => { }
                }}>
                    <BrowserRouter>
                        <BookDetails />
                    </BrowserRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const deleteButton = await screen.findByText('Изтрий', {exact: true});
        expect(deleteButton).toBeInTheDocument();
        // fireEvent.click(deleteButton);
        // expect(showModalHandler).toHaveBeenCalled();
    });
});

describe('BookDetails component - testing Delete and Edit buttons when the user is not the owner', () => {    
        
    const mockBook = {
        _id: 1,
        _ownerId: '234',
        imageUrl: 'http://something',
        title: 'The way of kings',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
        year: '2012',
        summary: '<p>Great book!</p>'
    };
    const mockTotalLikes = 2;
    const mockIsLiked = false;
    const mockComments = [];

    beforeEach(() => {
        jest.spyOn(bookService, "getOne").mockResolvedValue(mockBook);
        jest.spyOn(likeService, "getTotalLikesByBookId").mockResolvedValue(mockTotalLikes);
        jest.spyOn(likeService, "getMyLikeByBookId").mockResolvedValue(mockIsLiked);
        jest.spyOn(commentService, "getByBookId").mockResolvedValue(mockComments);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    afterEach(cleanup);

    test('does not render the edit button in EN', async () => {
        render(
            <AuthContext.Provider value={{
                user: { _id: '122' }
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <BrowserRouter>
                        <BookDetails />
                    </BrowserRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );
        
        const editButton = screen.queryByText('Edit', {exact: true});
        await waitFor(() => expect(editButton).toBeNull());        
    });

    test('does not render the edit button in BG', async () => {
        render(
            <AuthContext.Provider value={{
                user: { _id: '122' }
            }}>
                <LanguageContext.Provider value={{
                    language: 'bulgarian',
                    setAppLanguage: () => { }
                }}>
                    <BrowserRouter>
                        <BookDetails />
                    </BrowserRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );
        
        const editButton = screen.queryByText('Промени', {exact: true});
        await waitFor(() => expect(editButton).toBeNull());        
    });

    test('does not render the delete button in EN', async () => {
        render(
            <AuthContext.Provider value={{
                user: { _id: '122' }
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <BrowserRouter>
                        <BookDetails />
                    </BrowserRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );
        
        const deleteButton = screen.queryByText('Delete', {exact: true});
        await waitFor(() => expect(deleteButton).toBeNull());        
    });

    test('does not render the delete button in BG', async () => {
        render(
            <AuthContext.Provider value={{
                user: { _id: '122' }
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <BrowserRouter>
                        <BookDetails />
                    </BrowserRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );
        
        const deleteButton = screen.queryByText('Промени', {exact: true});
        await waitFor(() => expect(deleteButton).toBeNull());        
    });
});