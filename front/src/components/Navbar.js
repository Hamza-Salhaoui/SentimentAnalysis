import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar({ username, setUsername }) {
    const navigate = useNavigate();

    // Gestion de la déconnexion
    const handleLogout = () => {
        setUsername('');
        navigate('/login'); // Redirection vers la page d'accueil après la déconnexion
    };

    // Fonction de navigation au survol
    const handleMouseOver = (path) => {
        navigate(path);
    };

    return (
        <div>
            <style>
                {`
                    .navbar {
                        background-color: #2C3E50;
                        width: 100vw;  /* Largeur dynamique */
                        padding: 15px 30px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                        position: fixed;
                        top: 0;
                        left: 0;
                        z-index: 1000;
                    }

                    .navbar .logo {
                        font-size: 1.5rem;
                        font-weight: bold;
                        color: #ECF0F1;
                        cursor: pointer;
                    }

                    .navbar .menu {
                        display: flex;
                        align-items: center;
                    }

                    .navbar span {
                        color: #ECF0F1;
                        text-decoration: none;
                        margin: 0 20px;
                        font-size: 1.1rem;
                        transition: color 0.3s ease;
                        cursor: pointer;
                    }

                    .navbar span:hover {
                        color: #1ABC9C;
                    }

                    .navbar button {
                        background-color: #E74C3C;
                        border: none;
                        color: white;
                        padding: 10px 20px;
                        font-size: 1rem;
                        border-radius: 5px;
                        cursor: pointer;
                        transition: background-color 0.3s ease;
                    }

                    .navbar button:hover {
                        background-color: #C0392B;
                    }

                    .navbar .user-info {
                        color: #ECF0F1;
                        margin-right: 20px;
                        font-weight: bold;
                    }
                `}
            </style>

            <div className="navbar">
                <div className="logo" onMouseOver={() => navigate('/home')} style={{ cursor: 'pointer' }}>
                    Sentiment Analysis
                </div>
                <div className="menu">
                    <span onMouseOver={() => handleMouseOver('/home')}>Accueil</span>
                    <span onMouseOver={() => handleMouseOver('/about')}>À propos</span>
                    <span onMouseOver={() => handleMouseOver('/services')}>Services</span>
                    <span onMouseOver={() => handleMouseOver('/reviews')}>Avis</span>
                    <span onMouseOver={() => handleMouseOver('/reports')}>Rapports</span>
                    <span onMouseOver={() => handleMouseOver('/analyses')}>Analyses</span>
                    <span onMouseOver={() => handleMouseOver('/analyseslive')}>Analyses Live</span>
                    <span onMouseOver={() => handleMouseOver('/contact')}>Contact</span>


                </div>
                <div className="user-actions">
                    <span className="user-info">
                        {username ? `Bienvenue, ${username}` : 'Bienvenue!'}
                    </span>
                    {username ? (
                        <button onClick={handleLogout}>Déconnexion</button>
                    ) : (
                        <button onMouseOver={() => handleMouseOver('/login')}>Connexion</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
