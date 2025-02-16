import { Link } from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function About() {
    return (
        <div className="container mt-5" style={{ paddingTop: '80px' }}>
            {/* Section Titre */}
            <section className="text-center mb-5">
                <h3 className="display-5 font-weight-bold" style={{color: '#2D3E50'}}>À Propos de Notre Plateforme</h3>
                <p className="lead text-muted mb-4">Une plateforme d'analyse des sentiments conçue pour transformer
                    votre gestion de réputation.</p>
            </section>

            {/* Card Section - À propos de l'application */}
            <section className="row justify-content-center">
                <div className="col-md-4 mb-4">
                    <div className="card shadow-lg border-0 rounded-lg p-4" style={{backgroundColor: '#F9F9F9'}}>
                        <div className="d-flex justify-content-center mb-3">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Notre Application"
                                style={{width: '120px', height: '120px', borderRadius: '50%'}}
                            />
                        </div>
                        <h5 className="card-title font-weight-bold" style={{color: '#4CAF50'}}>Notre Application</h5>
                        <p className="card-text" style={{fontSize: '14px', color: '#5C6B7D'}}>
                            Cette application a été conçue pour faciliter la gestion de votre réputation en ligne, avec
                            une interface simple, mais puissante.
                        </p>
                    </div>
                </div>

                {/* Card Section - Notre Mission */}
                <div className="col-md-4 mb-4">
                    <div className="card shadow-lg border-0 rounded-lg p-4" style={{backgroundColor: '#F9F9F9'}}>
                        <div className="d-flex justify-content-center mb-3">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Mission"
                                style={{width: '120px', height: '120px', borderRadius: '50%'}}
                            />
                        </div>
                        <h5 className="card-title font-weight-bold" style={{color: '#0288D1'}}>Notre Mission</h5>
                        <p className="card-text" style={{fontSize: '14px', color: '#5C6B7D'}}>
                            Nous visons à offrir une analyse fiable et rapide des sentiments, vous permettant de prendre
                            des décisions éclairées en temps réel.
                        </p>
                    </div>
                </div>

                {/* Card Section - Notre Équipe */}
                <div className="col-md-4 mb-4">
                    <div className="card shadow-lg border-0 rounded-lg p-4" style={{backgroundColor: '#F9F9F9'}}>
                        <div className="d-flex justify-content-center mb-3">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Équipe"
                                style={{width: '120px', height: '120px', borderRadius: '50%'}}
                            />
                        </div>
                        <h5 className="card-title font-weight-bold" style={{color: '#8E24AA'}}>Notre Équipe</h5>
                        <p className="card-text" style={{fontSize: '14px', color: '#5C6B7D'}}>
                            Une équipe dédiée, composée d'experts en analyse des sentiments et gestion de réputation,
                            prête à vous aider à chaque étape.
                        </p>
                    </div>
                </div>
            </section>

            {/* Call-to-action Section */}
            <section className="text-center mt-5">
                <h3 className="display-5 font-weight-bold" style={{color: '#2D3E50'}}>Prêt à Commencer ?</h3>
                <p className="lead text-muted mb-4">
                    Découvrez dès aujourd'hui comment notre plateforme peut vous aider à transformer la gestion de votre
                    réputation.
                </p>
                <Link to="/services" className="btn btn-lg btn-primary"
                      style={{backgroundColor: '#4CAF50', borderColor: '#4CAF50'}}>
                    Explorer nos Services
                </Link>
            </section>
        </div>
    );
}

export default About;
