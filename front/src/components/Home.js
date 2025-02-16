import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importation de Bootstrap

function Home() {
    return (
        <div className="container mt-5" style={{ paddingTop: '80px' }}>
            {/* Section des avantages */}
            <section className="text-center mb-5">
                <h3 className="display-5 mb-4 font-weight-bold" style={{ color: '#2D3E50' }}>Pourquoi Choisir Notre Plateforme ?</h3>
                <div className="row justify-content-center">
                    {/* Card 1 - Analyse Avancée */}
                    <div className="col-md-3 mb-4">
                        <div className="card shadow-lg border-0 rounded-lg p-4" style={{ backgroundColor: '#F9F9F9' }}>
                            <div className="d-flex justify-content-center mb-3">
                                <img
                                    src="https://via.placeholder.com/60"
                                    alt="Analyse Avancée"
                                    style={{ width: '60px', height: '60px' }}
                                />
                            </div>
                            <h5 className="card-title font-weight-bold" style={{ color: '#4CAF50' }}>Analyse Avancée</h5>
                            <p className="card-text" style={{ fontSize: '14px', color: '#5C6B7D' }}>
                                Profitez de notre technologie de pointe pour obtenir des analyses précises.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 - Rapidité et Efficacité */}
                    <div className="col-md-3 mb-4">
                        <div className="card shadow-lg border-0 rounded-lg p-4" style={{ backgroundColor: '#F9F9F9' }}>
                            <div className="d-flex justify-content-center mb-3">
                                <img
                                    src="https://via.placeholder.com/60"
                                    alt="Rapidité et Efficacité"
                                    style={{ width: '60px', height: '60px' }}
                                />
                            </div>
                            <h5 className="card-title font-weight-bold" style={{ color: '#F57C00' }}>Rapidité et Efficacité</h5>
                            <p className="card-text" style={{ fontSize: '14px', color: '#5C6B7D' }}>
                                Recevez des rapports détaillés en temps réel pour une prise de décision rapide.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 - Facilité d'utilisation */}
                    <div className="col-md-3 mb-4">
                        <div className="card shadow-lg border-0 rounded-lg p-4" style={{ backgroundColor: '#F9F9F9' }}>
                            <div className="d-flex justify-content-center mb-3">
                                <img
                                    src="https://via.placeholder.com/60"
                                    alt="Facilité d'utilisation"
                                    style={{ width: '60px', height: '60px' }}
                                />
                            </div>
                            <h5 className="card-title font-weight-bold" style={{ color: '#0288D1' }}>Facilité d'utilisation</h5>
                            <p className="card-text" style={{ fontSize: '14px', color: '#5C6B7D' }}>
                                Interface intuitive et facile à utiliser, même pour les débutants.
                            </p>
                        </div>
                    </div>

                    {/* Card 4 - Soutien Client */}
                    <div className="col-md-3 mb-4">
                        <div className="card shadow-lg border-0 rounded-lg p-4" style={{ backgroundColor: '#F9F9F9' }}>
                            <div className="d-flex justify-content-center mb-3">
                                <img
                                    src="https://via.placeholder.com/60"
                                    alt="Soutien Client"
                                    style={{ width: '60px', height: '60px' }}
                                />
                            </div>
                            <h5 className="card-title font-weight-bold" style={{ color: '#8E24AA' }}>Soutien Client</h5>
                            <p className="card-text" style={{ fontSize: '14px', color: '#5C6B7D' }}>
                                Notre équipe de support est disponible pour vous aider en tout temps.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call-to-action Section */}
            <section className="text-center mt-5">
                <h3 className="display-5 font-weight-bold" style={{ color: '#2D3E50' }}>Prêt à Améliorer Votre Gestion de Réputation ?</h3>
                <p className="lead text-muted mb-4">
                    Essayez dès aujourd'hui notre plateforme d'analyse des sentiments et transformez votre gestion de réputation.
                </p>
                <a href="/services" className="btn btn-lg btn-primary" style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}>
                    Découvrir nos Services
                </a>
            </section>
        </div>
    );
}

export default Home;
