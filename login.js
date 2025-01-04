const adminEmail = "sarojxettri46@gmail.com";
const adminPin = "9090";

document.getElementById("adminLoginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const pin = document.getElementById("pin").value.trim();
  const errorMessage = document.getElementById("errorMessage");

  if (email === adminEmail && pin === adminPin) {
    // Redirect to admin panel on successful login
    window.location.href = "admin.html";
  } else {
    // Display error message
    errorMessage.textContent = "Incorrect email or PIN.";
    sendLoginAttemptNotification(email); // Notify about the failed login attempt
  }
});

// Function to send login attempt notification
function sendLoginAttemptNotification(email) {
  // Get the user's location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      // Send notification email
      Email.send({
        SecureToken: "YOUR_EMAILJS_SECURE_TOKEN", // Replace with your EmailJS secure token
        To: adminEmail,
        From: "notification@yourdomain.com",
        Subject: "New Admin Panel Login Attempt",
        Body: `
          <p><strong>Login Attempt Details:</strong></p>
          <p>Email: ${email}</p>
          <p>Location: Latitude ${latitude}, Longitude ${longitude}</p>
          <p>Time: ${new Date().toLocaleString()}</p>
        `,
      }).then(() => {
        console.log("Notification email sent.");
      });
    });
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}
