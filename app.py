from flask import request, jsonify
from routes import create_app

app = create_app()


# Exemple de stockage des reviews (en mémoire pour l'exemple)
reviews = [
    {
        'review_id': 1,
        'review_title': 'Batterie',
        'product_name': 'Iphone 13',
        'review_text': 'boff',
        'rating': 2,
        'sentiment_label': 'Négatif',
        'date_posted': 'Tue, 28 Jan 2025 00:00:00 GMT',
    },
]

@app.route('/reviews/<int:review_id>', methods=['GET'])
def get_review(review_id):
    review = next((r for r in reviews if r['review_id'] == review_id), None)
    if review:
        return jsonify(review)
    return jsonify({'error': 'Review not found'}), 404

@app.route('/reviews/<int:review_id>', methods=['PUT'])
def update_review(review_id):
    review = next((r for r in reviews if r['review_id'] == review_id), None)
    if not review:
        return jsonify({'error': 'Review not found'}), 404

    data = request.get_json()
    review.update(data)  # Met à jour la review avec les nouvelles données
    return jsonify(review)



if __name__ == "__main__":

    app.run(debug=True)