class ProductItem extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.added = false;
  }

  connectedCallback() {
    this.root.getElementById('add-item').addEventListener('click', () => this.addToCart());
  }

  addToCart() {
    const button = this.root.getElementById('add-item');
    const count = document.getElementById('cart-count');
    this.added = !this.added;
    let cart = JSON.parse(localStorage.getItem('cart'));

    if(this.added) {
      button.innerHTML = 'Remove from Cart';
      count.innerHTML = Number(count.innerHTML) + 1;
      cart[this.id] = true;
    }
    else {
      button.innerHTML = 'Add To Cart';
      count.innerHTML = Number(count.innerHTML) - 1;
      cart[this.id] = false;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  set product(product) {
    this.id = product.id;
    this.added = JSON.parse(localStorage.getItem('cart'))[product.id];
    let initialState = "";
    const count = document.getElementById('cart-count');
 
    if(this.added) {
      initialState = "Remove from Cart";
      count.innerHTML = Number(count.innerHTML) + 1;
    }
    else {
      initialState = "Add to Cart";
    }
    this.root.innerHTML = ` 
      <style> 
        .price {
          color: green;
          font-size: 1.8em;
          font-weight: bold;
          margin: 0;
        }
        
        .product {
          align-items: center;
          background-color: white;
          border-radius: 5px;
          display: grid;
          grid-template-areas: 
          'image'
          'title'
          'price'
          'add';
          grid-template-rows: 67% 11% 11% 11%;
          height: 450px;
          filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
          margin: 0 30px 30px 0;
          padding: 10px 20px;
          width: 200px;
        }
        
        .product > button {
          background-color: rgb(255, 208, 0);
          border: none;
          border-radius: 5px;
          color: black;
          justify-self: center;
          max-height: 35px;
          padding: 8px 20px;
          transition: 0.1s ease all;
        }
        
        .product > button:hover {
          background-color: rgb(255, 166, 0);
          cursor: pointer;
          transition: 0.1s ease all;
        }
        
        .product > img {
          align-self: center;
          justify-self: center;
          width: 100%;
        }
        
        .title {
          font-size: 1.1em;
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        .title:hover {
          font-size: 1.1em;
          margin: 0;
          white-space: wrap;
          overflow: auto;
          text-overflow: unset;
        }
      </style>

      <li class="product">
        <img src="${product.image}" alt="Fjallraven - Foldstack No. 1 Backpack, Fits 15 Laptops" width=200>
        <p class="title">${product.title}</p>
        <p class="price">${product.price}</p>
        <button id="add-item">${initialState}</button>
      </li>
      `    
  }
}

customElements.define('product-item', ProductItem);