export const isValidUsername = (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    return usernameRegex.test(username);
};

export const isValidPassword = (password: string) => {
    return password.length >= 6 && password.length <= 25;
}

export const isValidUrl = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    }
    catch {
        return false;
    }
}