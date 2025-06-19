import axios from 'axios';

// Authenticates a user by logging them in with their username and password
export const login = async (username: string, password: string) => {
    const res = await axios.post('/api/auth/login', {
        username,
        password,
    });
    return res.data;
};

// Registers a new user with the provided username and password
export const register = async (username: string, password: string) => {
    const res = await axios.post('/api/auth/register', {
        username,
        password,
    });
    return res.data;
};