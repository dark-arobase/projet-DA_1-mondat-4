const express = require('express')
const path = require('path')

const {db, createTable} = require('./db')

const app = express()

app.use(express.json())



app.use(express.static(path.join(__dirname, '../client')))

app.get('/', (req, res)=>{

  res.sendFile(path.join(__dirname, "../client", "indentification.html"));

})

/*app.post('/login', async (req, res) => {
   try {
      const { username, password } = req.body;
      if (!username) return res.status(400).json({ error: "Champ 'username' obligatoire." });
      if (!password) return res.status(400).json({ error: "Champ 'password' obligatoire." });

      const utilisateur = await db('utilisateurs').where({ username }).first();
      if (!utilisateur) 
         return res.status(401).json({ error: "Utilisateur introuvable." });

      if (utilisateur.password !== password) {
         return res.status(401).json({ error: "Identifiants invalides." });
      }

      // Ne pas renvoyer le mot de passe
      const { password: _pwd, ...utilisateurSafe } = utilisateur;
      res.status(200).json({ ok: true, utilisateur: utilisateurSafe });
   } catch (err) {
      console.error('Erreur /login', err);
      res.status(500).json({ error: "Erreur serveur." });
   }
});
*/

app.post('/addUtilisateur', async (req, res)=>{
   try{

    const {username, password} = req.body;
      if(!username){
        return res.status(400).json({error: "Champ 'username' obligatoire.."})
      }
      if(!password){
        return res.status(400).json({error: "Champ 'password' obligatoire.."})
      }
      const utilisateur = {
        id: crypto.randomUUID(),
        username: username,
        password: password
      }
      await db("utilisateurs").insert(utilisateur);
      res.status(201).json(utilisateur)
      
    }catch(err){
      console.error("Erreur /addUtilisateur", err);
      res.status(500).json({error: "Erreur serveur.." })
     }
  }
);

app.get('/allUtilisateurs', async (req, res)=>{
   try{
       const utilisateurs = await db("utilisateurs").select("*").orderBy("created_at", "desc");
       res.status(200).json(utilisateurs)
   }catch(err){
       console.error("Erreur /allUtilisateurs", err);
      res.status(500).json({error: "Erreur serveur.." })
   }
});

/*
app.post('/addProduct', async (req, res)=>{
   
   try{
    const {name, price, image} = req.body;
   
     if(!name){
        return res.status(400).json({error: "Champ 'name' obligatoire.."})
     }
     const numPrice = Number(price);
     if(numPrice < 0){
        return res.status(400).json({error: "Le champ 'price' doit etre un nombre >=0"})
     }

     const product = {
        id: crypto.randomUUID(),
        name: name,
        price: numPrice,
        image: String(image || "https://picsum.photos/400/280?random=" + Math.floor(Math.random()* 1000))
     }

     // je dois enregistrer ce produit dans la bd.. mais on va pour le moment l enregistrer dans un tableau..
   //  products.push(product)
      await db("products").insert(product);
     res.status(201).json(product)

     }catch(err){
      console.error("Erreur /addProduct", err);
      res.status(500).json({error: "Erreur serveur.." })

     }
      
});
*/
/*
app.get('/allProducts', async (req, res)=>{
   try{

       const products = await db("products").select("*").orderBy("created_at", "desc");
       res.status(200).json(products)
   }catch(err){
       console.error("Erreur /allProducts", err);
      res.status(500).json({error: "Erreur serveur.." })
   }
   
});
*/
/*
app.put('/editProduct/:id', async(req, res)=>{
   try{
   const {id} = req.params;
   const {name, price, image} = req.body;
   const dataToUpdate = {};

   if(!String(name)){
      return res.status(400).json({error: "Le champ 'name' ne doit pas etre vide."})
   }
   dataToUpdate.name = name;

   const numPrice = Number(price);
     if(numPrice < 0){
        return res.status(400).json({error: "Le champ 'price' doit etre un nombre >=0"})
   }
   dataToUpdate.price = numPrice;

   dataToUpdate.image =  String(image || "https://picsum.photos/400/280?random=" + Math.floor(Math.random()* 1000));

   const updated = await db('products').where({id}).update(dataToUpdate);
   if (updated == 0){
      return res.status(400).json({error: "Produit introuvable.." })
   }
   res.status(200).json({ id, ...dataToUpdate })

 }catch(err){
      console.error("Erreur /editProduct", err);
      res.status(500).json({error: "Erreur serveur.." })

}
})
*/
/*
app.delete('/deleteProduct/:id', async(req, res)=>{
  
   try{
    const {id} = req.params;
    const deleted = await db('products').where({id}).del();
     if (deleted == 0){
      return res.status(404).json({error: "Produit introuvable.." })
   }
   res.status(200).json({message: "Produit supprime..."});

    }catch(err){
      console.error("Erreur /deleteProduct", err);
      res.status(500).json({error: "Erreur serveur.." })
  }

});
*/
/*
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
*/


/*const express = require('express');
const path = require('path');

//const crypto = require('crypto');

//const { db, createTable } = require('./db');

const app = express();

app.use(express.json());

// Importer le routeur d'identification
//const indentificationRouter = require('./api/identification');



app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
    
  res.sendFile(path.join(__dirname, "../client", "indentification.html"));

});

// Utiliser le routeur d'identification pour les routes commençant par /api/login
app.use('/api/login', indentificationRouter);

app.get('/api/ping', (req, res) => {
  res.json({ ok: true, message: "API en ligne"});
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
})*/