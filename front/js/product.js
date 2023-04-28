const apiID = '{id=42}';

fetch('http://localhost:3000/api/products?${apiId}').then((res) =>
res.json().then((kanap) => {
    console.log(kanap);
    

    function kanapPageProduct() {
        for (i = 0; kanap.length; i++) {
            
            document.getElementsByTagName("img").innerHTML = kanap.img;
            document.getElementById('price').innerHTML = kanap.price;
            document.getElementById('title').innerHTML = kanap.name;
            document.getElementById('#description').innerHTML = kanap.description;
            document.getElementById('#colors').innerHTML = kanap.colors;

            
        }
    }
})
);