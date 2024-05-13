import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/books/${book.id}`);
    };

    return (
        <div className="book-card" onClick={handleClick}>
            <img src={book.coverImage} alt={book.title} />
            <div>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
            </div>
        </div>
    );
};

export default BookCard;