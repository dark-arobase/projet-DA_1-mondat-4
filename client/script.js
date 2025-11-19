//page inscription
const formlogin = document.getElementById('logform');
const nomform = document.getElementById('name');
const prenomform = document.getElementById('prename');
const emailform = document.getElementById('mail');
const telform = document.getElementById('tel');
const lieuform = document.getElementById('placeofbirth');
const dateform = document.getElementById('date');
const descriptionform = document.getElementById('describe');
const mdpform = document.getElementById('mdp');
const cmdpform = document.getElementById('cmdp');
const btnsubmit = document.getElementById('confirm');
const btncancel = document.getElementById('cancel');

if (formlogin) {
    formlogin.addEventListener('submit', async (e) => {
        try{
        e.preventDefault();

        // Le bouton cliqué
        const btn = document.activeElement;

        const name = nomform.value;
        const prename = prenomform.value;
        const email = emailform.value;
        const telephone = telform.value;
        const lieu = lieuform.value;
        const date = dateform.value;
        const description = descriptionform.value;
        const mdp = mdpform.value;

        const error=[];

        if (btn.dataset.action === "confirm") {

            if (mdp !== cmdpform.value) {
                alert("Les mots de passe ne correspondent pas !");
                return;
            }

            if (confirm("Voulez-vous enregistrer l'utilisateur ?")) {

                const user = {
                    name,
                    prename,
                    email,
                    telephone,
                    lieu,
                    date,
                    description,
                    mdp
                };

                    const res = await fetch("http://localhost:5000/adduser", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(user)
                    });

                    if (!res.ok) {
                        throw new Error("Erreur serveur");
                    }

                    alert("Utilisateur enregistré !");
                    formlogin.reset();
                
            }
        } } catch (err) {
                    console.error(err);
                    alert("Impossible de sauvegarder l'utilisateur.");
                }
    });
}

if(btncancel){
    btncancel.addEventListener("click", () => {
        formlogin.reset();
        window.location.href = "accueil.html";
});

}



//page accueil
const form = document.getElementById('sign-form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const error = document.getElementById('error');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const res = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: username.value,
                mdp: password.value
            })
        });

        const data = await res.json();

        if (res.ok) {
            window.location.href = "";
        } else {
            error.innerHTML = `<p>${data.error}</p>`;
            error.style.color = "red";
        }
    } catch (err) {
        console.error(err);
        error.innerHTML = "<p>Erreur serveur</p>";
        error.style.color = "red";
    }
});




