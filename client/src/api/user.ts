import axios from 'axios';

export const getUserLinks = async (username: string) => {
    const res = await axios.get(`/api/users/${username}`);
    return res.data;
};

export const updateUserLinks = async (
    username: string,
    links: { title: string; url: string }[]
) => {
    const token = localStorage.getItem('token');
    const res = await axios.put(`/api/users/${username}`, links, {
        headers: {
            Authorization: token,
        },
    });
    return res.data;
};
