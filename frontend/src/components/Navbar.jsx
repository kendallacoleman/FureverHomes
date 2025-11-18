import React, { useState } from 'react'; // 1. Import useState
import { Link } from 'react-router-dom';
import "../styles/Navbar.css"

function Navbar() {
    // 2. Initialize state for menu open/closed
    const [isOpen, setIsOpen] = useState(false);

    // 3. Toggle function
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                Furever Homes
            </Link>
            
            {/* 4. Hamburger Button (Menu Toggle) */}
            <button className="menu-toggle" onClick={toggleMenu}>
                {/* Display an appropriate icon based on state */}
                {isOpen ? '✕' : '☰'} 
            </button>
            
            {/* 5. Dynamically apply the 'active' class */}
            <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                <li className="nav-item">
                    {/* Add onClick={toggleMenu} to close menu on link click */}
                    <Link to="/help" className="nav-link" onClick={toggleMenu}>Help</Link>
                </li>
                <li className="nav-item">
                    <Link to="/search" className="nav-link" onClick={toggleMenu}>Search</Link>
                </li>
                <li className="nav-item">
                    <Link to="/favorites" className="nav-link" onClick={toggleMenu}>Favorites</Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile" className="nav-link" onClick={toggleMenu}>Profile</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;