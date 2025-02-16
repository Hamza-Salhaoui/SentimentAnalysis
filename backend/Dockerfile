# Utiliser une image Python officielle
FROM python:3.8

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers du backend
COPY . .

# Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Exposer le port 5000
EXPOSE 5000

# Lancer l'application Flask
CMD ["python", "app.py"]
