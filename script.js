let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = JSON.parse(localStorage.getItem("total")) || 0;
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

updateCart();
updateWishlistCount();

/* =====================
TOAST
===================== */
function showToast(message) {
    let toast = document.getElementById("toast");
    if (!toast) return;

    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

/* =====================
ATTACH PRODUCT BUTTON EVENTS (FIX MAIN ISSUE)
===================== */
document.addEventListener("DOMContentLoaded", () => {

    let products = document.querySelectorAll(".item");

    products.forEach(product => {

        let name = product.querySelector("h3").innerText;
        let priceText = product.querySelector("p").innerText;
        let price = Number(priceText.replace(/[^\d]/g, ""));

        let buttons = product.querySelectorAll("button");

        let addBtn = buttons[0];
        let buyBtn = buttons[1];

        addBtn.addEventListener("click", () => {
            addToCart(name, price);
        });

        buyBtn.addEventListener("click", () => {
            buyNow(name, price);
        });
    });

    /* CONTACT FORM FIX */
    let form = document.querySelector(".contact form");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            showToast("📩 Message sent successfully!");
            form.reset();
        });
    }
});


/* =====================
ADD TO CART
===================== */
function addToCart(name, price) {

    cart.push({ product: name, price: price });
    total += price;

    saveCart();
    updateCart();

    showToast("🛒 Added to cart!");
}


/* =====================
BUY NOW
===================== */
function buyNow(name, price) {

    document.getElementById("checkout-product").innerText = name;
    document.getElementById("checkout-price").innerText = "₹" + price;

    document.getElementById("checkout-popup").style.display = "flex";

    showToast("⚡ Proceeding to buy now!");
}


/* =====================
CHECKOUT
===================== */
function checkout() {

    if (cart.length === 0) {
        showToast("Cart is empty!");
        return;
    }

    document.getElementById("checkout-product").innerText = "Cart Items";
    document.getElementById("checkout-price").innerText = "₹" + total;

    document.getElementById("checkout-popup").style.display = "flex";
}


/* =====================
PLACE ORDER
===================== */
function placeOrder() {

    let name = document.getElementById("customer-name").value;
    let phone = document.getElementById("customer-phone").value;
    let address = document.getElementById("customer-address").value;

    if (!name || !phone || !address) {
        showToast("Fill all details!");
        return;
    }

    cart = [];
    total = 0;
    saveCart();
    updateCart();

    document.getElementById("checkout-popup").style.display = "none";
    document.getElementById("order-success").style.display = "flex";

    showToast("🎉 Order placed!");
}


/* =====================
CART UI
===================== */
function updateCart() {
    document.getElementById("cart-count").innerText = cart.length;
    document.getElementById("cart-total").innerText = "₹" + total;
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("total", JSON.stringify(total));
}

function openCart() {
    document.getElementById("cart-box").style.display = "block";
}

function closeCartBox() {
    document.getElementById("cart-box").style.display = "none";
}

/* =====================
WISHLIST (simple)
===================== */
function updateWishlistCount() {
    document.getElementById("wishlist-count").innerText = wishlist.length;
}

function openWishlist() {
    document.getElementById("wishlist-box").style.display = "block";
}

function closeWishlistBox() {
    document.getElementById("wishlist-box").style.display = "none";
}

/* =====================
CLOSE POPUPS
===================== */
function closeCheckout() {
    document.getElementById("checkout-popup").style.display = "none";
}

function closeOrderSuccess() {
    document.getElementById("order-success").style.display = "none";
}