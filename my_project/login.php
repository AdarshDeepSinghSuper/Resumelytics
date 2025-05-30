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
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Prepare and bind
    $stmt = $conn->prepare("SELECT id, name, email, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result(); // Store the result so we can check the number of rows

    // Check if a user with that email exists
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $name, $email, $hashed_password_from_db);
        $stmt->fetch();

        // Verify the password
        if (password_verify($password, $hashed_password_from_db)) {
            // Password is correct, start a session (optional, but good for user management)
            session_start();
            $_SESSION['user_id'] = $id;
            $_SESSION['user_name'] = $name;
            $_SESSION['user_email'] = $email;

            echo "Login successful! Welcome, " . htmlspecialchars($name) . ". Redirecting to main page...";
            // Redirect to main.html after a short delay
            header("Refresh: 3; url=main.html");
            exit(); // Stop script execution
        } else {
            echo "Invalid password. Please try again.";
        }
    } else {
        echo "No account found with that email. Please <a href='index.html'>register</a>.";
    }

    // Close statement
    $stmt->close();
} else {
    // If someone tries to access login.php directly without a POST request
    echo "Access denied. Please login through the form.";
}

// Close connection
$conn->close();
?>
