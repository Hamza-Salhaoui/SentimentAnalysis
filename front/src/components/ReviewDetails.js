import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // Pour récupérer le paramètre d'URL

const ReviewDetails = () => {
  const { id } = useParams();  // Récupérer l'id de la review depuis l'URL
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/reviews/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch review');
        }
        return response.json();
      })
      .then((data) => {
        setReview(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);  // L'effet se lance chaque fois que l'id change

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  if (!review) {
    return <div>Review non trouvée.</div>;
  }

  return (
    <div className="review-details">
      <h1>Review de {review.product_name}</h1>
      <h2>{review.review_title}</h2>
      <p><strong>Rating:</strong> {review.rating} / 5</p>
      <p><strong>Sentiment:</strong> {review.sentiment_label}</p>
      <p><strong>Emotions détectées:</strong> {review.emotions_detected}</p>
      <p><strong>Texte de la review:</strong> {review.review_text}</p>
      <p><strong>Publié le:</strong> {new Date(review.date_posted).toLocaleDateString()}</p>
      <p><strong>Source:</strong> {review.review_source}</p>
      <p><strong>Langue:</strong> {review.language}</p>
      <p><strong>Votes utiles:</strong> {review.helpful_votes}</p>
      <p><strong>Region:</strong> {review.region}</p>
      <p><strong>Keywords:</strong> {review.keywords}</p>
    </div>
  );
};

export default ReviewDetails;
