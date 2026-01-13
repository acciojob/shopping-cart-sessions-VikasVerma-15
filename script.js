// List of products
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// -----------------------
// Session Storage Helpers
// -----------------------
function getCartFromSession() {
  return JSON.parse(sessionStorage.getItem("cart")) || [];
}

function saveCartToSession(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// -----------------------
// Render Products
// -----------------------
function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - $${product.price} `;

    const button = document.createElement("button");
    button.textContent = "Add to Cart";

    button.addEventListener("click", () => addToCart(product));

    li.appendChild(button);
    productList.appendChild(li);
  });
}

// -----------------------
// Render Cart
// -----------------------
function renderCart() {
  cartList.innerHTML = "";

  const cart = getCartFromSession();

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// -----------------------
// Add Product to Cart
// -----------------------
function addToCart(product) {
  const cart = getCartFromSession();
  cart.push(product);
  saveCartToSession(cart);
  renderCart();
}

// -----------------------
// Clear Cart
// -----------------------
clearCartBtn.addEventListener("click", () => {
  sessionStorage.removeItem("cart");
  renderCart();
});

// -----------------------
// Initial Load
// -----------------------
renderProducts();
renderCart();
