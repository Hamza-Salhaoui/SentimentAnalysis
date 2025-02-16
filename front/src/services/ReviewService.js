import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/reviews';  // L'URL de votre API Flask


class ReviewService {
  // Créer une nouvelle review
  createReview(data) {
    return axios.post(API_URL, data);
  }

  // Récupérer toutes les reviews
  getAllReviews() {
    return axios.get(API_URL);
  }

  // Récupérer une review par ID
  getReviewById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  // Mettre à jour une review
  updateReview(id, data) {
    return axios.put(`${API_URL}/${id}`, data);
  }

  // Supprimer une review
  deleteReview(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export default new ReviewService();







