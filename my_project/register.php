<?php
// Database connection parameters
$servername = "localhost"; // Usually "localhost" for XAMPP
$username = "root";        // Default XAMPP username
$password = "";            // Default XAMPP password (empty)
$dbname = "user_management"; // The database name you created in phpMyAdmin

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Hash the password for security
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Prepare and bind
    // Using prepared statements to prevent SQL injection
    $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $hashed_password);

    // Execute the statement
    if ($stmt->execute()) {
        echo "Registration successful! You can now <a href='index.html'>login</a>.";
    } else {
        // Check for duplicate email error
        if ($conn->errno == 1062) { // MySQL error code for duplicate entry
            echo "Error: This email is already registered. Please use a different email or <a href='index.html'>login</a>.";
        } else {
            echo "Error: " . $stmt->error;
        }
    }

    // Close statement
    $stmt->close();
} else {
    // If someone tries to access register.php directly without a POST request
    echo "Access denied. Please register through the form.";
}

// Close connection
$conn->close();
?>
