// EmailJS initialization
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS Public Key

// Admin credentials
const adminCredentials = {
  email: "sarojxettri46@gmail.com",
  pin: "9090"
};

// DOM elements
const loginContainer = document.getElementById("loginContainer");
const adminPanel = document.getElementById("adminPanel");
const loginForm = document.getElementById("loginForm");
const adminEmailInput = document.getElementById("adminEmail");
const adminPinInput = document.getElementById("adminPin");
const loginError = document.getElementById("loginError");
const loggedInEmail = document.getElementById("loggedInEmail");
const logoutBtn = document.getElementById("logoutBtn");
const usersList = document.getElementById("usersList");
const chatContainer = document.getElementById("chatContainer");
const chatMessages = document.getElementById("chatMessages");
const currentUserName = document.getElementById("currentUserName");
const adminMessageInput = document.getElementById("adminMessageInput");
const sendReplyBtn = document.getElementById("sendReplyBtn");

// Mock data for user messages
let userMessages = JSON.parse(localStorage.getItem("userMessages")) || {};

// Login form submission
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = adminEmailInput.value.trim();
  const pin = adminPinInput.value.trim();

  if (email === adminCredentials.email && pin === adminCredentials.pin) {
    // Login successful
    loggedInEmail.textContent = `Logged in as: ${email}`;
    loginContainer.style.display = "none";
    adminPanel.style.display = "block";

    // Notify login attempt via EmailJS
    sendLoginNotification(email);
  } else {
    loginError.textContent = "Incorrect email or pin. Please try again.";
  }
});

// Logout functionality
logoutBtn.addEventListener("click", function () {
  adminPanel.style.display = "none";
  loginContainer.style.display = "block";
});

// Notify admin login attempt via EmailJS
function sendLoginNotification(email) {
  const templateParams = {
    email: email,
    location: "Unknown Location",
    time: new Date().toLocaleString()
  };

  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
    .then(() => {
      console.log("Login notification sent.");
    })
    .catch(error => {
      console.error("Failed to send login notification:", error);
    });
}

// Populate active users
Object.keys(userMessages).forEach(user => {
  const userElement = document.createElement("li");
  userElement.textContent = user;
  userElement.addEventListener("click", function () {
    loadUserMessages(user);
  });
  usersList.appendChild(userElement);
});

// Load user messages
function loadUserMessages(user) {
  currentUserName.textContent = user;
  chatMessages.innerHTML = "";

  if (userMessages[user]) {
    userMessages[user].forEach(msg => {
      const messageElement = document.createElement("li");
      messageElement.textContent = `${msg.sender}: ${msg.message}`;
      messageElement.classList.add(msg.sender === user ? "user-message" : "admin-message");
      chatMessages.appendChild(messageElement);
    });
  }

  chatContainer.style.display = "block";
}

// Send admin reply
sendReplyBtn.addEventListener("click", function () {
  const message = adminMessageInput.value.trim();

  if (message !== "") {
    const user = currentUserName.textContent;

    if (!userMessages[user]) {
      userMessages[user] = [];
    }
    userMessages[user].push({ sender: "Admin", message: message });

    // Update localStorage
    localStorage.setItem("userMessages", JSON.stringify(userMessages));

    // Display admin's message
    const messageElement = document.createElement("li");
    messageElement.textContent = `Admin: ${message}`;
    messageElement.classList.add("admin-message");
    chatMessages.appendChild(messageElement);

    adminMessageInput.value = "";
  }
});
