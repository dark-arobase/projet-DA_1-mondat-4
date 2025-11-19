let utilisateurs = [
    {username: "admin", password: "1234"}
];

const formid = document.getElementById('formulaire-identification');
const usernameInput = document.getElementById('username'); //pt ajout email ?
const passwordInput = document.getElementById('password');


//const entrerButton = document.getElementById('entrer-identification-formulaire');

async function chargerDepuisAPI() {
  const res = await fetch('/allUtilisateurs');
  const data = await res.json();
  utilisateurs = data;
  affichageProduit();
}

/*
formid.addEventListener('submit', async function(event) {
        event.preventDefault();

        const username = usernameInput.value;
        const password = passwordInput.value;

        if (!username) {
            alert('tu as rentrer un username vide');
            return;
        }
        if (!password) {
            alert('tu as rentrer un mot de passe vide');
            return;
        }

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                alert('Mauvais identifiant');
                return;
            }

            //todo: gerer le token ou userId
            // localStorage.setItem('token', data.token);

            alert('Connexion réussie !');
            window.location.href = 'acceuil.html';
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur de connexion au serveur');
    }
});*/

/*
if (data.success) {
                alert('Connexion réussie !');
                window.location.href = "acceuil.html";
            } else {
                alert('Mauvais identifiant ou mot de passe');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur de connexion au serveur');
        }
    

    // Connexion
    Connexion.addEventListener('submit', async function(event) {
        event.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    if (!username || !password) {
        alert('Veuillez remplir tous les champs');
        return;
    }

    // Vérifier les identifiants (exemple simple pour débuter)
    if (username === "admin" && password === "1234") {
        alert('Connexion réussie !');
        window.location.href = "acceuil.html"; // Aller à la page d'accueil
    } else {
        alert('Mauvais identifiant ou mot de passe');
    }
});


/* Envoyer les données au serveur
    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Connexion réussie !');
            window.location.href = "acceuil.html";
        } else {
            alert('Mauvais identifiant ou mot de passe');
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Erreur de connexion au serveur');
    });*/

































