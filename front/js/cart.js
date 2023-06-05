//affiche les produits selectionnés par le client
async function afficheArticleDansPanier() {

    //recup panier du client stocké dans localStorage
    let panier = JSON.parse(localStorage.getItem("panier")); 

    //recup le HTML
    const parse = new DOMParser();
    const kanap = document.querySelector('#cart__items');
    
    // On créer valeur qui est est egale à 0 pour calculer le prix
    let totalQuantite = 0;
    let totalPrix = 0;

    // Création zone de texte "Votre panier est vide" 
    const messagePanierVide = document.createElement("h2");
    kanap.appendChild(messagePanierVide);
    
    
    for (let i in panier) {

        //afficher sur la page panier avec une boucle pour remplacer le texte par les valeurs enregistrer dans API et localstorage
        const res = await fetch ("http://localhost:3000/api/products/" + panier[i].id);
        const article = await res.json();

        let product =
            `<article class="cart__item" data-id="${panier[i].id}" data-color="${panier[i].color}">
                <div class="cart__item__img">
                    <img src="${article.imageUrl}" alt="${article.altTxt}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${article.name}</h2>
                        <p>${panier[i].color}</p>
                        <p>${article.price} €</p> 
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${panier[i].quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>`;
        const displayItems = parse.parseFromString(product, "text/html");
        kanap.appendChild(displayItems.body.firstChild);   
    
        const id = panier[i].id;
        const color = panier[i].color;
        const prix = article.price;


        // On additionne le nombre de quantité à la valeur totalQuantity
        totalQuantite += panier[i].quantity;
        // On aditionne au résultat de la multiplication (qté et prix de chaque article)
        totalPrix += (panier[i].quantity*prix);
        

        /*------------------------------------ Supprimer Un Article ------------------------------------ */ 
        const articleDansPanier = document.querySelector(`.cart__item[data-id='${id}'][data-color='${color}']`);

        //event pour supprimer article
        document.querySelector(`.cart__item[data-id='${id}'][data-color='${color}'] .deleteItem`).addEventListener("click", function(e) {
            e.preventDefault();
            articleDansPanier.remove();
            let panier = JSON.parse(localStorage.getItem('panier'));

            // Supprimer le(s) article(s) du localStorage
            let panierFiltrer = panier.filter(element => element.id !== articleDansPanier.dataset.id || element.color !== articleDansPanier.dataset.color);
            
            let kanapSupprime = panier.find(element => element.id == articleDansPanier.dataset.id && element.color == articleDansPanier.dataset.color);
            
            

            const oldTotalQuantite = +document.querySelector('#totalQuantity').innerHTML;
            const oldTotalPrix = +document.querySelector('#totalPrice').innerHTML;
        
            const newTotalQuantite = oldTotalQuantite - kanapSupprime.quantity;
            const newTotalPrix =  oldTotalPrix - (kanapSupprime.quantity*prix);
            
            kanapSupprime =  panierFiltrer;
            panier = panierFiltrer;
            localStorage.setItem("panier", JSON.stringify(panier));
            
            document.querySelector('#totalQuantity').innerHTML = newTotalQuantite;
            document.querySelector('#totalPrice').innerHTML= newTotalPrix;

            if (newTotalQuantite == 0) {
                messagePanierVide.innerText = "Votre panier est vide";
            }
        
        }); 
            

            
        /*------------------------------------ Modifier Quantité ------------------------------------*/
        document.querySelector(`.cart__item[data-id='${id}'][data-color='${color}'] .itemQuantity`).addEventListener('change', function(event) {
            let valeurQuantite = +event.target.value;

            let panier = JSON.parse(localStorage.getItem('panier'));
            let kanap = panier.find(element => element.color === panier[i].color && element.id === panier[i].id);
            
            const oldTotalQuantite = +document.querySelector('#totalQuantity').innerHTML;
            const oldTotalPrix = +document.querySelector('#totalPrice').innerHTML;

            const newTotalQuantite = oldTotalQuantite - kanap.quantity + valeurQuantite;
            const newTotalPrix =  oldTotalPrix - (kanap.quantity*prix) + (valeurQuantite*prix);
            
            kanap.quantity = valeurQuantite;
            localStorage.setItem("panier", JSON.stringify(panier));

            document.querySelector('#totalQuantity').innerHTML = newTotalQuantite;
            document.querySelector('#totalPrice').innerHTML= newTotalPrix;
            
        });
        

        
    };
    
    // Afficher texte "Votre panier est vide" si il n'y a pas d'article
    if (totalQuantite == 0) {
        messagePanierVide.innerText = "Votre panier est vide";
    }
        document.querySelector('#totalQuantity').innerHTML = totalQuantite;
        document.querySelector('#totalPrice').innerHTML = totalPrix;
    

};afficheArticleDansPanier();


