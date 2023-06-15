// Afficher le(s) produit(s) selectionné(s) par le client
async function afficheArticleDansPanier() {

    // Récupérer le panier du client enregistré dans localStorage
    let panier = JSON.parse(localStorage.getItem("panier")); 

    // Utilise le DOMParser pour créer les éléments dans l'id de cart__items du HTML
    const parse = new DOMParser();
    const kanap = document.querySelector('#cart__items');

    // Création d'une zone de texte "Votre panier est vide"
    const messagePanierVide = document.createElement("h2");
    kanap.appendChild(messagePanierVide);
    
    // On créer une valeur qui est est égale à 0 pour calculer le prix et la quantité
    let totalQuantite = 0;
    let totalPrix = 0;

    // Boucle sur le panier (localStorage)
    for (let i in panier) {

        // Afficher les données enregistrer dans API et localstorage
        const res = await fetch ("http://localhost:3000/api/products/" + panier[i].id);
        const article = await res.json();

        // Création du HTML
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

        // Les afficher
        const displayItems = parse.parseFromString(product, "text/html");
        kanap.appendChild(displayItems.body.firstChild);
        
        // Création des variables pour l'id et couleur stockés dans le localStorage et du prix de l'API
        const id = panier[i].id;
        const color = panier[i].color;
        const prix = article.price;

        
        /*----------------------- Calcul du prix et de la quantité ----------------------- */
        // On additionne le nombre de quantité à la valeur totalQuantity
        totalQuantite += panier[i].quantity;
        // On aditionne au résultat de la multiplication (quantité et prix de chaque article)
        totalPrix += (panier[i].quantity*prix);
        
        

        /*------------------------------------ Supprimer Un Article ------------------------------------ */ 

        // Récupère le data-id et data-color
        const articleDansPanier = document.querySelector(`.cart__item[data-id='${id}'][data-color='${color}']`);

        // Lors du clic sur le texte "Supprimer"
        document.querySelector(`.cart__item[data-id='${id}'][data-color='${color}'] .deleteItem`).addEventListener("click", function(e) {
            // Supprimer l'article sans rechargement de la page
            e.preventDefault();
            articleDansPanier.remove();
            
            // Récupérer le panier du client enregistré dans localStorage
            let panier = JSON.parse(localStorage.getItem("panier")); 

            // Utilisation de la méthode Filter et Find pour comparer l'id et color du localStorage dans le data-id et data-color
            let panierFiltrer = panier.filter(element => element.id !== articleDansPanier.dataset.id || element.color !== articleDansPanier.dataset.color);
            let kanapSupprime = panier.find(element => element.id == articleDansPanier.dataset.id && element.color == articleDansPanier.dataset.color);
            
            // Récupère le prix et la quantité total au départ en le convertissant en Number
            const oldTotalQuantite = +document.querySelector('#totalQuantity').innerHTML;
            const oldTotalPrix = +document.querySelector('#totalPrice').innerHTML;
            
            // Calcule du prix et de la quantité
            const newTotalQuantite = oldTotalQuantite - kanapSupprime.quantity;
            const newTotalPrix =  oldTotalPrix - (kanapSupprime.quantity*prix);
            
            // Faire correspondre la valeur trouvée dans Find à celle de Filter
            kanapSupprime =  panierFiltrer;
            panier = panierFiltrer;

            // Enregistre le(s) article(s) du localStorage
            localStorage.setItem("panier", JSON.stringify(panier));
            
            // Mettre à jour le prix et quantité avec les nouvelles valeurs
            document.querySelector('#totalQuantity').innerHTML = newTotalQuantite;
            document.querySelector('#totalPrice').innerHTML= newTotalPrix;

            // Afficher texte "Votre panier est vide" si il n'y a pas d'article
            if (newTotalQuantite == 0) {
                messagePanierVide.innerText = "Votre panier est vide";
            }
        }); 
            

            
        /*------------------------------------ Modifier Quantité ------------------------------------*/
        // Lors de la modification sur l'input
        document.querySelector(`.cart__item[data-id='${id}'][data-color='${color}'] .itemQuantity`).addEventListener('change', function(event) {
            // Récuperer la valeur de l'input et la convertir en Number
            let valeurQuantite = +event.target.value;

            if ((valeurQuantite < 1) || (valeurQuantite > 100)){
                alert("La quantité doit être comprise entre 1 et 100");
                return false;
            }

            // Récupérer le panier du client enregistré dans localStorage
            let panier = JSON.parse(localStorage.getItem("panier")); 

            // Utilisation de la méthode Find pour comparer l'id et color du localStorage
            let kanap = panier.find(element => element.color === articleDansPanier.dataset.color && element.id === articleDansPanier.dataset.id);
            
            // Récupère le prix et la quantité total au départ en le convertissant en Number
            const oldTotalQuantite = +document.querySelector('#totalQuantity').innerHTML;
            const oldTotalPrix = +document.querySelector('#totalPrice').innerHTML;

            // Calcule du prix et de la quantité
            const newTotalQuantite = oldTotalQuantite - kanap.quantity + valeurQuantite;
            const newTotalPrix =  oldTotalPrix - (kanap.quantity*prix) + (valeurQuantite*prix);
            
            // Faire correspondre la valeur à celle de l'input
            kanap.quantity = valeurQuantite;

            // Enregistre le(s) article(s) du localStorage
            localStorage.setItem("panier", JSON.stringify(panier));

            // Mettre à jour le prix et quantité avec les nouvelles valeurs
            document.querySelector('#totalQuantity').innerHTML = newTotalQuantite;
            document.querySelector('#totalPrice').innerHTML= newTotalPrix;            
        });
    };

    // Afficher texte "Votre panier est vide" si il n'y a pas d'article
    if (totalQuantite == 0) {
        messagePanierVide.innerText = "Votre panier est vide";
    }

    // Afficher le prix total ainsi que celui des article avant la suppression ou modification
    document.querySelector('#totalQuantity').innerHTML = totalQuantite;
    document.querySelector('#totalPrice').innerHTML = totalPrix;
};
afficheArticleDansPanier();


