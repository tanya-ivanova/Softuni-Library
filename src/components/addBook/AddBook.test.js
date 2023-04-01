import { render, fireEvent, screen, getByRole } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from "../../contexts/AuthContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import AddBook from './AddBook';

describe('AddBook', () => {
    test('renders the component', () => {
        render(
            <AuthContext.Provider value={{
                user: { email: 'test@abv.bg' }
            }}>
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <BrowserRouter>
                        <AddBook />
                    </BrowserRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const title = screen.getByText('Title');
        const author = screen.getByText('Author');
        const genre = screen.getByText('Genre');
        const summary = screen.getByText('Summary');
        expect(title).toBeInTheDocument();
        expect(author).toBeInTheDocument();
        expect(genre).toBeInTheDocument();
        expect(summary).toBeInTheDocument();
    });

    // test('adds a book when the form is submitted', () => {
    //     const addBook = jest.fn();

    //     render(
    //         <AuthContext.Provider value={{
    //             user: { email: 'test@abv.bg' }
    //         }}>
    //             <LanguageContext.Provider value={{
    //                 language: 'english',
    //                 setAppLanguage: () => { }
    //             }}>
    //                 <BrowserRouter>
    //                     <AddBook addBook={addBook} />
    //                 </BrowserRouter>
    //             </LanguageContext.Provider>
    //         </AuthContext.Provider>
    //     );

    //     const titleInput = screen.getByLabelText('Title');
    //     const authorInput = screen.getByLabelText('Author');
    //     const addButton = screen.getByRole('button', {name: 'Add book'});

    //     fireEvent.change(titleInput, { target: { value: 'Test Book' } });
    //     fireEvent.change(authorInput, { target: { value: 'Test Author' } });
    //     fireEvent.click(addButton);

    //     expect(addBook).toHaveBeenCalledWith({ title: 'Test Book', author: 'Test Author' });
    // });

});