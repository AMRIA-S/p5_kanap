async function getProductAndDisplay() {
//pieces dans API
const res = await fetch ('http://localhost:3000/api/products');
const items = await res.json();

insertProducts(items);

}

function insertProducts(products) {
    
    const parser = new DOMParser();
    const items = document.getElementById('items');
    for (let i = 0; i < products.length; i++) {
        let productsItems = //We insert the HTML in the DOM
            `<a href="./product.html?id=${products[i]._id}"> 
            <article>            
            <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
            <h3 class="productName">${products[i].name}</h3>
            <p class="productDescription">${products[i].description}</p>
            </article>
            </a>`;
        const displayItems = parser.parseFromString(productsItems, "text/html");
        items.appendChild(displayItems.body.firstChild);
    };
}

getProductAndDisplay();