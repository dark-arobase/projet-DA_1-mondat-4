console.log("Voici mon serveur");

const express = require('express');
const app = express();

app.use(express.json());

const path = require('path');

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/accueil.html'));
});

app.listen(3000, () =>{
    console.log("Le serveur ecoute sur le port 3000")
});