/*------------------------------------ Remplir Le Formulaire ------------------------------------*/

// Récupèrer les inputs du formulaire
const prenom = document.getElementById('firstName');
const nom = document.getElementById('lastName');
const adresse = document.getElementById('address');
const ville = document.getElementById('city'); 
const email = document.getElementById('email');
       
// Récupèrer l'id pour afficher les messages d'erreur
const erreurPrenom = document.getElementById('firstNameErrorMsg');
const erreurNom = document.getElementById('lastNameErrorMsg');
const erreurAdresse = document.getElementById('addressErrorMsg');
const erreurVille = document.getElementById('cityErrorMsg');
const erreurEmail = document.getElementById('emailErrorMsg');
    
// Définir les caractères autorisés
const champNomPrenom = /^[A-Za-zà-üÀ-Ü -]+$/;
const champAdresse = /^[A-Za-zà-üÀ-Ü0-9' -]+$/;
const champVille = /^[A-Za-zà-üÀ-Ü/ -]+$/;
const champEmail = /^[A-Za-z0-9-._]+@[a-z]+\.[a-z]+$/;

// Création d'une fonction type
function isChampValide (e, champs, valeur, erreurValeur, msgerreur) {
    e.preventDefault();
       if (champs.test(valeur.value) === false) {
           erreurValeur.textContent = msgerreur;
           return false;
       }else {
           erreurValeur.textContent = "";
           return true;
       };
   };

// Lors du clic sur "Commander"
document.getElementById('order').addEventListener('click', function(e){

    // Réutilisation de cette fonction en incrémentant l'input, id et la variable
    const isNom = isChampValide (e, champNomPrenom, nom, erreurNom, "Ce champ doit contenir uniquement des lettres en MAJUSCULES, minuscules ou avec Accents !");
    const isPrenom = isChampValide (e, champNomPrenom, prenom, erreurPrenom, "Ce champ doit contenir uniquement des lettres en MAJUSCULES, minuscules ou avec Accents !");
    const isAdresse = isChampValide (e, champAdresse, adresse, erreurAdresse, "Ce champ doit contenir uniquement des chiffres et des lettres !");
    const isVille = isChampValide (e, champVille, ville, erreurVille, "Ce champ ne peut pas contenir un nombre et des caractères spéciaux exeptés / et -");
    const isEmail = isChampValide (e, champEmail, email, erreurEmail, "Ce champ doit contenir une adresse mail valide ! Exemple: nom.prenom@gmail.com ou surnom@gmail.com");


    // Récupérer le panier du client enregistré dans localStorage
    let panier = JSON.parse(localStorage.getItem("panier"));

   
        // Création tableau vide 'products'
        products = [];
        for (let i in panier) {
            // Ajouter l'id enregistré dans le localStorage
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
    
    
    async function envoyerFormulaire(contact, products) {
           
        if (isNom === true && isPrenom === true && isAdresse === true && isVille === true && isEmail === true){
            // Appel à api avec method post
            const reponse = await fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({contact, products})
            })

            // Récupérer la réponse de l'API
            const resultat = await reponse.json();

            // Récupération de l'orderId
            const orderId = JSON.stringify(resultat.orderId);

            //Si OrderId n'a pas été définit alors la page confirmation ne s'affichera pas
            if (reponse.ok) {
                //Redirection vers la page 'confirmation.html' avec l'orderId en URL
                document.location.href = `../html/confirmation.html?orderId=${orderId}`;
                localStorage.clear();
            }
        
    }}
    envoyerFormulaire(contact, products);
});