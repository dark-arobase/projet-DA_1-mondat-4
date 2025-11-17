console.log("Voici mon serveur");

const express = require('express');
const app = express();
const {db, createTable} = require("./db")

app.use(express.json());

const path = require('path');
const { createtable } = require('./db');

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/accueil.html'));
});

app.post('/adduser', async (req, res)=>{
    try{
        const {name, prename, email, telephone, lieu, date, description ,mdp} = req.body

        user={
        nom : name,
        prenom : prename,
        email: email,
        telephone : telephone,
        lieu : lieu,
        date : date,
        description : description,
        mdp : mdp
    };

    await db('Users').insert(user)
    res.status(201).json(user)

    } catch (err){
        console.log("Erreur de serveur", err)
        res.status(500).json({error: "Erreur du serveur"})
    }
})

app.post("/login", async (req, res) => {
    const { email, mdp } = req.body;

    try {
        const user = await db("Users").where({ email: email }).first();

        if (!user) {
            return res.status(400).json({ error: "Utilisateur introuvable" });
        }

        if (user.mdp !== mdp) {
            return res.status(400).json({ error: "Mot de passe incorrect" });
        }

    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});


var port = 5000
createTable()
.then(() => { 
      app.listen(port, () => {
      console.log("serveur en cours d'exécution sur le port " + port);
});

})
.catch((err) => {
      console.log("Erreur de demarragde (table schema)", err);
      process.exit(1);
})