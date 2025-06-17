import React, {useEffect, useState} from "react";
import LinkCard from "../components/LinkCard";
import {useParams} from "react-router-dom";
import {getUserLinks, updateUserLinks} from "../api/user";
import {useIsOwner} from "../hooks/useIsOwner";
import {useAuth} from "../context/AuthContext";

interface linkCard {
    title: string;
    url: string;
}

const User = () => {
    const {username} = useParams<{username: string}>();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [linkCards, setLinkCards] = useState<linkCard[]>([]);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    const isOwner = useIsOwner();
    const {token} = useAuth();

    useEffect(() => {
        if (username) {
            getUserLinks(username)
                .then(data => setLinkCards(data.links))
                .catch(err => console.log(err));
            if (isOwner && linkCards.length === 0) {
                setIsEditing(true);
            }
        }
    }, [username]);

    useEffect(() => {
        if (!isEditing || !username) return;
        if (timer) clearTimeout(timer);
        const newTimer = setTimeout(() => {
            const validLinks = linkCards.filter(link => link.title.trim() && link.url.trim());
            updateUserLinks(username, token, validLinks)
                .then(() => console.log('Updated user links'))
                .catch(err => console.log(err));
        }, 1000)

        setTimer(newTimer);
        return () => clearTimeout(newTimer);
    }, [linkCards, username, isEditing]);

    useEffect(() => {
        if (!isOwner && isEditing) {
            setIsEditing(false)
        }
    }, [isOwner]);

    const addNewCard = () => {
        setLinkCards(prevState => [...prevState, {title: '', url: ''}]);
    };

    const toggleEditing = () => {
        if (isEditing) {
            const validLinks = linkCards.filter(link => link.title.trim() && link.url.trim());
            setLinkCards(validLinks);
        }
        setIsEditing(!isEditing);
    }

    return (
        <div id="user">
            <a href="/">DevLink</a>
            {isOwner &&
                <button onClick={toggleEditing}>
                    <i className="fa-solid fa-pen"></i>
                </button>}
            <h1>{username}</h1>
            {linkCards.map((card: linkCard, index: number) => {
                return (
                    <LinkCard
                        key={index}
                        card={card}
                        index={index}
                        isEditing={isEditing}
                        onChange={(i, updatedCard) => {
                            const newCards = [...linkCards];
                            newCards[i] = updatedCard;
                            setLinkCards(newCards);
                        }}
                        onDelete={(i) => {
                            const newCards = [...linkCards];
                            newCards.splice(i, 1);
                            setLinkCards(newCards);
                        }}
                    />
                );
            })}
            {isEditing && linkCards.length < 20 &&
                <button onClick={addNewCard} className="user-add-card">
                    + Add
                </button>
            }
        </div>
    );
};

export default User;