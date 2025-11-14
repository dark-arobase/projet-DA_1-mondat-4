const express = require('express');
const path = require('path');
//const { db } = require('./db');

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
    
  res.sendFile(path.join(__dirname, "../client", "indentification.html"));

});

/*
// Route pour la connexion
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Chercher l'utilisateur dans la base de données
        const user = await db('utilisateurs')
            .where({ username: username, password: password })
            .first();

        if (user) {
            // Utilisateur trouvé
            res.json({ success: true, message: 'Connexion réussie' });
        } else {
            // Utilisateur non trouvé
            res.json({ success: false, message: 'Identifiants incorrects' });
        }
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
});
*/














// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});