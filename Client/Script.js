const N_Utilisateur   = document.getElementById("name");
const Password  = document.getElementById("Password");
const submitBtn     = document.getElementById("submitBtn");
const form = document.getElementById("userForm")
const idu = document.getElementById("uId")



form.addEventListener("submit", async (e) =>{
    e.preventDefault()

    

    const name = N_Utilisateur.value
    const pass = Password.value
    try {
            const res = await fetch(`/addUser`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({N_Utilisateur: name,Password: pass}),
            })
        form.reset();
    }

    catch(err){
        console.error("Impossible", err);
    }
})


