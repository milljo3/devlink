import axios from 'axios';

// Fetches the user data and their associated links from the server
export const getUserLinks = async (username: string) => {
    const res = await axios.get(`/api/users/${username}`);
    return res.data; // Returns API response of the user's links
};
// Updates the user's links with the provided data
export const updateUserLinks = async (
    username: string, // Username of the user whose links are being updated
    token: string | null, // Authorization token
    links: { title: string; url: string }[] // Array of link objects with title and url properties
) => {

    // Makes a PUT request to update user data with new links
    const res = await axios.put(`/api/users/${username}`, links, {
        headers: {
            Authorization: token, // Include token in the request headers for authentication
        },
    });
    return res.data; // Returns API response message
};
