interface LinkCard {
    title: string;
    url: string;
}

const LinkCard =
    ({
         card,
         index,
         isEditing,
         onChange,
         onDelete
    }: {
        card: LinkCard,
        index: number;
        isEditing: boolean;
        onChange?: (index: number, updatedCard: LinkCard) => void;
        onDelete?: (index: number) => void;
    }) => {
    return (
        <div className="link-card">
            {isEditing ? (
                <div className="link-edit-card">
                    <div>
                        <input
                            type="text"
                            value={card.title}
                            onChange={(e) => onChange?.(index, {...card, title: e.target.value})}
                            placeholder="Title"
                        />
                        <input
                            type="text"
                            value={card.url}
                            onChange={(e) => onChange?.(index, {...card, url: e.target.value})}
                            placeholder="URL"
                        />
                    </div>
                    <button onClick={() => onDelete?.(index)}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>

            ) : (
                <a href={card.url} target="_blank" rel="noopener noreferrer">
                    {card.title}
                </a>
            )}
        </div>
    );
}

export default LinkCard;