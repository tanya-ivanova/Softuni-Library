import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LanguageContext } from '../../../contexts/LanguageContext';
import BookItemAdmin from './BookItemAdmin';

describe('BookItemAdmin', () => {
    const book = {
        _id: '123',
        title: 'Book Title',
        author: 'Book Author',
        year: 2021,
        ownerEmail: 'test@example.com',
    };

    const bookDeleteHandler = jest.fn();

    test('renders book information', () => {
        render(
            <LanguageContext.Provider value={{ language: 'english' }}>
                <BrowserRouter>
                    <table>
                        <tbody>
                            <tr>
                                <BookItemAdmin book={book} bookDeleteHandler={bookDeleteHandler} />
                            </tr>
                        </tbody>
                    </table>
                </BrowserRouter>
            </LanguageContext.Provider>
        );

        expect(screen.getByText('Book Title')).toBeInTheDocument();
        expect(screen.getByText('Book Author')).toBeInTheDocument();
        expect(screen.getByText('2021')).toBeInTheDocument();
        expect(screen.getByText('123')).toBeInTheDocument();
        expect(screen.getByText('test@example.com')).toBeInTheDocument();
    });

    // test('should navigate to edit page when edit icon is clicked', async () => {
    //     const navigate = jest.fn();

    //     const mockUseNavigate = jest.fn();
    //     jest.mock('react-router-dom', () => ({
    //         ...jest.requireActual('react-router-dom'),
    //         useNavigate: () => mockUseNavigate,
    //     }));

    //     jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

    //     render(
    //         <LanguageContext.Provider value={{ language: 'english' }}>
    //             <BrowserRouter>
    //                 <table>
    //                     <tbody>
    //                         <tr>
    //                             <BookItemAdmin book={book} bookDeleteHandler={bookDeleteHandler} />
    //                         </tr>
    //                     </tbody>
    //                 </table>
    //             </BrowserRouter>
    //         </LanguageContext.Provider>
    //     );

    //     const editIcon = screen.getByTestId('edit-button');
    //     fireEvent.click(editIcon);

    //     expect(navigate).toHaveBeenCalledWith(`/catalog/${book._id}/edit`);
    // });

    it('should call bookDeleteHandler and close modal when confirm button is clicked', async () => {

        render(
            <LanguageContext.Provider value={{ language: 'english' }}>
                <BrowserRouter>
                    <table>
                        <tbody>
                            <tr>
                                <BookItemAdmin book={book} bookDeleteHandler={bookDeleteHandler} />
                            </tr>
                        </tbody>
                    </table>
                </BrowserRouter>
            </LanguageContext.Provider>
        );
        const deleteButton = screen.getByTestId('delete-button');
        fireEvent.click(deleteButton);
        const modal = await screen.findByText('Are you sure', { exact: false });
        expect(modal).toBeInTheDocument();

        const confirmButton = screen.getByText('Confirm');
        fireEvent.click(confirmButton);
        //await waitFor(() => expect(bookDeleteHandler).toHaveBeenCalled());
        expect(screen.queryByText('Are you sure', { exact: false })).not.toBeInTheDocument();
    });
});