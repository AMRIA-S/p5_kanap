//Appelle API
async function getProduct() {
    var id = window.location.search;
    console.log(id);
    //pieces dans API
    const res = await fetch ("http://localhost:3000/api/products/" + id);
    const article = await res.json();

    afficheArticleDansPanier(article);

};

/*async function getProduct() {
    //pieces dans API
    const res = await fetch ("http://localhost:3000/api/products");
    const article = await res.json();

    afficheArticleDansPanier(article);

};*/

function afficheArticleDansPanier(products) {

    //recup panier du client stocké dans localStorage
    let panier = JSON.parse(localStorage.getItem("panier")); 

    //recupération des données HTML et les affichent sur la page panier avec une boucle pour remplacer le texte par les valeurs enregistrer dans API et localstorage
    const parse = new DOMParser();
    const kanap = document.getElementById('cart__items');
    for (let i = 0; i < panier.length; i++) {
        let product =
            `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
            <div class="cart__item__img">
                <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${products[i].name}</h2>
                    <p>${panier[i].color}</p>
                    <p>${products[i].price} €</p>
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
        console.log(" nom: " + products[i].name + " prix: " + products[i].price + " couleur: " + panier[i].color + " quantité: " + panier[i].quantity);
    
    };
};getProduct();



//1. lors du click sur input pour modifier la quantité (évenèment de modification)

//2. modification qté dans localStorage
    //recup la sauvegarde et
        //si + alors ajouter qté
        //si - alors enlever qté
    //sauvegarde total qté dans localStorage

//modification du DOM