let cart = [];

function addToCart(appName) {
  cart.push({
    name: appName,  
  });

  updateCartDisplay();
  saveCartForUser();

  alert(`${appName} added to cart!`);
}

function removeFromCart(index) {
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    updateCartDisplay();
    saveCartForUser();
    renderCartPage();
  }
}

function clearCart() {
  const confirm_clear = confirm("Are you sure you want to clear your cart?");
  if (!confirm_clear) return;
  
  cart = [];
  updateCartDisplay();
  saveCartForUser();
  renderCartPage();

  alert("Cart cleared!");
}

function updateCartDisplay() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = `Cart (${cart.length})`;
  }
}


function goToCart() {
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("cart-page").style.display = "block";
  document.getElementById("total-items").textContent = cart.length;
  renderCartPage();
}

function backToDashboard() {
  document.getElementById("cart-page").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
}

function renderCartPage() {
  const container = document.getElementById("cart-items-list");
  if (!container) return;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<div class='empty-cart'><h2>Your cart is empty</h2><p>Add some applications to get started!</p></div>";
    return;
  }

  cart.forEach((item, index) => {
    const itemName = item.name || item;

    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <div class="cart-item-content">
        <div class="cart-item-name">${itemName}</div>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
    `;
    container.appendChild(itemDiv);
  });
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const confirmCheckout = confirm(`Checkout ${cart.length} item(s)?`);
  if (confirmCheckout) {
    const checkoutData = {
      items: [...cart],
      totalItems: cart.length,
      username: currentUser ? currentUser.username : "guest"
    };

    if (currentUser) {
      const historyKey = `appcart_checkout_history_${currentUser.username}`;
      const existingHistory = JSON.parse(localStorage.getItem(historyKey) || "[]");
      existingHistory.push(checkoutData);
      localStorage.setItem(historyKey, JSON.stringify(existingHistory));
    }

    alert(`Successfully checked out ${cart.length} item(s)!`);
    cart = [];
    saveCartForUser();
    updateCartDisplay();
    backToDashboard();
  }
}
