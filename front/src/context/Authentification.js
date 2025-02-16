import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Création du contexte
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Vérification de l'utilisateur connecté au chargement de l'application
    useEffect(() => {
        axios.get('/api/auth/user', { withCredentials: true })
            .then(response => {
                setUser(response.data);
                setLoading(false);
            })
            .catch(() => {
                setUser(null);
                setLoading(false);
            });
    }, []);

    // Fonction d'inscription
    const register = async (formData) => {
        try {
            const response = await axios.post('/api/auth/register', formData);
            setUser(response.data);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    };

    // Fonction de connexion
    const login = async (formData) => {
        try {
            const response = await axios.post('/api/auth/login', formData);
            setUser(response.data);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    };

    // Fonction de déconnexion
    const logout = async () => {
        await axios.post('/api/auth/logout');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
