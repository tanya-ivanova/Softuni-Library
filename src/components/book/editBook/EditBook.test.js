/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, cleanup, waitFor, act } from "@testing-library/react";
import { AuthContext } from "../../contexts/AuthContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import { BrowserRouter } from "react-router-dom";
import EditBook from "./EditBook";
import * as bookService from '../../services/bookService';

describe('EditBook component', () => {
    const mockBook = {
        _id: 1,
        _ownerId: '234',
        ownerEmail: 'test@abv.bg',
        imageUrl: 'http://something',
        title: 'The way of kings',
        author: 'Brandon Sanderson',
        genre: 'Fantasy',
        year: '2012',
        summary: 'Great book!'
    };    

    beforeEach(() => {
        jest.spyOn(bookService, "getOne").mockResolvedValue(mockBook);        
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    afterEach(cleanup);

    test('renders the image', async () => {
        await act(async () => {
            render(
                <AuthContext.Provider value={{
                    user: { _id: '234' }
                }}>
                    <LanguageContext.Provider value={{
                        language: 'english',
                        setAppLanguage: () => { }
                    }}>
                        <BrowserRouter>
                            <EditBook />
                        </BrowserRouter>
                    </LanguageContext.Provider>
                </AuthContext.Provider>
            );
        })

        const imageValue = await screen.findByDisplayValue('http://something');
        await waitFor(() => expect(imageValue).toBeInTheDocument());        
    });

    test('renders the title', async () => {
        await act(async () => {
            render(
                <AuthContext.Provider value={{
                    user: { _id: '234' }
                }}>
                    <LanguageContext.Provider value={{
                        language: 'english',
                        setAppLanguage: () => { }
                    }}>
                        <BrowserRouter>
                            <EditBook />
                        </BrowserRouter>
                    </LanguageContext.Provider>
                </AuthContext.Provider>
            );
        })

        const titleValue = await screen.findByDisplayValue('The way of kings');
        await waitFor(() => expect(titleValue).toBeInTheDocument());
    });

    test('renders the author', async () => {
        await act(async () => {
            render(
                <AuthContext.Provider value={{
                    user: { _id: '234' }
                }}>
                    <LanguageContext.Provider value={{
                        language: 'english',
                        setAppLanguage: () => { }
                    }}>
                        <BrowserRouter>
                            <EditBook />
                        </BrowserRouter>
                    </LanguageContext.Provider>
                </AuthContext.Provider>
            );
        });

        const authorValue = await screen.findByDisplayValue('Brandon Sanderson');
        await waitFor(() => expect(authorValue).toBeInTheDocument());
    });

    test('renders the genre', async () => {
        await act(async () => {
            render(
                <AuthContext.Provider value={{
                    user: { _id: '234' }
                }}>
                    <LanguageContext.Provider value={{
                        language: 'english',
                        setAppLanguage: () => { }
                    }}>
                        <BrowserRouter>
                            <EditBook />
                        </BrowserRouter>
                    </LanguageContext.Provider>
                </AuthContext.Provider>
            );
        })

        const genreValue = await screen.findByDisplayValue('Fantasy');
        await waitFor(() => expect(genreValue).toBeInTheDocument());
    });

    test('renders the year', async () => {
        await act(async () => {
            render(
                <AuthContext.Provider value={{
                    user: { _id: '234' }
                }}>
                    <LanguageContext.Provider value={{
                        language: 'english',
                        setAppLanguage: () => { }
                    }}>
                        <BrowserRouter>
                            <EditBook />
                        </BrowserRouter>
                    </LanguageContext.Provider>
                </AuthContext.Provider>
            );
        })

        const yearValue = await screen.findByDisplayValue('2012');
        await waitFor(() => expect(yearValue).toBeInTheDocument());
    });

    test('renders the summary', async () => {
        await act(async () => {
            render(
                <AuthContext.Provider value={{
                    user: { _id: '234' }
                }}>
                    <LanguageContext.Provider value={{
                        language: 'english',
                        setAppLanguage: () => { }
                    }}>
                        <BrowserRouter>
                            <EditBook />
                        </BrowserRouter>
                    </LanguageContext.Provider>
                </AuthContext.Provider>
            );
        })

        const summaryValue = await screen.findByDisplayValue('Great book!');
        await waitFor(() => expect(summaryValue).toBeInTheDocument());
    });
});