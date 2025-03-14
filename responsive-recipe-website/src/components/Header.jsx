import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // Use the dedicated Header CSS

function Header() {
  return (
    <header className="App-header">
      <h1>Responsive Recipe Web App</h1>
      <nav>
        <Link to="/" className="nav-button">
          <span>Home</span>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
