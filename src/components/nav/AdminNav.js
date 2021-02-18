import React from 'react';
import { Link } from 'react-router-dom';

const AdminNav = () => {
    return (
        <nav>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to="/admin/dashboard" className="nav-link">
                        Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/user/password" className="nav-link">
                        Mot de passe
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/product" className="nav-link">
                        Produit
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/products" className="nav-link">
                        Produits
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin/category" className="nav-link">
                        Categories
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default AdminNav;