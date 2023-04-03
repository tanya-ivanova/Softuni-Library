import * as request from "./requester";
import { host } from "../constants";

const baseUrl = `${host}/users`;

export const login = (email, password) => 
    request.post(`${baseUrl}/login`, {email, password});

export const logout = async (accessToken) => {
    try {
        const response = await fetch(`${baseUrl}/logout`, {
            headers: {
                'X-Authorization': accessToken
            }
        });
        
        return response;

    } catch (error) {
        console.log(error);   
    }
}

export const register = (email, password) => 
    request.post(`${baseUrl}/register`, {email, password});
    