//affiche les produits selectionnés par le client
async function afficheArticleDansPanier() {

    //recup panier du client stocké dans localStorage
    let panier = JSON.parse(localStorage.getItem("panier")); 

    //recup le HTML
    const parse = new DOMParser();
    const kanap = document.getElementById('cart__items');

    // On créer valeur qui est est egale à 0 pour calculer le prix
    let totalQuantite = 0;
    let totalPrix = 0;
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
    
        
        // On additionne le nombre de quantité à la valeur totalQuantity
        totalQuantite += panier[i].quantity;
        // On aditionne au résultat de la multiplication (qté et prix de chaque article)
        totalPrix += (panier[i].quantity*article.price);
       
        
        /*------------------------------------ Supprimer Un Article ------------------------------------ */ 
        const articleDansPanier =  document.querySelector(`.cart__item[data-id='${panier[i].id}'][data-color='${panier[i].color}']`);

        //event pour supprimer article
        document.querySelector(`.cart__item[data-id='${panier[i].id}'][data-color='${panier[i].color}'] .deleteItem`).addEventListener("click", function() {
            location.reload();
            articleDansPanier.remove();
            let panier = JSON.parse(localStorage.getItem('panier'));
            let panierFiltrer = panier.filter(panier => panier.id !== articleDansPanier.dataset.id || panier.color !== articleDansPanier.dataset.color);
            
         
            panier = panierFiltrer;
            localStorage.setItem("panier", JSON.stringify(panier));
    
        }); 
        
        /*------------------------------------ Modifier Quantité ------------------------------------*/
        document.querySelector(`.cart__item[data-id='${panier[i].id}'][data-color='${panier[i].color}'] .itemQuantity`).addEventListener('change', function() {
            // Rafraichie la page automatiquement
            location.reload();    
            let valeurQte = document.querySelector(`.cart__item[data-id='${panier[i].id}'][data-color='${panier[i].color}'] .itemQuantity`).value;
            
            // On convertit une chaîne de caractères en nombre
            let ConvertirStringEnNombre = parseFloat(valeurQte);

            // On utilise le nombre précédent pour l'ajouter au panier
            panier[i].quantity = ConvertirStringEnNombre;
            localStorage.setItem("panier", JSON.stringify(panier));
            
        });
        


    };
    document.querySelector('#totalQuantity').innerHTML = totalQuantite;
    document.querySelector('#totalPrice').innerHTML = totalPrix;

};afficheArticleDansPanier();


/*----------------------- Remplir Le Formualire -----------------------*/
    const prenom = document.getElementById('firstName');
    const nom = document.getElementById('lastName');
    const adresse = document.getElementById('address');
    const ville = document.getElementById('city');
    const email = document.getElementById('email');
    
    
    const erreurPrenom = document.getElementById('firstNameErrorMsg');
    const erreurNom = document.getElementById('lastNameErrorMsg');
    //const erreurAdresse = document.getElementById('addressErrorMsg');
    //const erreurVille = document.getElementById('cityErrorMsg');
    //const erreurEmail = document.getElementById('emailErrorMsg');

    const ChampLettre = /[a-zA-Z]/;
document.getElementById('order').addEventListener('click', function(e){

    if (ChampLettre.test(prenom.value) == false){
        e.preventDefault();
        erreurPrenom.textContent = "Ce champs doit contenir uniquement des lettres";
    }else if (ChampLettre.test(nom.value) == false) {
        e.preventDefault();
        erreurNom.textContent = "Ce champs doit contenir uniquement des lettres";
    }else {
        console.log("ok");
    };
    //1. Message Erreur (en dessous du champs) lors du remplissage du formulaire
    

        //1.1 Nom et Prénom avec seulemnt des lettres      
        //1.2 Email avec @ obligatoire
});


    //2. Requête Post
        //method:
        //headers:
        //body: