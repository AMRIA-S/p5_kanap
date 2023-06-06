async function getProductAndDisplay() {
// Récupère les pieces dans API
const res = await fetch ('http://localhost:3000/api/products');
const items = await res.json();

insertProducts(items);

}

function insertProducts(products) {
    
    // Utilise le DOMParser pour créer les éléments dans l'id de items du HTML
    const parser = new DOMParser();
    const items = document.getElementById('items');

    // Boucle pour afficher tous les produits présents dans l'API
    for (let i = 0; i < products.length; i++) {

        // Création du HTML
        let productsItems = 
            `<a href="./product.html?id=${products[i]._id}"> 
            <article>            
            <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
            <h3 class="productName">${products[i].name}</h3>
            <p class="productDescription">${products[i].description}</p>
            </article>
            </a>`;

        // Les afficher
        const displayItems = parser.parseFromString(productsItems, "text/html");
        items.appendChild(displayItems.body.firstChild);
    }
};
getProductAndDisplay();