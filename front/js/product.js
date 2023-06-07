// URLSearchParams pour récupérer l'id du canapé affiché dans l'URL
const param = new URLSearchParams(window.location.search);
const idProduct = param.get("id");

// Appelle l'API pour afficher les éléments du canapé dont l'id correspond ai numéro du l'URL
fetch(`http://localhost:3000/api/products/${idProduct}`).then((res) =>
res.json().then((kanap) => {
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

// Fonction pour vérifier que la quantité est ien comprise entre 1 et 100
function verifierQuantite(quantity) {
    return ((quantity >= 1) && (quantity <= 100));
};

// Fonction pour verifier qu'une couleur a bien été choisie
function verifierColor(color)  {
    return color != "";
};

// Fonction SauvegarderPanier pour sauvegarder dans le localStotage
function sauvegarderPanier(panier) {
    localStorage.setItem("panier", JSON.stringify(panier));
}

// Fonction pour ajouter le produit dans la page 'cart.js'
function ajouterProduitAuPanier(product) {

    let panier = JSON.parse(localStorage.getItem("panier"));

    // Si le panier est vide, alors on le créé
    if(panier == null) {
       panier = [];
       panier.push(product);
    } else {
        let produitDejaExistant = panier.find(produitDuPanier => produitDuPanier.id === product.id && product.color === produitDuPanier.color);

        // Sinon on ajoute juste la quantité si l'id et la couleur du canapé existe déja
        if(produitDejaExistant) {
            produitDejaExistant.quantity += product.quantity;
        } else {
            panier.push(product)
        }
    }

    // Réutilisation la fonction sauvegarderPanier pour sauvagrder dans le panier
    sauvegarderPanier(panier);

    // Ajout d'une alerte qui s'affichera pour confirmer l'ajout de l'article au panier
    alert("Article(s) ajouté(s) au panier")
}


// Lors du clic sur le bouton "Ajouter au Panier"
document.getElementById("addToCart").addEventListener("click", function() {

    // Recupèration de la quantité et la couleur choisie en convertissant la valeur du nombre en Number au lieu de string
    const color = document.querySelector('select').value;
    const quantity = +document.getElementById('quantity').value;

    // Condition pour vérifier si la quantité et la couleur ont été choisi
    if (verifierQuantite(quantity) && verifierColor(color)) {
        // Si oui :

        //création d'un objet 'product' avec id, couleur et quantité
        const product = {
            id: idProduct,
            color: color,
            quantity: quantity
        };

        //Réutilisation la fonction ajouterProduitAuPanier pour ajouter le(s) produit(s) dans le panier (page 'cart.js)
        ajouterProduitAuPanier(product);

    } else {

        // Sinon afficher une alerte
        alert("Une couleur doit être choisie et la quantité doit être comprise entre 1 et 100 ");
    }
});