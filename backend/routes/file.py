from flask import Blueprint, request, jsonify
from services.file_service import save_file, get_statistics

file_bp = Blueprint('file', __name__)

# Stockage temporaire des statistiques
global_stats = {}

@file_bp.route('/upload', methods=['POST'])
def upload_file():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'Aucun fichier envoyé'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'Aucun fichier sélectionné'}), 400

        file_path = save_file(file)

        global global_stats
        global_stats = get_statistics(file_path)

        return jsonify({'message': 'Fichier chargé avec succès'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@file_bp.route('/statistics', methods=['GET'])
def get_statistics_route():
    try:
        return jsonify(global_stats), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
