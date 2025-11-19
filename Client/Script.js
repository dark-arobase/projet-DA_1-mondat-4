const N_Utilisateur   = document.getElementById("name");
const Password  = document.getElementById("Password");
const submitBtn  = document.getElementById("submitBtn");
const form = document.getElementById("userForm")
const idu = document.getElementById("uId")



form.addEventListener("submit", async (e) =>{
    e.preventDefault()
    N_Utilisateur.style.borderColor = "Black"
    Password.style.borderColor = "Black";

    const name = N_Utilisateur.value
    const pass = Password.value
    try {
            const res = await fetch(`/addUser`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({N_Utilisateur: name,Password: pass}),
            })
        
        if (res.status === 201){
            alert("Utilisateur ajoute avec succes !")
        }
        else if (res.status === 409){
            N_Utilisateur.style.borderColor = "red"
        }else if (res.status === 400){
            N_Utilisateur.style.borderColor = "red"
            Password.style.borderColor = "red";
        } else{
            alert("Erreur lors de l'ajout de l'utilisateur")
        }
        
    }

    catch(err){
        console.error("Impossible", err);
    }
})


