<?php
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $email = trim($_POST["email"] ?? '');
  $password = $_POST["password"] ?? '';

  if (empty($email) || empty($password)) {
    echo "Missing fields";
    exit;
  }

  $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
  $stmt->bind_param("s", $email);
  $stmt->execute();
  $result = $stmt->get_result();

  if ($user = $result->fetch_assoc()) {
    if (password_verify($password, $user["password"])) {
      header("Location: success.html");
      exit;
    } else {
      echo "Password incorrect (debug)";
      exit;
    }
  } else {
    echo "Email not found (debug)";
    exit;
  }
}
?>
