import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; 
import './Banner.css'; 

function Banner() {
    const { isLoggedIn, logout } = useAuth(); 
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); 
    };

  
    return (
        <header className="banner-header">
            <div className="logo-container">
                <img src="/src/components/logo.png" alt="Logo" className="logo"/>
            </div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    {isLoggedIn ? (
                        <>
                        <li><Link to="/account">Profile</Link></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
                <li><Link to="/search">Search</Link></li>
                <li><Link to="/new">What's New</Link></li>
            </ul>
        </nav>
        <div className="search-container">
            <input
                className="search-bar"
                type="text"
                placeholder="Search books..."
            />
        </div>
    </header>
);
}

export default Banner;