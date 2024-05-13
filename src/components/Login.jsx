/* TODO - add your code to create a functional React component that renders a login form */

import React, { useState } from 'react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // const response = await fetch('/api/users/login', {
            const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: username, password: password })
            });
            const data = await response.json();
            if (response.ok) {
                login(data.token); // login function from AuthContext to set the token and log in status
            } else {
                throw new Error(data.message || 'Failed to login');
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };
    return (
        <form onSubmit={handleLogin}>
        <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
        />
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />
        <button type="submit">Login</button>
        </form>
    );
}

export default Login;