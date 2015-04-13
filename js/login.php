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

if($_SERVER["REQUEST_METHOD"] == "POST")
{
	$name = trim_input($_POST["name"]);
	$email = trim_input($_POST["email"]);
	$type = trim_input($_POST["email"]);
	
	$sql = "INSERT INTO user(logintype, name, email) VALUES('".$type."',".$name.",".$email.")";

	$conn->query($sql);	
}

  function trim_input($data) {
   $data = trim($data);
   $data = stripslashes($data);
   $data = htmlspecialchars($data);
   return $data;
  }
