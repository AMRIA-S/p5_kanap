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


// lors du clic sur le bouton "Ajouter au Panier"
document.getElementById("addToCart").addEventListener("click", function(event) {

    // 1. on recupère la quantité et la couleur choisie
   // var quantity = document.querySelector('#quantity');
    //console.log(quantity);

    //var color = document.getElementById('colors');
    var colors = document.querySelector('select');

    
    



/*   function verifQt(quantity) {   
        // 2. on verifie que la quantité est comprise entre 1 et 100

        if (quantity.value >= 1 && quantity <= 100) {
            
            console.log("Veuillez choisir un nombre compris entre 1 et 100");
            return false;
            
            
        }else {
            console.log("quantitée ok");
            return true;
        }
   };verifQt(quantity);  */


  // 2 bis. on verifie qu'une couleur a bien été choisie
    function verifColor(colors)  {

        if (colors.value ==="") {
            event.preventDefault;
            console.log("Veuillez choisir une couleur");
            return false;
        }else {
            console.log("couleur selectionnée");
            return true
        }
    };verifColor(colors);




//si quantité non comprise entre 0 et 100 OU que couleur non choisi alors on affiche un message d'erreur dans une alert
/*function verifColorsQuantite(quantity, color) {
    if (quantity >= 1 && quantity <= 100 || color !=="--SVP, choisissez une couleur --") {
        console.log("quantité et couleur obligatoire");
        return false;
    
    }else {
        event.preventDefault;
        console.log(color, "ok");
        return true;
    };
};verifColorsQuantite(color);*/

// sinon

   // on récupere le panier de l'utilisateur dans le localstorage

        // si panier est vide, alors on le créé
        // sinon on continue

   // si le kanap est deja présent dans le panier
        // on modifie la quantité dans le panier
   // sinon on l'ajoute dans la panier


// afficher une alert comme quoi le produit XXX a bien été ajouté au panier

// sauvegarder le panier dans le localstorage
});
