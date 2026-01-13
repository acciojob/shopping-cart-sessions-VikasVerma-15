// Clear cart at page load to prevent leftover data from previous tests
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

// Get cart from sessionStorage
function getCartFromSession() {
  return JSON.parse(sessionStorage.getItem("cart")) || [];
}

// Save cart to sessionStorage
function saveCartToSession(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Render products
function renderProducts() {
  productList.innerHTML = "";

  for (const product of products) {
    const li = document.createElement("li");
    li.textContent = `${product.name} - $${product.price} `;

    const btn = document.createElement("button");
    btn.textContent = "Add to Cart";
    btn.addEventListener("click", () => addToCart(product));

    li.appendChild(btn);
    productList.appendChild(li);
  }
}

// Render cart
function renderCart() {
  cartList.innerHTML = "";
  const cart = getCartFromSession();

  for (const item of cart) {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  }
}

// Add product to cart
function addToCart(product) {
  const cart = getCartFromSession();
  cart.push(product); // accumulate during test
  saveCartToSession(cart);
  renderCart();
}

// Clear cart
clearCartBtn.addEventListener("click", () => {
  sessionStorage.removeItem("cart");
  renderCart();
});

// Initial render
renderProducts();
renderCart();
