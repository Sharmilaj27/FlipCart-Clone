// Shop Now Button
function shopNow() {
    window.location.href = "products.html";
}

// Add To Cart
function addToCart(id, name, price, image) {

    let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        id,
        name,
        price,
        image,
        quantity:1
    });

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert(name + " added to cart!");
}

// Buy Now
function buyNow(id, name, price, image) {

    localStorage.setItem(
        "buyNowProduct",
        JSON.stringify({
            id,
            name,
            price,
            image
        })
    );

    window.location.href =
    "checkout.html";
}