import React, {useEffect, useState} from "react";
import LinkCard from "../components/LinkCard";
import {useParams} from "react-router-dom";
import {getUserLinks, updateUserLinks} from "../api/user";
import {useIsOwner} from "../hooks/useIsOwner";
import {useAuth} from "../context/AuthContext";
import '../styles/user.css'
import {isValidUrl} from "../utils/validation";

interface linkCard {
    title: string;
    url: string;
}

const User = () => {
    const {username} = useParams<{username: string}>();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [linkCards, setLinkCards] = useState<linkCard[]>([]);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    const [userExists, setUserExists] = useState<boolean>(false);
    const [cardValidity, setCardValidity] = useState<boolean[]>([]);
    const isOwner = useIsOwner();
    const {token} = useAuth();
    const hasInvalidInput = cardValidity.some(valid => !valid);

    const MAX_CARDS = 10;
    const AUTO_SAVE_DELAY_MS = 1500;

    useEffect(() => {
        if (username) {
            getUserLinks(username.toLowerCase())
                .then(data => {
                    setLinkCards(data.links);
                    setUserExists(true);
                    if (isOwner && linkCards.length === 0) {
                        setIsEditing(true);
                    }
                })
                .catch(err => {
                    console.log(err);
                    setUserExists(false);
                });
        }
    }, [username]);

    useEffect(() => {
        if (!isEditing || !username) return;
        if (timer) clearTimeout(timer);

        const newTimer = setTimeout(() => {
            if (hasInvalidInput) return;
            const validLinks = linkCards.filter(link => link.title.trim() && link.url.trim());
            updateUserLinks(username.toLowerCase(), token, validLinks)
                .then(() => console.log('Updated user links'))
                .catch(err => console.log(err));
        }, AUTO_SAVE_DELAY_MS)

        setTimer(newTimer);
        return () => clearTimeout(newTimer);
    }, [linkCards, username, isEditing]);

    useEffect(() => {
        if (!isOwner && isEditing) {
            setIsEditing(false)
        }
    }, [isOwner]);

    useEffect(() => {
        const newValidity = linkCards.map(link => {
            const url = link.url.trim();
            return url === '' || isValidUrl(url);
        });

        setCardValidity(newValidity);
    }, [linkCards]);

    const addNewCard = () => {
        setLinkCards(prevState => [...prevState, {title: '', url: ''}]);
    };

    const toggleEditing = () => {
        if (isEditing) {
            const validLinks = linkCards.filter(link => link.title.trim() && link.url.trim());
            setLinkCards(validLinks);

            if (!username) return;
            updateUserLinks(username.toLowerCase(), token, validLinks)
                .then(() => console.log('Updated user links'))
                .catch(err => console.log(err));
        }
        setIsEditing(!isEditing);
    }

    return (
        <div id="user">
            {!userExists ? (<h1 id="user-dne">User: "{username}" does not exist.</h1>)
                : (
                    <>
                        {isOwner && !hasInvalidInput &&
                            <button id="user-edit" onClick={toggleEditing}>
                                <i className="fa-solid fa-pen"></i>
                            </button>
                        }
                        <div id="user-title">
                            <h1>{username}</h1>
                            <a href="/" id="user-devlink">DevLink</a>
                            {hasInvalidInput &&
                                <p id="user-invalid-input">
                                    One or more links are invalid. Please fix before continuing.
                                </p>
                            }
                        </div>
                        <div id="user-links">
                            {linkCards.map((card: linkCard, index: number) => {
                                return (
                                    <LinkCard
                                        key={index}
                                        card={card}
                                        index={index}
                                        isEditing={isEditing}
                                        isValid={cardValidity[index]}
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
                            {isEditing && linkCards.length < MAX_CARDS &&
                                <button onClick={addNewCard} id="user-add-card">
                                    Add +
                                </button>
                            }
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default User;