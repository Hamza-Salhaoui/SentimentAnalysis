import React, { useState, useEffect } from 'react';
import ReviewService from '../services/ReviewService';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteReview = () => {
  const { reviewId } = useParams();
  const [review, setReview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    ReviewService.getReviewById(reviewId)
      .then((response) => {
        setReview(response.data);
      })
      .catch((error) => {
        alert('Erreur lors du chargement de la review');
      });
  }, [reviewId]);

  const handleDelete = () => {
    ReviewService.deleteReview(reviewId)
      .then(() => {
        alert('Review supprimée');
        navigate('/reviews');
      })
      .catch((error) => {
        alert('Erreur lors de la suppression de la review');
      });
  };

  if (!review) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Supprimer la review</h2>
      <p>Êtes-vous sûr de vouloir supprimer cette review ?</p>
      <h3>{review.review_title}</h3>
      <p>{review.review_text}</p>
      <button onClick={handleDelete}>Supprimer</button>
    </div>
  );
};

export default DeleteReview;
