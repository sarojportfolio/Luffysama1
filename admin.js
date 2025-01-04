// Mock data for logged-in admin
const adminEmail = localStorage.getItem("loggedInAdminEmail");

// Display logged-in admin email
if (adminEmail) {
  document.getElementById("loggedInEmail").textContent = `Logged in as: ${adminEmail}`;
} else {
  // Redirect to login if not logged in
  window.location.href = "admin-login.html";
}

// Logout functionality
document.getElementById("logoutBtn").addEventListener("click", function () {
  localStorage.removeItem("loggedInAdminEmail"); // Clear admin session
  window.location.href = "admin-login.html"; // Redirect to login
});

// Active user messages (example data structure stored in localStorage)
let userMessages = JSON.parse(localStorage.getItem("userMessages")) || {};

const usersList = document.getElementById("usersList");
const chatContainer = document.getElementById("chatContainer");
const chatMessages = document.getElementById("chatMessages");
const currentUserName = document.getElementById("currentUserName");

// Populate the list of active users
Object.keys(userMessages).forEach(user => {
  const userElement = document.createElement("li");
  userElement.textContent = user;
  userElement.addEventListener("click", function () {
    loadUserMessages(user);
  });
  usersList.appendChild(userElement);
});

// Load user messages into the chat container
function loadUserMessages(user) {
  currentUserName.textContent = user;
  chatMessages.innerHTML = ""; // Clear previous messages

  if (userMessages[user]) {
    userMessages[user].forEach(msg => {
      const messageElement = document.createElement("li");
      messageElement.textContent = `${msg.sender}: ${msg.message}`;
      messageElement.classList.add(msg.sender === user ? "user-message" : "admin-message");
      chatMessages.appendChild(messageElement);
    });
  }

  chatContainer.style.display = "block"; // Show chat container
}

// Send admin reply
document.getElementById("sendReplyBtn").addEventListener("click", function () {
  const adminMessageInput = document.getElementById("adminMessageInput");
  const message = adminMessageInput.value.trim();

  if (message !== "") {
    const user = currentUserName.textContent;

    // Add admin's message to userMessages
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

    // Clear the input field
    adminMessageInput.value = "";
  }
});
