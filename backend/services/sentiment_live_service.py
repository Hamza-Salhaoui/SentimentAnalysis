from deepface import DeepFace
import cv2
import numpy as np

def analyser_sentiment_live(file):
    # Lire l'image envoyée
    in_memory_file = file.read()
    np_arr = np.frombuffer(in_memory_file, np.uint8)
    frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    # Convertir l'image en format compatible avec DeepFace
    result = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)

    # Extraire les émotions
    emotions = result[0]['dominant_emotion']
    score = result[0]['emotion'][emotions]  # Score de la dominance émotionnelle

    return [{'emotion': emotions, 'score': score}]
