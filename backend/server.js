const express = require('express');
const mysql = require('mysql2'); // Remplacer par mysql2
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Pour analyser le JSON dans les requêtes

// Fonction pour créer et gérer la connexion MySQL avec reconnexion automatique
function connectToDatabase() {
  const db = mysql.createConnection({
    host: 'db', // Utilisez 'db' pour la connexion via Docker Compose
    user: 'root', 
    password: 'Djum@0105',
    database: 'projectdb',
    port: 3306
  });

  db.connect((err) => {
    if (err) {
      console.error('Erreur de connexion à la base de données. Reconnexion dans 5 secondes...', err);
      setTimeout(connectToDatabase, 5000); // Réessayer après 5 secondes
    } else {
      console.log('Connecté à la base de données MySQL');
    }
  });

  db.on('error', (err) => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Connexion à la base de données perdue. Tentative de reconnexion...');
      connectToDatabase();
    } else {
      throw err;
    }
  });

  return db;
}

// Crée la connexion à la base de données avec la logique de reconnexion
const db = connectToDatabase();

// Route pour récupérer tous les utilisateurs
app.get('/api/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Route pour ajouter un nouvel utilisateur
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
  db.query(sql, [name, email], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, name, email });
  });
});

// Route pour modifier un utilisateur existant
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
  db.query(sql, [name, email, id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ id, name, email });
  });
});

// Route pour supprimer un utilisateur
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(204);
  });
});

// Démarrer le serveur
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur le port ${PORT}`);
});
