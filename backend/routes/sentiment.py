from flask import Blueprint, request, jsonify
from services.sentiment_service import analyser_sentiment

sentiment_bp = Blueprint('sentiment', __name__)

@sentiment_bp.route('/analyses', methods=['POST'])
def analyze():
    try:
        data = request.get_json()
        text = data.get('text')

        if not text:
            return jsonify({'error': 'Texte requis'}), 400

        sentiment = analyser_sentiment(text)

        return jsonify(sentiment), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
