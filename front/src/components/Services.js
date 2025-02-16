import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';// Importation de Bootstrap
import { Link } from 'react-router-dom';
function Services() {
    return (
        <div className="container mt-5" style={{ paddingTop: '80px' }}>
            <section className="text-center mb-5">
                <h2 className="display-4 font-weight-bold" style={{ color: '#2D3E50' }}>Nos Services</h2>
                <p className="lead text-muted">Découvrez les services que nous offrons pour répondre à vos besoins.</p>
            </section>

            <section className="row justify-content-center">
                {/* Service 1 - Analyse des Sentiments */}
                <div className="col-md-4 mb-4">
                    <div className="card shadow-lg border-0 rounded-lg p-4" style={{ backgroundColor: '#F9F9F9' }}>
                        <div className="d-flex justify-content-center mb-3">
                            <img
                                src="https://via.placeholder.com/60"
                                alt="Analyse des Sentiments"
                                style={{ width: '60px', height: '60px' }}
                            />
                        </div>
                        <h5 className="card-title font-weight-bold" style={{ color: '#4CAF50' }}>Analyse des Sentiments</h5>
                        <p className="card-text" style={{ fontSize: '14px', color: '#5C6B7D' }}>
                            Utilisez notre plateforme pour analyser les opinions exprimées sur les réseaux sociaux, articles de presse, et plus encore.
                        </p>
                    </div>
                </div>

                {/* Service 2 - Suivi en Temps Réel */}
                <div className="col-md-4 mb-4">
                    <div className="card shadow-lg border-0 rounded-lg p-4" style={{ backgroundColor: '#F9F9F9' }}>
                        <div className="d-flex justify-content-center mb-3">
                            <img
                                src="https://via.placeholder.com/60"
                                alt="Suivi en Temps Réel"
                                style={{ width: '60px', height: '60px' }}
                            />
                        </div>
                        <h5 className="card-title font-weight-bold" style={{ color: '#F57C00' }}>Suivi en Temps Réel</h5>
                        <p className="card-text" style={{ fontSize: '14px', color: '#5C6B7D' }}>
                            Recevez des mises à jour et des rapports instantanés sur la perception de votre marque, ce qui vous permet d'agir rapidement.
                        </p>
                    </div>
                </div>

                {/* Service 3 - Reporting Personnalisé */}
                <div className="col-md-4 mb-4">
                    <div className="card shadow-lg border-0 rounded-lg p-4" style={{ backgroundColor: '#F9F9F9' }}>
                        <div className="d-flex justify-content-center mb-3">
                            <img
                                src="https://via.placeholder.com/60"
                                alt="Reporting Personnalisé"
                                style={{ width: '60px', height: '60px' }}
                            />
                        </div>
                        <h5 className="card-title font-weight-bold" style={{ color: '#0288D1' }}>Reporting Personnalisé</h5>
                        <p className="card-text" style={{ fontSize: '14px', color: '#5C6B7D' }}>
                            Créez des rapports sur mesure pour suivre les métriques qui comptent le plus pour votre entreprise.
                        </p>
                    </div>
                </div>
            </section>

            <section className="row mt-5">
                <div className="col-md-12 text-center">
                    <div className="card shadow-lg border-0 rounded-lg p-4" style={{ backgroundColor: '#F9F9F9' }}>
                        <h5 className="card-title font-weight-bold" style={{ color: '#8E24AA' }}>Pourquoi Choisir Nos Services ?</h5>
                        <p className="card-text" style={{ fontSize: '14px', color: '#5C6B7D' }}>
                            Nos services sont conçus pour offrir des solutions précises et adaptées à vos besoins spécifiques en matière d'analyse des sentiments, avec une plateforme intuitive et des rapports personnalisables.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Services;
