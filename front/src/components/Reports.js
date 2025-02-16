import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Reports() {
    const [reports, setReports] = useState([]); // Vous pouvez récupérer les rapports ici

    useEffect(() => {
        // Exemple de récupération de données pour les rapports
        // Remplacez ce code avec l'appel API réel ou la logique pour obtenir les rapports
        const fetchedReports = [
            { id: 1, title: "Rapport de sentiment 1", date: "2025-01-22", sentiment: "Positif" },
            { id: 2, title: "Rapport de sentiment 2", date: "2025-01-21", sentiment: "Négatif" },
            { id: 3, title: "Rapport de sentiment 3", date: "2025-01-20", sentiment: "Neutre" }
        ];
        setReports(fetchedReports);
    }, []);

    const handleDelete = (id) => {
        // Ici vous pouvez faire un appel API pour supprimer le rapport du backend
        // Exemple : axios.delete(`/api/reports/${id}`);

        // Filtrer le rapport supprimé du tableau local
        setReports(reports.filter((report) => report.id !== id));
    };

    return (
        <div className="container mt-5" style={{ paddingTop: '80px' }}>
            <h2 className="text-center mb-4" style={{color: '#2D3E50'}}>Vos Rapports d'Analyse de Sentiment</h2>

            <div className="text-center mb-4">
                <Link to="/upload" className="btn btn-lg btn-primary"
                      style={{backgroundColor: '#4CAF50', borderColor: '#4CAF50'}}>
                    Créer Nouveau Rapport
                </Link>
            </div>


            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Titre du Rapport</th>
                        <th>Date</th>
                        <th>Sentiment</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reports.map((report) => (
                        <tr key={report.id}>
                            <td>{report.id}</td>
                            <td>{report.title}</td>
                            <td>{report.date}</td>
                            <td>{report.sentiment}</td>
                            <td>
                                <Link to={`/report/${report.id}`} className="btn btn-info">
                                    Voir les Détails
                                </Link>
                                <button
                                    onClick={() => handleDelete(report.id)}
                                    className="btn btn-danger ml-2"
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Reports;
