import { render, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import * as authService from '../../services/authService';
import Logout from './Logout';

jest.mock('../../services/authService');

describe('Logout', () => {
    const user = {
        accessToken: 'testToken'
    };
    const userLogout = jest.fn();    

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('calls authService.logout and userLogout on successful logout', async () => {
        authService.logout.mockResolvedValueOnce();
        render(
            <AuthContext.Provider value={{ user, userLogout }}>
                <BrowserRouter>
                    <Logout />
                </BrowserRouter>
            </AuthContext.Provider>
        );

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(authService.logout).toHaveBeenCalledWith(user.accessToken);
        expect(userLogout).toHaveBeenCalled();        
    });
});