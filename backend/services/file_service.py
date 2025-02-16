import pandas as pd
import os
from flask import current_app

def save_file(file):
    """Sauvegarde le fichier uploadé et retourne son chemin."""
    file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)
    return file_path

def get_statistics(file_path):
    """Lit un fichier CSV et calcule des statistiques à partir des données."""
    df = pd.read_csv(file_path, encoding='utf-8')

    avg_rating = round(df['rating'].mean(), 2)
    rating_distribution = df['rating'].value_counts().to_dict()
    sentiment_distribution = df['sentiment_label'].value_counts().to_dict()
    product_reviews = df['product_name'].value_counts().to_dict()
    region_reviews = df['region'].value_counts().to_dict()

    return {
        "avg_rating": avg_rating,
        "rating_distribution": rating_distribution,
        "sentiment_distribution": sentiment_distribution,
        "product_reviews": product_reviews,
        "region_reviews": region_reviews,
    }
