import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import ReviewService from '../services/ReviewService';

const AddReview = () => {
  const [reviewData, setReviewData] = useState({
    customer_id: '',
    product_name: '',
    review_title: '',
    review_text: '',
    rating: '',
    sentiment_label: 'Positif',
    date_posted: new Date().toISOString().split('T')[0],  // Date actuelle
    verified_purchase: 0,
    review_source: '',
    language: 'Français',
    helpful_votes: 0,
    region: '',
    emotions_detected: '',
    aspect_mentioned: '',
    keywords: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Appel API pour ajouter la review
    ReviewService.createReview(reviewData)
      .then(() => {
        navigate('/all-reviews');  // Redirection vers la page AllReviews
      })
      .catch((error) => {
        setError('Erreur lors de l\'ajout de l\'avis');
      });
  };

  return (
    <Container>
      <h1 className="my-4 text-center">Ajouter un avis</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        {/* customer_id */}
        <Form.Group controlId="customer_id">
          <Form.Label>ID du client</Form.Label>
          <Form.Control
            type="number"
            name="customer_id"
            value={reviewData.customer_id}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        {/* product_name */}
        <Form.Group controlId="product_name">
          <Form.Label>Nom du produit</Form.Label>
          <Form.Control
            type="text"
            name="product_name"
            value={reviewData.product_name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        {/* review_title */}
        <Form.Group controlId="review_title">
          <Form.Label>Titre de l'avis</Form.Label>
          <Form.Control
            type="text"
            name="review_title"
            value={reviewData.review_title}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        {/* review_text */}
        <Form.Group controlId="review_text">
          <Form.Label>Texte de l'avis</Form.Label>
          <Form.Control
            as="textarea"
            name="review_text"
            value={reviewData.review_text}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        {/* rating */}
        <Form.Group controlId="rating">
          <Form.Label>Note (1-5)</Form.Label>
          <Form.Control
            type="number"
            name="rating"
            value={reviewData.rating}
            onChange={handleInputChange}
            min="1"
            max="5"
            required
          />
        </Form.Group>

        {/* sentiment_label */}
        <Form.Group controlId="sentiment_label">
          <Form.Label>Sentiment</Form.Label>
          <Form.Control
            as="select"
            name="sentiment_label"
            value={reviewData.sentiment_label}
            onChange={handleInputChange}
            required
          >
            <option value="Positif">Positif</option>
            <option value="Négatif">Négatif</option>
            <option value="Neutre">Neutre</option>
          </Form.Control>
        </Form.Group>

        {/* verified_purchase */}
        <Form.Group controlId="verified_purchase">
          <Form.Label>Achat vérifié</Form.Label>
          <Form.Control
            as="select"
            name="verified_purchase"
            value={reviewData.verified_purchase}
            onChange={handleInputChange}
            required
          >
            <option value="0">Non</option>
            <option value="1">Oui</option>
          </Form.Control>
        </Form.Group>

        {/* review_source */}
        <Form.Group controlId="review_source">
          <Form.Label>Source de l'avis</Form.Label>
          <Form.Control
            type="text"
            name="review_source"
            value={reviewData.review_source}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        {/* language */}
        <Form.Group controlId="language">
          <Form.Label>Langue de l'avis</Form.Label>
          <Form.Control
            as="select"
            name="language"
            value={reviewData.language}
            onChange={handleInputChange}
            required
          >
            <option value="Français">Français</option>
            <option value="Anglais">Anglais</option>
            <option value="Espagnol">Espagnol</option>
            <option value="Autre">Autre</option>
          </Form.Control>
        </Form.Group>

        {/* helpful_votes */}
        <Form.Group controlId="helpful_votes">
          <Form.Label>Votes utiles</Form.Label>
          <Form.Control
            type="number"
            name="helpful_votes"
            value={reviewData.helpful_votes}
            onChange={handleInputChange}
          />
        </Form.Group>

        {/* region */}
        <Form.Group controlId="region">
          <Form.Label>Région</Form.Label>
          <Form.Control
            type="text"
            name="region"
            value={reviewData.region}
            onChange={handleInputChange}
          />
        </Form.Group>

        {/* emotions_detected */}
        <Form.Group controlId="emotions_detected">
          <Form.Label>Emotions détectées</Form.Label>
          <Form.Control
            type="text"
            name="emotions_detected"
            value={reviewData.emotions_detected}
            onChange={handleInputChange}
          />
        </Form.Group>

        {/* aspect_mentioned */}
        <Form.Group controlId="aspect_mentioned">
          <Form.Label>Aspect mentionné</Form.Label>
          <Form.Control
            type="text"
            name="aspect_mentioned"
            value={reviewData.aspect_mentioned}
            onChange={handleInputChange}
          />
        </Form.Group>

        {/* keywords */}
        <Form.Group controlId="keywords">
          <Form.Label>Mots-clés</Form.Label>
          <Form.Control
            type="text"
            name="keywords"
            value={reviewData.keywords}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Ajouter l'avis
        </Button>
      </Form>
    </Container>
  );
};

export default AddReview;
