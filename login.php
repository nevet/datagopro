<?php
$servername = "localhost";
$username = "root";
$password = "7*aIo92d";
$dbname = "datagopro";

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
	$type = trim_input($_POST["type"]);
	
	$sql = "INSERT INTO user(logintype, name, email) VALUES('".$type."','".$name."','".$email."')";

	$resultQ = $conn->query($sql);

  if($resultQ)
  {
    $return["json"] = "success";
    echo json_encode($return);
  }


}

  function trim_input($data) {
   $data = trim($data);
   $data = stripslashes($data);
   $data = htmlspecialchars($data);
   return $data;
  }
