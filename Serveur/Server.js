const express = require('express')
const path = require('path')
const crypto = require('crypto')

const {db, createTable} = require('./db')

const app = express()

app.use(express.json())

//pour afficher les logs des requetes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}]  ${req.method}  ${req.url}`);
  next();
});

app.use(express.static(path.join(__dirname, '../Client')))

app.get('/', (req, res)=>{

  res.sendFile(path.join(__dirname, "../Client", "inscription.html"));

})

app.post('/addUser', async (req, res)=>{
   
   try{

    const {N_Utilisateur, Password} = req.body;

    if(!N_Utilisateur){
        return res.status(400).json({error: "Champ 'name' obligatoire.."})
     }

    if(!Password){
        return res.status(400).json({error: "Champ 'Password' obligatoire.."})
     }

     const User = {
        id: crypto.randomUUID(),
        N_Utilisateur: N_Utilisateur,
        password: Password
     }

    const exists = await db("User").select("N_Utilisateur").where("N_Utilisateur",N_Utilisateur).first()

     if (exists){
      window.alert("Le nom existe deja ;)")
      return
     }



     await db("User").insert(User);
     res.status(201).json(User)



    
     }catch(err){
      console.error("Erreur /addUser", err);
      res.status(500).json({error: "Erreur serveur.." })

     }
      
});

app.post('/addPost/:id', async (req, res)=>{
   
   try{

    const nom_utilisateur = await db("User").select("N_Utilisateur").where('id',)

    const {N_Utilisateur, Password} = req.body;

    if(!N_Utilisateur){
        return res.status(400).json({error: "Champ 'name' obligatoire.."})
     }

    if(!Password){
        return res.status(400).json({error: "Champ 'Password' obligatoire.."})
     }

     const User = {
        id: crypto.randomUUID(),
        name: N_Utilisateur,
        password: Password
     }


     await db("User").insert(User);
     res.status(201).json(User)



    
     }catch(err){
      console.error("Erreur /addUser", err);
      res.status(500).json({error: "Erreur serveur.." })

     }
      
});


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