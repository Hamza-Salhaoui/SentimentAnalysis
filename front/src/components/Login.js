import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from './firebaseConfig';
import { signInWithPopup } from 'firebase/auth';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [isRegistered, setIsRegistered] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [globalError, setGlobalError] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    // Gestion de la connexion avec Google
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            localStorage.setItem('authToken', user.accessToken);
            localStorage.setItem('userEmail', user.email);
            setSuccessMessage(`Connexion réussie en tant que ${user.displayName}`);
            navigate('/reviews');
        } catch (error) {
            setGlobalError("");
            setLoginError("Échec de la connexion avec Google.");
        }
    };

    // Soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setGlobalError("L'email et le mot de passe sont requis.");
            return;
        }
        setSuccessMessage(isRegistered ? 'Inscription réussie' : 'Connexion réussie');
        navigate('/reviews');
    };

    return (
        <div className="container mt-5 pt-5">
            <h2 className="text-center mb-4" style={{ color: '#2D3E50' }}>
                {isRegistered ? 'Inscrivez-vous!' : 'Connectez-vous!'}
            </h2>

            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg border-light" style={{ backgroundColor: '#F9F9F9' }}>
                        <div className="card-body">
                            <h5 className="card-title text-center mb-4" style={{ color: '#0288D1' }}>
                                {isRegistered ? "Créer un compte" : "Bienvenue"}
                            </h5>

                            {successMessage && <div className="alert alert-success">{successMessage}</div>}
                            {globalError && <div className="alert alert-danger">{globalError}</div>}
                            {loginError && <div className="alert alert-danger">{loginError}</div>}

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email" style={{ color: '#5C6B7D' }}>Email</label>
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        id="email"
                                        name="email"
                                        placeholder="Votre email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>

                                <div className="form-group mt-3">
                                    <label htmlFor="password" style={{ color: '#5C6B7D' }}>Mot de passe</label>
                                    <input
                                        type="password"
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        id="password"
                                        name="password"
                                        placeholder="Votre mot de passe"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>

                                <button type="submit" className="btn btn-lg btn-primary mt-3 btn-block" style={{ backgroundColor: '#4CAF50' }}>
                                    {isRegistered ? 'S\'inscrire' : 'Se connecter'}
                                </button>
                            </form>

                            <div className="mt-3 text-center">
                                <p>Ou connectez-vous avec</p>
                                <button
                                    onClick={handleGoogleSignIn}
                                    className="btn btn-outline-dark btn-block"
                                >
                                    Connexion avec Google
                                </button>
                            </div>

                            <div className="mt-4 text-center">
                                <p>
                                    {isRegistered ? 'Vous avez déjà un compte ?' : "Vous n'avez pas de compte ?"}{' '}
                                    <span
                                        className="text-primary"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setIsRegistered(!isRegistered)}
                                    >
                                        {isRegistered ? 'Se connecter' : "S'inscrire"}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
