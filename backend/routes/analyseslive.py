from flask import Blueprint, request, jsonify
from services.sentiment_live_service import analyser_sentiment_live

analyseslive_bp = Blueprint('analyseslive', __name__)

@analyseslive_bp.route('/analyseslive', methods=['POST'])
def analyse_emotion():
    # Récupérer l'image envoyée en tant que données binaires
    file = request.files['image']
    # Appeler la fonction du service pour l'analyser
    emotions = analyser_sentiment_live(file)

    # Retourner les émotions détectées sous forme de JSON
    return jsonify(emotions)


