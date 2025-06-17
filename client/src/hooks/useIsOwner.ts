import {useParams} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

export const useIsOwner = () => {
    const { username } = useParams<{username: string}>();
    const {username: loggedInUsername} = useAuth();
    return username === loggedInUsername;
};
