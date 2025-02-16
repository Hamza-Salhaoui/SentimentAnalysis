import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCloudUploadAlt } from 'react-icons/fa';

function FileUpload() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError(null);
        setSuccess(false);
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Veuillez sélectionner un fichier avant de continuer.");
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);
            setSuccess(true);
            setTimeout(() => navigate('/statistics'), 2000);  // Redirection après succès
        } catch (error) {
            setError("Une erreur est survenue lors du téléchargement. Veuillez réessayer.");
            console.error('Erreur de téléchargement:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="container mt-5" style={{  paddingTop: "100px"}}>
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="card shadow-lg border-0 rounded-3 p-4 text-center" >
                        <h2 className="fw-bold text-primary mb-4">Téléchargez votre fichier</h2>
                        <p className="text-muted">
                            Téléchargez vos fichiers pour analyser leur contenu et obtenir des insights détaillés sur les tendances et les sentiments.
                        </p>

                        <div className="mb-4">
                            <label htmlFor="fileUpload" className="btn btn-outline-primary btn-lg">
                                <FaCloudUploadAlt className="me-2" /> Choisir un fichier
                            </label>
                            <input
                                type="file"
                                id="fileUpload"
                                onChange={handleFileChange}
                                className="d-none"
                            />
                            {file && <p className="mt-3 text-success">Fichier sélectionné : {file.name}</p>}
                        </div>

                        {error && <div className="alert alert-danger">{error}</div>}
                        {success && <div className="alert alert-success">Fichier téléchargé avec succès ! Redirection...</div>}

                        <button
                            className="btn btn-primary btn-lg w-100"
                            onClick={handleUpload}
                            disabled={uploading}
                        >
                            {uploading ? 'Téléchargement en cours...' : 'Analyser maintenant'}
                        </button>

                        <p className="mt-4 text-muted small">
                            Formats pris en charge : <strong>.csv, .txt, .xlsx</strong>. Taille max : 5MB.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FileUpload;
