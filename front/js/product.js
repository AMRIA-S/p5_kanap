const param = new URLSearchParams(window.location.search);
const idProduct = param.get("id");


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

function verifQt(quantity) {
    return ((quantity >= 1) && (quantity <= 100));
};

// On verifie qu'une couleur a bien été choisie
function verifColor(color)  {
    return color != "";
};

function sauvegarderPanier(panier) {
    localStorage.setItem("panier", JSON.stringify(panier));
}

function ajouterProduitAuPanier(product) {

    let panier = JSON.parse(localStorage.getItem("panier"));

    // si panier est vide, alors on le créé
    if(panier == null) {
       panier = [];
       panier.push(product);
    } else {
        let produitDejaExistant = panier.find(produitDuPanier => produitDuPanier.id === product.id && product.color === produitDuPanier.color);

        if(produitDejaExistant) {
            produitDejaExistant.quantity += product.quantity;
        } else {
            panier.push(product)
        }
    }

    sauvegarderPanier(panier);
}

// lors du clic sur le bouton "Ajouter au Panier"
document.getElementById("addToCart").addEventListener("click", function() {

    // On recupère la quantité et la couleur choisie
    const color = document.querySelector('select').value;
    const quantity = +document.getElementById('quantity').value;

    
    if (verifQt(quantity) && verifColor(color)) {

         //créer un objet product avec id, couleur et quantitée
        const product = {
            id: idProduct,
            color: color,
            quantity: quantity,
        };        

        ajouterProduitAuPanier(product);
        
    } else {
        alert("Une couleur doit être choisie et la quantité doit être comprise entre 1 et 100 ");
    }
    
});

