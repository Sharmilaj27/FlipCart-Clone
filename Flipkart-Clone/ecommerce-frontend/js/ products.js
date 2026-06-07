const productGrid = document.getElementById("productGrid");

fetch("http://localhost:8080/api/products")
  .then(response => response.json())
  .then(products => {

    productGrid.innerHTML = "";

    products.forEach(product => {

      productGrid.innerHTML += `
        <div class="product-card">

          <img src="${product.imageUrl}"
               alt="${product.name}">

          <h3>${product.name}</h3>

          <p>${product.description}</p>

          <h4>₹${product.price}</h4>

          <button onclick="addToCart(${product.id})">
             Add To Cart
          </button>

        </div>
      `;
    });

  })
  .catch(error => {

    console.error(error);

    productGrid.innerHTML =
      "<h2>Unable to load products</h2>";
  });
function addToCart(id) {

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(id);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert("Product Added To Cart");
}