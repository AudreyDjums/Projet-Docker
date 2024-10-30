# Utiliser une image de base pour Node.js
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install

# Copier le reste de l'application dans le conteneur
COPY . .

# Exposer le port sur lequel le backend écoute
EXPOSE 8081

# Commande pour démarrer l'application
CMD ["node", "server.js"]
