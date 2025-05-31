<?php
$host = "localhost";
$username = "root";
$password = ""; // Default XAMPP password is empty
$database = "resumelytics";

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>
