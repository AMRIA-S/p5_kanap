const param = new URLSearchParams(window.location.search);
let idProduct = param.get("id");


fetch(`http://localhost:3000/api/products/${idProduct}`).then((res) =>
res.json().then((kanap) => {
    console.log(kanap);
    document.title = kanap.name;
    const itemImage = document.createElement("img");
    document.querySelector(".item__img").appendChild(itemImage);
    itemImage.setAttribute("src", kanap.imageUrl);
    itemImage.setAttribute("alt", kanap.altTxt);
    document.querySelector('#price').innerHTML = kanap.price;
    document.querySelector('#title').innerHTML = kanap.name;
    document.querySelector('#description').innerHTML = kanap.description;
    for (let colors of kanap.colors) {
        const itemColors = document.createElement("option")
        document.getElementById("colors").appendChild(itemColors)
        itemColors.value = colors
        itemColors.innerHTML = colors
    }
    document.querySelector('#quantity').innerHTML = kanap.quantity;
    

    })
);


// lors du clic sur le bouton "Ajouter au Panuer"

// 1. on recupere la quantité et la couleur choisie

// 2. on verifie que la quantité est comprise entre 1 et 100
// 2 bis. on verifie qu'une couleur a bien été choisie

// si quantité non comprise entre 0 et 100 OU que couleur non choisi alors on affiche un message d'erreur dans une alert

// sinon

   // on récupere le panier de l'utilisateur dans le localstorage

        // si panier est vide, alors on le créé
        // sinon on continue

   // si le kanap est deja présent dans le panier
        // on modifie la quantité dans le panier
   // sinon on l'ajoute dans la panier


// afficher une alert comme quoi le produit XXX a bien été ajouté au panier

// sauvegarder le panier dans le localstorage

