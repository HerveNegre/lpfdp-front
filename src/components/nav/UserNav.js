import React from 'react';
import { Link } from 'react-router-dom';

const UserNav = () => (
    <nav>
        <ul classname="nav flex-column">
            <li className="nav-item">
                <Link to="/user/history" className="nav-link">History</Link>
            </li>
            <li className="nav-item">
                <Link to="/user/password" className="nav-link">Mot de passe</Link>
            </li>
            <li className="nav-item">
                <Link to="/user/wishlist" className="nav-link">Ma liste de produit</Link>
            </li>
        </ul>
    </nav>
);

export default UserNav;