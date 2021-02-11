window.addEventListener('DOMContentLoaded', () => {
  if(localStorage.getItem('products') == null) {
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    // .then(data => localStorage.setItem('products', JSON.stringify(data)));
    .then(data => storeData(data));
  }
  else {
    renderItems();
  }
  if(localStorage.getItem('cart') == null) {
    let cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // products = JSON.parse(localStorage.getItem('products'));
  // const productList = document.getElementById('product-list');
  // for(let i = 0; i < products.length; i++) {
  //   product = products[i];
  //   let productCard = document.createElement('product-item');
  //   productCard.product = product;

  //   productList.appendChild(productCard);
  // }
});

function storeData(data) {
  localStorage.setItem('products', JSON.stringify(data));
  renderItems();
}

function renderItems() {
  products = JSON.parse(localStorage.getItem('products'));
  const productList = document.getElementById('product-list');
  for(let i = 0; i < products.length; i++) {
    product = products[i];
    let productCard = document.createElement('product-item');
    productCard.product = product;

    productList.appendChild(productCard);
  }
}