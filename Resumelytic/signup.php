<?php
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $firstName = $_POST["firstName"] ?? '';
  $lastName = $_POST["lastName"] ?? '';
  $username = $_POST["username"] ?? '';
  $email = $_POST["email"] ?? '';
  $contact = $_POST["contact"] ?? '';
  $password = $_POST["password"] ?? '';

  // Validate
  if (empty($firstName) || empty($email) || empty($password)) {
    echo "Please fill all required fields.";
    exit;
  }

  // Hash password ashish
  $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

  // Insert into DB
  $stmt = $conn->prepare("INSERT INTO users (first_name, last_name, username, email, contact, password) VALUES (?, ?, ?, ?, ?, ?)");
  $stmt->bind_param("ssssss", $firstName, $lastName, $username, $email, $contact, $hashedPassword);

  if ($stmt->execute()) {
    echo "success";
  } else {
    if (str_contains($conn->error, 'Duplicate entry')) {
      echo "This email or username is already registered.";
    } else {
      echo "Signup error: " . $conn->error;
    }
  }

  $stmt->close();
  $conn->close();
}
?>
