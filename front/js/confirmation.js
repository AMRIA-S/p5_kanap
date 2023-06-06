// URLSearchParams pour récupérer le numéro de commande affiché dans l'Url
const param = new URLSearchParams(window.location.search);
const orderId = param.get("orderId");


function afficherNumeroCommande() {
  // Récupère id de l'élement html où doit s'afficher le prix et lui applique la variable du numéro de commande "orderId"
  document.getElementById('orderId').innerText = orderId;
};
afficherNumeroCommande();
