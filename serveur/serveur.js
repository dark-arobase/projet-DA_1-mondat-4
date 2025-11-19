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

        if (!name || !prename || !email || !telephone || !lieu || !date || !description || !mdp){
            res.status(400).json({error: "Tous les champs sont obligatoires"})
            return
        } 
        else if(!/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(email)){
            res.status(400).json({error: "Format d'email invalide"})
            return
        }
        else if(!/^\+?[0-9]{7,15}$/.test(telephone)){
            res.status(400).json({error: "Format de téléphone invalide"})
            return
        }
        else if(mdp.length < 6){
            res.status(400).json({error: "Le mot de passe doit contenir au moins 6 caractères"})
            return
        }
        else if (date > new Date().toISOString().split('T')[0]){
            res.status(400).json({error: "La date ne peut pas être dans le futur"})
            return
        }
        else if(/^[A-Za-zÀ-ÖØ-öø-ÿ]+([ -][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test(name) === false){
            res.status(400).json({error: "Format de nom invalide"})
            return
        }
        else if(/^[A-Za-zÀ-ÖØ-öø-ÿ]+([ -][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test(prename) === false){
            res.status(400).json({error: "Format de nom invalide"})
            return
        }
        else{
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

                const test = await db('Users').select("*").where(user).first()

                if(test !== 0){
                    res.status(400).json({error: "Utilisateur déjà existant"})
                    console.log("Utilisateur déjà existant")
                }
                else{
                    await db('Users').insert(user)
                    res.status(201).json(user)
                }
        }

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
      console.log("Erreur de demarrage du serveur", err);
      process.exit(1);
})