let userMessages = JSON.parse(localStorage.getItem('userMessages')) || {}; // Load user messages

const usersList = document.getElementById("usersList");
const chatArea = document.getElementById("chatArea");
const chatMessages = document.getElementById("chatMessages");
const currentUserName = document.getElementById("currentUserName");

// Display active users
Object.keys(userMessages).forEach(user => {
  const userElement = document.createElement("li");
  userElement.textContent = user;
  userElement.addEventListener("click", function () {
    displayUserMessages(user);
  });
  usersList.appendChild(userElement);
});

// Display selected user's messages
function displayUserMessages(user) {
  currentUserName.textContent = user;
  chatMessages.innerHTML = ''; // Clear previous messages

  // Load and display user's messages
  if (userMessages[user]) {
    userMessages[user].forEach(msg => {
      const messageElement = document.createElement("li");
      messageElement.textContent = `${msg.sender}: ${msg.message}`;
      messageElement.classList.add(msg.sender === user ? 'user-message' : 'admin-message');
      chatMessages.appendChild(messageElement);
    });
  }

  // Show the chat area
  chatArea.style.display = "block";

  // Handle admin reply
  document.getElementById("sendAdminReplyBtn").onclick = function () {
    const adminMessage = document.getElementById("adminMessageInput").value.trim();
    if (adminMessage !== "") {
      // Add the admin's reply to the messages
      if (!userMessages[user]) {
        userMessages[user] = [];
      }
      userMessages[user].push({ sender: "Admin", message: adminMessage });

      // Update localStorage
      localStorage.setItem('userMessages', JSON.stringify(userMessages));

      // Display the new message
      const adminMessageElement = document.createElement("li");
      adminMessageElement.textContent = `Admin: ${adminMessage}`;
      adminMessageElement.classList.add('admin-message');
      chatMessages.appendChild(adminMessageElement);

      // Clear input field
      document.getElementById("adminMessageInput").value = '';
    }
  };
}
