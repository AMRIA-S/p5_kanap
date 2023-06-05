async function afficherNumeroCommande() {
  const reponse = await fetch("http://localhost:3000/api/products/order")
  const req = reponse.json();
  
  document.getElementById('orderId') = orderId;
  console.log(orderId);
  console.log(req);
};



/*
<div class="confirmation">
  <p>Commande validée ! <br>Votre numéro de commande est : <span id="orderId"><!-- 65431343444684674 --></span></p>
</div>
*/