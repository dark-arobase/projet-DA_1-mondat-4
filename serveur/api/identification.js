const express = require("express");
const bcrypt = require("bcrypt");
const { db } = require("../bd"); // adapte le chemin si besoin

const router = express.Router();

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Champs manquants" });
  }

  try {
    const user = await db("utilisateurs")
      .where({ username })
      .first();

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Identifiants incorrects" });
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res
        .status(400)
        .json({ success: false, message: "Identifiants incorrects" });
    }

    // ICI tu devrais créer un JWT ou une session.
    // Pour l'instant on renvoie juste les infos basiques.
    res.json({
      success: true,
      message: "Connexion réussie",
      userId: user.id,
      username: user.username,
    });
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

module.exports = router;











/*const express = require('express');
const app = express();
app.use(express.json());

const router = express.Router();
// Route pour la connexion
router.post('/api/connexion', async (req, res) => {
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

module.exports = app;*/