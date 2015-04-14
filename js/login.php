<?php
$servername = "localhost";
$username = "root";
$password = "7*aIo92d";
$dbname = "user";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

if($_SERVER["REQUEST_METHOD"] == "GET")
{
	
	
}

