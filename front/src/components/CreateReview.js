import React, { useState } from 'react';
import ReviewService from '../services/ReviewService';
import { useNavigate } from 'react-router-dom';

const CreateReview = () => {
  const [review, setReview] = useState({
    review_title: '',
    review_text: '',
    rating: 1,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ReviewService.createReview(review)
      .then((response) => {
        alert('Review créée avec succès');
        navigate('/reviews'); // Rediriger vers la liste des reviews
      })
      .catch((error) => {
        alert('Erreur lors de la création de la review');
      });
  };

  return (
    <div>
      <h2>Ajouter une nouvelle review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre de la review</label>
          <input
            type="text"
            name="review_title"
            value={review.review_title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Texte de la review</label>
          <textarea
            name="review_text"
            value={review.review_text}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Note</label>
          <select
            name="rating"
            value={review.rating}
            onChange={handleInputChange}
            required
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default CreateReview;
