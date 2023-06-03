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
        

document.querySelector('#totalQuantity').innerHTML = totalQuantite;
        document.querySelector('#totalPrice').innerHTML = totalPrix;

        /*------------------------------------ Supprimer Un Article ------------------------------------ */ 
        const articleDansPanier = document.querySelector(`.cart__item[data-id='${id}'][data-color='${color}']`);

        //event pour supprimer article
        document.querySelector(`.cart__item[data-id='${id}'][data-color='${color}'] .deleteItem`).addEventListener("click", function(e) {
            
            articleDansPanier.remove();
            let panier = JSON.parse(localStorage.getItem('panier'));

            // Supprimer le(s) article(s) du localStorage
            let panierFiltrer = panier.filter(element => element.id !== articleDansPanier.dataset.id || element.color !== articleDansPanier.dataset.color);
            panier = panierFiltrer;
            localStorage.setItem("panier", JSON.stringify(panier));


                //calcul du prix et de la quantité
                totalQuantite -= panier[i].quantity;
                totalPrix -= (panier[i].quantity*prix);
            
             if (totalQuantite == 0) {
                messagePanierVide.innerText = "Votre panier est vide";
            }
            document.querySelector('#totalQuantity').innerHTML = totalQuantite;
            document.querySelector('#totalPrice').innerHTML = totalPrix;
        

            // Affiche dans le prix et le nombre d'article
            
        }); 
            

            
        /*------------------------------------ Modifier Quantité ------------------------------------*/
        document.querySelector(`.cart__item[data-id='${id}'][data-color='${color}'] .itemQuantity`).addEventListener('change', function(event) {
            let valeurQuantite = +event.target.value;

            let panier = JSON.parse(localStorage.getItem('panier'));
            let kanap = panier.find(element => element.color === panier[i].color && element.id === panier[i].id);
            localStorage.setItem("panier", JSON.stringify(panier));
            
            kanap.quantity = valeurQuantite;
            


            const oldTotalQuantite = +document.querySelector('#totalQuantity').innerHTML;
            const oldTotalPrix = +document.querySelector('#totalPrice').innerHTML;

            const newTotalQuantite = oldTotalQuantite - kanap.quantity + valeurQuantite;
            const newTotalPrix =  oldTotalPrix - (kanap.quantity*prix) + (prix*valeurQuantite);
            
            if (totalQuantite == 0) {
                messagePanierVide.innerText = "Votre panier est vide";
            }
            document.querySelector('#totalQuantity').innerHTML = newTotalQuantite;
            document.querySelector('#totalPrice').innerHTML= newTotalPrix;

            console.log()
            
        });
        

        
    };
    
    // Afficher texte "Votre panier est vide" si il n'y a pas d'article
    if (totalQuantite == 0) {
        messagePanierVide.innerText = "Votre panier est vide";
    }
    

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
const champEmail = /@/;/*^[A-Za-z0-9-.]*@[a-z]*[.][a-z]+$*/


document.getElementById('order').addEventListener('click', function(e){
    
   

    // On créer une fonction type
    function champInvalide (champs, valeur, erreurValeur, msgerreur) {
    
        if (champs.test(valeur.value) === false) {
            erreurValeur.textContent = msgerreur; e.preventDefault();
        }else {
            erreurValeur.textContent = "";
            e.preventDefault();
        };
    };

    // On utilise cette fonction en incrémentant l'input, id et la constante
    champInvalide (champNomPrenom, nom, erreurNom, "Ce champ doit contenir uniquement des lettres en MAJUSCULES, minuscules ou avec Accents !");
    champInvalide (champNomPrenom, prenom, erreurPrenom, "Ce champ doit contenir uniquement des lettres en MAJUSCULES, minuscules ou avec Accents !");
    champInvalide (champAdresse, adresse, erreurAdresse, "Ce champ doit contenir uniquement des chiffres et des lettres, !");
    champInvalide (champVille, ville, erreurVille, "Ce champ ne peut pas contenir un nombre et des caractères spéciaux exeptés / et -");
    champInvalide (champEmail, email, erreurEmail, "Ce champ doit contenir une adresse mail valide ! Exemple: nom.prenom@gmail.com ou surnom@gmail.com");
    //alert("Nous vous remercions de votre commande");

    async function envoyerFormulaire(produit) {
        let panier = JSON.parse(localStorage.getItem("panier"));
        for (let i in panier) {
            const rep = await fetch ("http://localhost:3000/api/products/" + panier[i].id);
            const article = await rep.json();
        
            // Produit dans le panier
            produit = {
                nom: article.name,
                couleur: panier[i].color,
                prix: article.price,
                quantite: panier[i].quantity
            };
        };  
            // valeurs des champs du formulaire
            const contact = {
                prenom: prenom.value,
                nom: nom.value,
                adresse: adresse.value,
                ville: ville.value,
                email: email.value
            };
            
            // transformation de du tableau en chaîne de caractère
            const objetContact = JSON.stringify(contact);
            const objetProduit = JSON.stringify(produit);
            console.log(objetProduit);

            // Appel à api avec method post
            const res =  fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: objetContact , objetProduit
            });
            let result = await response.json();
        

    };
    envoyerFormulaire();
    
});