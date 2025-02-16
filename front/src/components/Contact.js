import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import emailjs from 'emailjs-com';
import ContactMap from "./ContactMap";

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        let tempErrors = {};
        const nameRegex = /^[a-zA-Z\s]+$/;

        if (!formData.name.trim()) {
            tempErrors.name = 'Le nom est requis';
        } else if (!nameRegex.test(formData.name)) {
            tempErrors.name = 'Le nom ne doit contenir que des lettres et des espaces';
        }

        if (!formData.email.trim()) {
            tempErrors.email = "L'email est requis";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = 'Adresse email invalide';
        }

        if (!formData.message.trim()) {
            tempErrors.message = 'Le message ne peut pas être vide';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            emailjs.send(
                'service_5pbnkao',
                'template_ufpbu6f',
                {
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                },
                '4MHTVfOVD7G2txjDr'
            ).then(() => {
                setSuccess(true);
                setFormData({ name: '', email: '', message: '' });
            }).catch((err) => {
                console.error('Erreur lors de l\'envoi', err);
            });
        }
    };

    return (
        <div className="container mt-5" style={{ paddingTop: '50px' }}>
            <h2 className="text-center mb-4 fw-bold" style={{ color: '#2D3E50' }}>Contactez-nous</h2>
            <p className="text-center mb-5 text-muted">Nous serions ravis de vous entendre !</p>

            <div className="row justify-content-center">
                <div className="col-lg-4 col-md-5 mb-4">
                    <div className="card shadow-lg border-0 rounded-3" style={{ width: '400px', height: '520px' }}>
                        <div className="card-body p-4">
                            <h5 className="text-center fw-bold mb-4" style={{ color: '#4CAF50' }}>Nos Informations</h5>
                            <ul className="list-unstyled text-muted">
                                <li className="mb-3"><strong>Email :</strong> Salhaouihamza999@gmail.com</li>
                                <li className="mb-3"><strong>Téléphone :</strong> +212 630 563 148</li>
                                <li className="mb-3"><strong>Adresse :</strong> 1 Hay SALAM, SALE, MAROC</li>
                            </ul>
                            <div className="mt-4">
                                <ContactMap />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 col-md-7 mb-4">
                    <div className="card shadow-lg border-0 rounded-3" style={{ width: '800px', height: '520px' }}>
                        <div className="card-body p-4">
                            <h5 className="text-center fw-bold mb-4" style={{ color: '#0288D1' }}>Envoyez-nous un message</h5>

                            {success && (
                                <div className="alert alert-success text-center">
                                    Votre message a été envoyé avec succès !
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="name" className="fw-bold" style={{ color: '#5C6B7D' }}>Nom</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        id="name"
                                        name="name"
                                        placeholder="Votre nom"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="email" className="fw-bold" style={{ color: '#5C6B7D' }}>Email</label>
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        id="email"
                                        name="email"
                                        placeholder="Votre email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="message" className="fw-bold" style={{ color: '#5C6B7D' }}>Message</label>
                                    <textarea
                                        className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                                        id="message"
                                        name="message"
                                        rows="4"
                                        placeholder="Votre message"
                                        value={formData.message}
                                        onChange={handleChange}
                                    ></textarea>
                                    {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                                </div>

                                <button type="submit" className="btn btn-lg btn-primary btn-block" style={{ backgroundColor: '#4CAF50' }}>
                                    Envoyer
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
