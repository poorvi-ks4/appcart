const userData = [{ username: "admin", password: "12345" },
  { username: "john",  password: "12345" },
  { username: "mary",  password: "67890" }
];

let currentUser = null;

function saveCurrentUser(user) {
  if (user) {
    localStorage.setItem("appcart_current_user", JSON.stringify(user));
  } else {
    localStorage.removeItem("appcart_current_user");
  }
}

function saveCartForUser() {
  if (!currentUser) return;
  const username = currentUser.username;
  localStorage.setItem(`appcart_cart_${username}`, JSON.stringify(cart));
}

function loadCartForUser(username) {
  cart = [];
  if (!username) {
    updateCartDisplay();
    return;
  }

  const stored = localStorage.getItem(`appcart_cart_${username}`);
  if (stored) {
    try {
      cart = JSON.parse(stored);
    } catch (e) {
      cart = [];
    }
  }
  updateCartDisplay();
}

function Login() {
  const enteredUsername = document.getElementById("username").value.trim();
  const enteredPassword = document.getElementById("password").value;

  const user = userData.find(u => u.username === enteredUsername && u.password === enteredPassword);
  if (!user) {
    alert("Invalid username or password.");
    return;
  }

  currentUser = user;
  saveCurrentUser(user);
  
  document.getElementById("login-card").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
  document.getElementById("cart-page").style.display = "none";
  document.getElementById("welcome-user").textContent = `Welcome, ${user.username}`;
  document.getElementById("cart-username").textContent = user.username;

  loadCartForUser(user.username);
  displayApplications();
}

function logout() {
  if (currentUser) {
    saveCartForUser();
  }

  currentUser = null;

  document.getElementById("dashboard").style.display = "none";
  document.getElementById("cart-page").style.display = "none";
  document.getElementById("login-card").style.display = "block";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  
  cart = [];
  updateCartDisplay();
}