fetch('http://localhost:3000/api/products').then((res) =>
res.json().then((kanap) => {
    console.log(kanap);
    document.querySelector("img").innerHTML = kanap.img;
    document.querySelector('#price').innerHTML = kanap.price;
    document.querySelector('#title').innerHTML = kanap.name;
    document.querySelector('#description').innerHTML = kanap.description;
    document.querySelector('#colors').innerHTML = kanap.colors;
    document.querySelector('#quantity').innerHTML = kanap.quantity;
    

    })
);