/*----------------------- Remplir Le Formulaire -----------------------*/

// On récupere les inputs du formulaire
const prenom = document.getElementById('firstName');
const nom = document.getElementById('lastName');
const adresse = document.getElementById('address');
const ville = document.getElementById('city'); 
const email = document.getElementById('email');
       
// On récupère l'id pour afficher les messages d'erreur
const erreurPrenom = document.getElementById('firstNameErrorMsg');
const erreurNom = document.getElementById('lastNameErrorMsg');
const erreurAdresse = document.getElementById('addressErrorMsg');
const erreurVille = document.getElementById('cityErrorMsg');
const erreurEmail = document.getElementById('emailErrorMsg');
    
// On définit les caractères autorisés
const champNomPrenom = /^[A-Za-zà-üÀ-Ü -]+$/;
const champAdresse = /^[A-Za-zà-üÀ-Ü0-9' -]+$/;
const champVille = /^[A-Za-zà-üÀ-Ü/ -]+$/;
const champEmail = /^[A-Za-z0-9-.]*@[a-z]*[.][a-z]+$/;


document.getElementById('order').addEventListener('click', function(e){

    // On créer une fonction type
    function champInvalide (e, champs, valeur, erreurValeur, msgerreur) {
     e.preventDefault();
        if (champs.test(valeur.value) === false) {
           
            erreurValeur.textContent = msgerreur;
        }else{
            erreurValeur.textContent = "";
        };
    };

    // On utilise cette fonction en incrémentant l'input, id et la constante
    champInvalide (e, champNomPrenom, nom, erreurNom, "Ce champ doit contenir uniquement des lettres en MAJUSCULES, minuscules ou avec Accents !");
    champInvalide (e, champNomPrenom, prenom, erreurPrenom, "Ce champ doit contenir uniquement des lettres en MAJUSCULES, minuscules ou avec Accents !");
    champInvalide (e, champAdresse, adresse, erreurAdresse, "Ce champ doit contenir uniquement des chiffres et des lettres !");
    champInvalide (e, champVille, ville, erreurVille, "Ce champ ne peut pas contenir un nombre et des caractères spéciaux exeptés / et -");
    champInvalide (e, champEmail, email, erreurEmail, "Ce champ doit contenir une adresse mail valide ! Exemple: nom.prenom@gmail.com ou surnom@gmail.com");
    //alert("Nous vous remercions de votre commande");

    async function envoyerFormulaire() {
        let panier = JSON.parse(localStorage.getItem("panier"));
        products = [];
        for (let i in panier) {
            products.push(panier[i].id);          
        }
            
        // valeurs des champs du formulaire
        const contact = {
            firstName: prenom.value,
            lastName: nom.value,
            address: adresse.value,
            city: ville.value,
            email: email.value
        };
           

        // Appel à api avec method post
        const reponse = await fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({contact, products})
        })
        const resultat = await reponse.json();
        console.log(resultat);

        /*const orderId = resultat.orderId;
        document.location.href = `../confirmation.html?=${orderId}`;*/

    };
    envoyerFormulaire();
    
});