async function getProduct() {
    //pieces dans API
    const res = await fetch ('http://localhost:3000/api/products');
    const products = await res.json();
    
    panierBoucle(products);
    
};

function panierBoucle(products) {

    //recup panier du client stocké dans localStorage
    let panier = JSON.parse(localStorage.getItem("panier"));

    //recupération des données HTML et les affichent sur la page panier avec une boucle pour la couleur et quantité
        for (let i in panier) {
            document.getElementById('cart__items').innerHTML += 
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
        };

};getProduct();