//page inscription
const users = []
const formlogin= document.getElementById('logform')
const name= document.getElementById('name')
const prename = document.getElementById('prename')
const email = document.getElementById('mail')
const telephone = document.getElementById('tel')
const lieu= document.getElementById('placeofbirth')
const date= document.getElementById('date')
const description = document.getElementById('describe')
const mdp = document.getElementById('mdp')
const cmdp= document.getElementById('cmdp')
const btnsubmit= document.getElementById('confirm')
const btncancel= document.getElementById('cancel')

if(formlogin){

    btnsubmit.addEventListener('click', (e)=>{
    if(confirm("Voulez vous enregistrer la modification")){
        user={
        nom : name.value,
        prenom : prename.value,
        email: email.value,
        telephone : telephone.value,
        lieu : lieu.value,
        date : date.value,
        description : description.value,
        mdp : mdp.value
    };

    users.push(user);
    formlogin.reset(); 
    }
    
});

btncancel.addEventListener('click', (e) =>{
    formlogin.reset()
    window.location.href="accueil.html"
    })
}


//page accueil
const form = document.getElementById('sign-form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const error = document.getElementById('error');


form.addEventListener('submit', (e) => {
    e.preventDefault();

    let found = false;

    users.forEach(user => {
        if (username.value === user.email && password.value === user.mdp) {
            found = true;
        }
    });

    if (found) {
        window.location.href = "";
    } else {
        error.innerHTML = "<p>Mot de passe ou nom d'utilisateur incorrect</p>";
        error.style.color = "red";
        form.reset();
    }
});



