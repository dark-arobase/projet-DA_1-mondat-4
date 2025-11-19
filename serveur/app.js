const express = require('express');
const path = require('path');

const crypto = require('crypto');

const { db, createTable } = require('./db');

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../client')))

app.get('/', (req, res)=>{

  res.sendFile(path.join(__dirname, "../client", "indentification.html"));

});


// Ajouter un nouvel utilisateur dans 
// la base de données inscription.html
app.post('/addUser', async (req, res)=>{
   
   try{

    const {username, password} = req.body;

    if(!username){
        return res.status(400).json({error: "Champ 'username' obligatoire.."})
     }

    if(!password){
        return res.status(400).json({error: "Champ 'password' obligatoire.."})
     }

     const User = {
        id: crypto.randomUUID(),
        username: username,
        password: password
     }


     await db("User").insert(User);
     res.status(201).json(User)



    
     }catch(err){
      console.error("Erreur /addUser", err);
      res.status(500).json({error: "Erreur serveur.." })

     }
      
});

app.post('/login', async (req, res) => {
   try {
      const { username, password } = req.body;

      if (!username) {
         return res.status(400).json({ error: "Champ 'username' obligatoire." });
      }

      if (!password) {
         return res.status(400).json({ error: "Champ 'password' obligatoire." });
      }

   const utilisateur = await db('User').where({ username }).first();
      if (!utilisateur) {
         return res.status(401).json({ error: "Utilisateur introuvable." });
      }

      if (utilisateur.password !== password) {
         return res.status(401).json({ error: "Mot de passe incorrect." });
      }

      res.status(200).json({ message: "Identification réussie." });
   } catch (err) {
      console.error("Erreur /login", err);
      res.status(500).json({ error: "Erreur serveur." });
   }
});














/* pas encore fait et verif
app.post('/addPost', async (req, res)=>{
   
   try{

    const nom_utilisateur = await db("User").select("N_Utilisateur").where('id',)

    const {N_Utilisateur, Email, Password} = req.body;

    if(!N_Utilisateur){
        return res.status(400).json({error: "Champ 'name' obligatoire.."})
     }

    if(!Email || Email.includes("@")){
        return res.status(400).json({error: "Champ 'Email' obligatoire.."})
     }

    if(!Password){
        return res.status(400).json({error: "Champ 'Password' obligatoire.."})
     }

     const User = {
        id: crypto.randomUUID(),
        name: N_Utilisateur,
        Email: Email,
        password: Password
     }


     await db("User").insert(User);
     res.status(201).json(User)



    
     }catch(err){
      console.error("Erreur /addUser", err);
      res.status(500).json({error: "Erreur serveur.." })

     }
      
});*/




// afficher tous les utilisateurs
app.get('/toutUtilisateur', async (req, res)=>{
   try{

       const products = await db("User").select("*").orderBy("created_at", "desc");
       res.status(200).json(products)
   }catch(err){
       console.error("Erreur /allProducts", err);
      res.status(500).json({error: "Erreur serveur.." })
   }
   
});

createTable()
.then(()=>{

   app.listen(3000, ()=>{
    console.log("Serveur en cours d'execution sur le port 3000")
});

})
.catch((err)=>{
   console.error("Erreur au demarrage du schema", err);
   process.exit(1);
})