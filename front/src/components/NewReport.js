import React, { useState } from 'react';
import Papa from 'papaparse'; // Assurez-vous d'installer PapaParse
import { useNavigate } from 'react-router-dom';

function NewReport() {
    const [file, setFile] = useState(null);
    const [csvData, setCsvData] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Fonction pour gérer le téléchargement du fichier CSV
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'text/csv') {
            setFile(selectedFile);
            setError('');
        } else {
            setError('Veuillez télécharger un fichier CSV valide.');
        }
    };

    // Fonction pour traiter le fichier CSV
    const handleFileUpload = () => {
        if (!file) {
            setError('Veuillez d\'abord télécharger un fichier CSV.');
            return;
        }

        Papa.parse(file, {
            complete: (result) => {
                console.log(result.data); // Affiche les données du CSV
                setCsvData(result.data);
                // Vous pouvez maintenant analyser ces données (ex. analyse de sentiment)
                // Ajouter un appel API ou toute autre logique nécessaire pour traiter ces données
            },
            header: true, // Si le CSV contient des en-têtes de colonnes
            skipEmptyLines: true, // Ignore les lignes vides
        });
    };

    // Fonction pour naviguer vers la page des rapports
    const handleNavigateToReports = () => {
        navigate('/reports');
    };

    return (
        <div className="container mt-5" style={{ paddingTop: '80px' }}>
            <h2 className="text-center mb-4" style={{ color: '#2D3E50' }}>Télécharger un Rapport</h2>

            <div className="row"  >
                <div className="col-md-8 offset-md-2" style={{ paddingTop: '80px' }}>
                    <div className="form-group" >
                        <label htmlFor="csvFile" style={{ color: '#2D3E50' }}>Choisir un fichier CSV :</label>
                        <input
                            type="file"
                            id="csvFile"
                            className="form-control"
                            accept=".csv"
                            onChange={handleFileChange}
                        />
                    </div>

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <button
                        className="btn btn-primary"
                        onClick={handleFileUpload}
                        style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}
                    >
                        Télécharger et Analyser
                    </button>

                    {csvData.length > 0 && (
                        <div className="mt-4">
                            <h3>Contenu du fichier CSV</h3>
                            <table className="table table-bordered">
                                <thead>
                                <tr>
                                    {Object.keys(csvData[0]).map((key) => (
                                        <th key={key}>{key}</th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {csvData.map((row, index) => (
                                    <tr key={index}>
                                        {Object.values(row).map((value, i) => (
                                            <td key={i}>{value}</td>
                                        ))}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <div className="mt-3">
                        <button
                            className="btn btn-secondary"
                            onClick={handleNavigateToReports}
                            style={{ backgroundColor: '#2C3E50', borderColor: '#2C3E50' }}
                        >
                            Retourner aux Rapports
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewReport;
