const param = new URLSearchParams(window.location.search);
let idProduct = param.get("id");


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


// lors du clic sur le bouton "Ajouter au Panier"
document.getElementById("addToCart").addEventListener("click", function(event) {

    // 1. on recupère la quantité et la couleur choisie
    var colors = document.querySelector('select');
    const quantity = document.getElementById('quantity').value;

   function verifQt(quantity) {   
        // 2. on verifie que la quantité est comprise entre 1 et 100

        if ((quantity >= 1) && (quantity <= 100)) {            
            //console.log("quantitée selectionnée");
            return true;
            
            
        }else {
            //console.log("Veuillez choisir un nombre compris entre 1 et 100");
            return false;
        }
   };verifQt(quantity);  


  // 2 bis. on verifie qu'une couleur a bien été choisie
    function verifColor(colors)  {

        if (colors.value ==="") {
            event.preventDefault;
            //console.log("Veuillez choisir une couleur");
            return false;
        }else {
            //console.log("couleur selectionnée");
            return true
        }
    };verifColor(colors);




    //si quantité non comprise entre 0 et 100 OU que couleur non choisi alors on affiche un message d'erreur dans une alert
    function verifColorQt() {
        if (quantity == false || colors.value == false) {
            event.preventDefault;
            alert("Veuillez selectionner une quantitité et une couleur");
            return false;

        }else {
            return true;
        }

    };verifColorQt();



    //créer array panier avec id, couleur et quantitée
    const products = {
        id: idProduct,
        colors: document.querySelector('select').value,
        quantity: document.getElementById('quantity').value
    };

    // on récupere le panier de l'utilisateur dans le localstorage
    
    let panier = JSON.parse(localStorage.getItem("products"));
    
    
    function ajouterPanier(products) {

        // si panier est vide, alors on le créé
        if(panier == null) {
            products.push;
        }else {

            // sinon on continue
            console.log("déja présent");
        };
    };ajouterPanier(products);
    console.log(products)
});

// si le kanap est deja présent dans le panier
        // on modifie la quantité dans le panier
   // sinon on l'ajoute dans la panier
  
   
// afficher une alert comme quoi le produit XXX a bien été ajouté au panier

// sauvegarder le panier dans le localstorage
 /*   function savePanier(panier) {
        localStorage.setItem("panier", JSON.stringify(products));
    }*/

