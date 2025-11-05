import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css"

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                Furever Homes
            </Link>
            <ul className="nav-links">
                <li className="nav-item">
                    <Link to="/help" className="nav-link">Help</Link>
                </li>
                <li className="nav-item">
                    <Link to="/search" className="nav-link">Search</Link>
                </li>
                <li className="nav-item">
                    <Link to="/favorites" className="nav-link">Favorites</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                    <Link to="/logout" className="nav-link">Log Out</Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;