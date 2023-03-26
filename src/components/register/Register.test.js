import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from "../../contexts/AuthContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import Register from './Register';

describe('Register', () => {
    test('Register form renders correctly', () => {
        const mockLogin = jest.fn();

        render(
            <AuthContext.Provider value={{ userLogin: mockLogin }} >
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <BrowserRouter>
                        <Register />
                    </BrowserRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );
        
        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Password');
        const confirmPasswordInput = screen.getByLabelText('Re-enter password');
        const submitButton = screen.getByRole('button', { name: 'Register' });
                
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(confirmPasswordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    test('Displays error message if fields are empty on submit', async () => {
        const mockLogin = jest.fn();

        render(
            <AuthContext.Provider value={{ userLogin: mockLogin }} >
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <BrowserRouter>
                        <Register />
                    </BrowserRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const submitButton = screen.getByRole('button', { name: 'Register' });

        fireEvent.click(submitButton);

        await waitFor(() => {
            const errorMessage = screen.getByText('All fields are required');
            expect(errorMessage).toBeInTheDocument();
        });
    });

    test('Error message appears when passwords do not match', async () => {
        const mockLogin = jest.fn();

        render(
            <AuthContext.Provider value={{ userLogin: mockLogin }} >
                <LanguageContext.Provider value={{
                    language: 'english',
                    setAppLanguage: () => { }
                }}>
                    <BrowserRouter>
                        <Register />
                    </BrowserRouter>
                </LanguageContext.Provider>
            </AuthContext.Provider>
        );

        const passwordInput = screen.getByLabelText('Password');
        const confirmPasswordInput = screen.getByLabelText('Re-enter password');
        const submitButton = screen.getByRole('button', { name: 'Register' });

        fireEvent.change(passwordInput, { target: { value: 'password1' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'password2' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            const errorMessage = screen.getByText("Passwords don't match!");
            expect(errorMessage).toBeInTheDocument();
        });
    });

    // test('Form is submitted when all fields are valid', async () => {
    //     const mockLogin = jest.fn();        

    //     render(
    //         <AuthContext.Provider value={{ userLogin: mockLogin }} >
    //             <LanguageContext.Provider value={{
    //                 language: 'english',
    //                 setAppLanguage: () => { }
    //             }}>
    //                 <BrowserRouter>
    //                     <Register />
    //                 </BrowserRouter>
    //             </LanguageContext.Provider>
    //         </AuthContext.Provider>
    //     );

    //     const emailInput = screen.getByLabelText('Email');
    //     const passwordInput = screen.getByLabelText('Password');
    //     const confirmPasswordInput = screen.getByLabelText('Re-enter password');
    //     const submitButton = screen.getByRole('button', { name: 'Register' });

    //     fireEvent.change(emailInput, { target: { value: 'valid-email@example.com' } });
    //     fireEvent.change(passwordInput, { target: { value: 'password1' } });
    //     fireEvent.change(confirmPasswordInput, { target: { value: 'password1' } });
    //     fireEvent.click(submitButton);

    //     await waitFor(() => expect(mockLogin).toHaveBeenCalled());
        
    // });
});