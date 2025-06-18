interface LinkCard {
    title: string;
    url: string;
}

interface LinkCardProps {
    card: LinkCard,
    index: number;
    isEditing: boolean;
    isValid: boolean;
    onChange?: (index: number, updatedCard: LinkCard) => void;
    onDelete?: (index: number) => void;
}

const LinkCard =
    ({
         card,
         index,
         isEditing,
         isValid,
         onChange,
         onDelete
    }: LinkCardProps) => {
    return (
        <>
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
                            className={!isValid ? 'link-card-invalid' : ''}
                        />
                    </div>
                    <button onClick={() => onDelete?.(index)}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>

            ) : (
                <a className="link-display-card" href={card.url} target="_blank" rel="noopener noreferrer">
                    {card.title}
                </a>
            )}
        </>
    );
}

export default LinkCard;