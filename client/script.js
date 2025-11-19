/*const username   = document.getElementById("username");
const password  = document.getElementById("password");

const submitBtn     = document.getElementById("submitBtn");
//const form = document.getElementById("userForm")*/
/* inscription.html  h*/
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");
// formulaire d'ajout d'utilisateur dans inscription.html
const formInscription = document.getElementById("inscription-Form");
const idu = document.getElementById("uId");
/*inscription.html  b*/
let utilisateurs = [];

async function loadProducts() {
  try {
    const res = await fetch("/toutUtilisateur");
    if (!res.ok) throw new Error("Erreur chargement utilisateurs");

    utilisateurs = await res.json();
    // you can update the UI here if needed
  } catch (err) {
    console.error("Impossible de charger les utilisateurs", err);
  }
}

formInscription.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;

  if (!username || !password) {
    console.error("username et password sont requis");
    return;
  }

  try {
    const res = await fetch(`/addUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Erreur lors de l'ajout de l'utilisateur");
    }

        formInscription.reset();
        id.value = ""
        await loadProducts();

  } catch (err) {
    console.error("Impossible d'ajouter l'utilisateur", err);
  }
});


loadProducts();