import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Spinner, Alert } from 'react-bootstrap';
import ReviewService from '../services/ReviewService';  // Importer ReviewService

const UpdateReview = () => {
  const { reviewId } = useParams();  // Récupérer l'ID de la review depuis les paramètres de l'URL
  const navigate = useNavigate();  // Remplacer useHistory par useNavigate

  const [review, setReview] = useState({
    review_title: '',
    review_text: '',
    rating: '',
    sentiment_label: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Utiliser ReviewService pour récupérer la review par ID
    ReviewService.getReviewById(reviewId)
      .then((response) => {
        setReview(response.data);  // Mettre à jour l'état avec les données de la review
        setLoading(false);  // Indiquer que le chargement est terminé
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [reviewId]);  // Se déclenche lorsque reviewId change

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Utiliser ReviewService pour mettre à jour la review
    ReviewService.updateReview(reviewId, review)
      .then(() => {
        navigate('/reviews');  // Rediriger vers la page des reviews après la mise à jour
      })
      .catch((error) => {
        setError(error.message);  // Gérer les erreurs
      });
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status" variant="primary" />
        <span> Chargement...</span>
      </div>
    );
  }

  return (
    <Container>
      <h1 className="my-4 text-center">Modifier la Review</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="reviewTitle">
          <Form.Label>Titre de la Review</Form.Label>
          <Form.Control
            type="text"
            name="review_title"
            value={review.review_title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="reviewText">
          <Form.Label>Texte de la Review</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="review_text"
            value={review.review_text}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="rating">
          <Form.Label>Note (1 à 5)</Form.Label>
          <Form.Control
            type="number"
            name="rating"
            value={review.rating}
            onChange={handleChange}
            min="1"
            max="5"
            required
          />
        </Form.Group>

        <Form.Group controlId="sentimentLabel">
          <Form.Label>Sentiment</Form.Label>
          <Form.Control
            type="text"
            name="sentiment_label"
            value={review.sentiment_label}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Mettre à jour
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateReview;
