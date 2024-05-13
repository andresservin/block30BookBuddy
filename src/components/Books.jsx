/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. 
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiRequest from './api';

const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
      const fetchBooks = async () => {
        try {
          const data = await apiRequest('/api/books');
          setBooks(data);
        } catch (error) {
          console.error('Error fetching books:', error.message);
        }
      };
  
      fetchBooks();
    }, []);

  return (
    <div>
      <h2>Library Catalog</h2>
      {books.map((book) => (
        <div key={book.id}>
          <Link to={`/books/${book.id}`}>{book.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default Books;*/

