import {useParams} from "react-router-dom";

export const useIsOwner = () => {
    const { username } = useParams();
    const loggedInUsername = localStorage.getItem("username");
    return loggedInUsername === username;
};
