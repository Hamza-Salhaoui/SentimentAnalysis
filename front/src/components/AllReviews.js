import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import ReviewService from '../services/ReviewService';  // Importer ReviewService

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Récupérer toutes les reviews
    ReviewService.getAllReviews()
      .then((response) => {
        setReviews(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (reviewId) => {
    // Appel API pour supprimer la review
    ReviewService.deleteReview(reviewId)
      .then(() => {
        setReviews(reviews.filter((review) => review.review_id !== reviewId));
      })
      .catch((error) => {
        alert('Erreur lors de la suppression de la review');
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

  if (error) {
    return <Alert variant="danger">Erreur: {error}</Alert>;
  }

  return (
    <Container>
      <h1 className="my-4 text-center">Toutes les Reviews</h1>

      {/* Bouton pour ajouter un avis */}
      <div className="text-center mb-4">
        <Button variant="success" as={Link} to="/add-review">
          Ajouter un avis
        </Button>
      </div>

      {reviews.length === 0 ? (
        <Alert variant="info">Aucune review trouvée.</Alert>
      ) : (
        <Row>
          {reviews.map((review) => (
            <Col key={review.review_id} sm={12} md={6} lg={4} className="mb-4">
              <Card className="review-card">
                <Card.Body>
                  <Card.Title>{review.review_title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Produit: {review.product_name}</Card.Subtitle>
                  <Card.Text>{review.review_text}</Card.Text>
                  <div>
                    <strong>Note:</strong> {review.rating} / 5
                    <br />
                    <strong>Sentiment:</strong> {review.sentiment_label}
                    <br />
                    <strong>Publié le:</strong> {new Date(review.date_posted).toLocaleDateString()}
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <Button variant="primary" as={Link} to={`/reviews/${review.review_id}`}>
                      Voir les détails
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(review.review_id)}>
                      Supprimer
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default AllReviews;
