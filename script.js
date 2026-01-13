// CLEAR CART ON EVERY PAGE LOAD (IMPORTANT FOR CYPRESS)
sessionStorage.removeItem("cart");

const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

function getCartFromSession() {
  return JSON.parse(sessionStorage.getItem("cart")) || [];
}

function saveCartToSession(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

function renderProducts() {
  productList.innerHTML = "";

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    const li = document.createElement("li");
    li.textContent = `${product.name} - $${product.price} `;

    const btn = document.createElement("button");
    btn.innerText = "Add to Cart";

    btn.addEventListener("click", function () {
      addToCart(product);
    });

    li.appendChild(btn);
    productList.appendChild(li);
  }
}

function renderCart() {
  cartList.innerHTML = "";
  const cart = getCartFromSession();

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  }
}

function addToCart(product) {
  const cart = getCartFromSession();
  cart.push(product);
  saveCartToSession(cart);
  renderCart();
}

clearCartBtn.addEventListener("click", function () {
  sessionStorage.removeItem("cart");
  renderCart();
});

renderProducts();
renderCart();
