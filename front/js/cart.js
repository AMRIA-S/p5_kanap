//affiche les produits selectionnés par le client
async function afficheArticleDansPanier() {

    //recup panier du client stocké dans localStorage
    let panier = JSON.parse(localStorage.getItem("panier")); 

    //recup le HTML
    const parse = new DOMParser();
    const kanap = document.getElementById('cart__items');
    for (let i = 0; i < panier.length; i++) {

        //afficher sur la page panier avec une boucle pour remplacer le texte par les valeurs enregistrer dans API et localstorage
        const res = await fetch ("http://localhost:3000/api/products/" + panier[i].id);
        const article = await res.json();

        let product =
            `<article class="cart__item">
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
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${panier[i].quantity}" data-id="${panier[i].id}" data-color="${panier[i].color}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>`;
        const displayItems = parse.parseFromString(product, "text/html");
        kanap.appendChild(displayItems.body.firstChild);
        console.log(" nom: " + article.name + " prix: " + article.price + " couleur: " + panier[i].color + " quantité: " + panier[i].quantity);
    
    };
};afficheArticleDansPanier();


//Afficher prix total des articles




//1. element.closet() pour savoir quel produit modifier (data-id et data-color)

//2. lors du click sur input pour modifier la quantité (évenèment de modification)

//3. modification qté dans localStorage 
    //recup la sauvegarde

    //sauvegarde total qté dans localStorage

//4. modification du DOM