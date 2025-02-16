from transformers import pipeline

# Charger le pipeline de classification de sentiments pré-entraîné
classifier = pipeline('sentiment-analysis')

def analyser_sentiment(text):
    # Utiliser le modèle pour analyser le sentiment
    result = classifier(text)

    # Le résultat est une liste avec des dictionnaires contenant 'label' et 'score'
    label = result[0]['label']  # Récupérer le label
    score = result[0]['score']  # Récupérer la confiance du modèle pour ce label


    return {
        'label': label,
        'score': score
    }


