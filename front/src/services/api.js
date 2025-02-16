import axios from 'axios';

// Configuration de l'URL de l'API (ajustez selon votre configuration)
const API_URL = 'http://localhost:5000';

// Vous pouvez exporter l'instance axios configurée pour l'utiliser dans d'autres fichiers
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;

