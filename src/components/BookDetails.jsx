import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Use the custom hook to access auth context

function BookDetails() {
    const { id } = useParams(); // Get the book ID from URL parameters
    const [book, setBook] = useState(null); // State to hold book details
    const { isLoggedIn, token } = useAuth(); // Use isLoggedIn to conditionally render the checkout button and token for API requests

    useEffect(() => {
        // Function to fetch book details
        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/books/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        ...(isLoggedIn && { 'Authorization': `Bearer ${token}` }), // Conditionally add auth header
                    }
                });
                if (!response.ok) throw new Error('Failed to fetch book details.');
                const data = await response.json();
                setBook(data);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchBookDetails();
    }, [id, isLoggedIn, token]); // Depend on id, isLoggedIn, and token so it refetches if these values change

    const handleCheckout = async () => {
        // Ensure the user is logged in
        if (!isLoggedIn) {
            alert("Please log in to checkout books.");
            return;
        }

        try {
            const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/checkout/${id}`, {
            // const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/books/checkout/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Use the bearer token for authorization
                },
                body: JSON.stringify({ available: false }), // Assuming the API expects this body; adjust as needed
            });

            if (!response.ok) throw new Error('Failed to checkout the book.');

            alert("Book checked out successfully!");
            // Optionally, refetch book details to update the UI
            fetchBookDetails();
        } catch (error) {
            console.error("Checkout failed:", error);
        }
    };

    return (
        <div>
            {book ? (
                <>
                    <h1>{book.title}</h1>
                    <p>{book.description}</p>
                    <p>Author: {book.author}</p>
                    {isLoggedIn && <button onClick={handleCheckout}>Checkout Book</button>}
                </>
            ) : (
                <p>Loading book details...</p>
            )}
        </div>
    );
}

export default BookDetails;