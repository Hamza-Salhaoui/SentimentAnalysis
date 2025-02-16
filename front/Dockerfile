# Utiliser une image Node.js officielle
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers du frontend
COPY . .

# Installer les dépendances et construire l’application
RUN npm install && npm run build

# Exposer le port 3000
EXPOSE 3000

# Lancer l'application React
CMD ["npm", "start"]
