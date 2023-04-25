//pieces depuis fichier json products
const repItems = await fetch ('http://localhost:3000/api/products');
const items = await repItems.json();

const productsStorage = window.localStorage.getItem('articleDansIndex');


//Création variable
function articlesProduct() {
    
    //
    const sectionPourItems = document.querySelector(".Items");
    const sectionDesItems = document.createElement("article")

    // Création des balises
    const colorsElement = document.createElement("p");
    colorsElement.innerText = article.colors;
    const imageURLElement = document.createElement("img");
    imageURLElement.src = article.imageURL;
    const _idElement = document.createElement("p");
    _idElement.innerText = article._id;
    const nameElement = document.createElement("h1");
    nameElement.innerText = article.name;
    const priceElement = document.createElement("p");
    priceElement.innerText = `Prix: ${article.price} €`;
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = article.description;
    const altTxtElement = document.createElement("p");
    altTxtElement.innerText = article.altTxt;

    //Rattachement de nos balises au DOM
    sectionDesItems.appendChild(colorsElement);
    sectionPourItems.appendChild(imageURLElement);
    sectionDesItems.appendChild(_idElement);
    sectionDesItems.appendChild(nameElement);
    sectionDesItems.appendChild(priceElement);
    sectionDesItems.appendChild(descriptionElement);
    sectionDesItems.appendChild(altTxtElement);
}
articlesProduct(products);
