import React, {useEffect, useState} from "react";
import LinkCard from "../components/LinkCard";
import {useParams} from "react-router-dom";
import {getUserLinks, updateUserLinks} from "../api/user";
import {useIsOwner} from "../hooks/useIsOwner";

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

    useEffect(() => {
        if (username) {
            getUserLinks(username)
                .then(data => setLinkCards(data.links))
                .catch(err => console.log(err));
        }
    }, []);

    useEffect(() => {
        if (!isEditing || !username) return;
        if (timer) clearTimeout(timer);
        const newTimer = setTimeout(() => {
            updateUserLinks(username, linkCards)
                .then(() => console.log('Updated user links'))
                .catch(err => console.log(err));
        }, 1000)

        setTimer(newTimer);
        return () => clearTimeout(newTimer);
    }, [linkCards, username, isEditing]);

    const addNewCard = () => {
        setLinkCards(prevState => [...prevState, {title: '', url: ''}]);
    };

    return (
        <div id="user">
            {isOwner &&
                <button onClick={() => setIsEditing(!isEditing)}>
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