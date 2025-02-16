from flask import Blueprint, request, jsonify
from services.review_service import ReviewService

review_bp = Blueprint('review_routes', __name__)

@review_bp.route('/reviews', methods=['POST'])
def create_review():
    """Créer une review"""
    data = request.json
    result = ReviewService.create_review(data)
    return jsonify(result), 201 if "review_id" in result else 500

@review_bp.route('/reviews', methods=['GET'])
def get_all_reviews():
    """Récupérer toutes les reviews"""
    result = ReviewService.get_all_reviews()
    return jsonify(result), 200

@review_bp.route('/reviews/<int:review_id>', methods=['GET'])
def get_review_by_id(review_id):
    """Récupérer une review par son ID"""
    result = ReviewService.get_review_by_id(review_id)
    return jsonify(result), 200 if "review_id" in result else 404

@review_bp.route('/reviews/<int:review_id>', methods=['PUT'])
def update_review(review_id):
    """Mettre à jour une review"""
    data = request.json
    result = ReviewService.update_review(review_id, data)
    return jsonify(result), 200

@review_bp.route('/reviews/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    """Supprimer une review"""
    result = ReviewService.delete_review(review_id)
    return jsonify(result), 200

