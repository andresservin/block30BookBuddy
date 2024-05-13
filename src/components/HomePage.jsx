import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import './HomePage.css';
import BookCard from './BookCard';

function HomePage() {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { isLoggedIn, logout } = useAuth();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/books');
                if (!response.ok) {
                    throw new Error('Failed to fetch books.');
                }
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                // Handle errors properly
            }
        };

        fetchBooks();
    }, []);

    const filteredBooks = searchTerm
        ? books.filter(book =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : books;

    const handleLogout = () => {
        logout();
        // Redirect to login page
    };

    return (
        <div className="homepage">
            <input
                className="search-bar"
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
            <div className="book-list">
                {filteredBooks.map(book => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
}

export default HomePage;