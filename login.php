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


$currentuser = '';

if($_SERVER["REQUEST_METHOD"] == "POST")
{
  switch (trim_input($_POST["posttype"])){
    case "login":
                  $name = trim_input($_POST["name"]);
                  $email = trim_input($_POST["email"]);
                  $type = trim_input($_POST["type"]);
                  
                  $sql = "INSERT INTO user(logintype, name, email) VALUES('".$type."','".$name."','".$email."')";

                  $resultQ = $conn->query($sql);

                  if($resultQ)
                  {
                    $currentuser = $email;
                    $return["json"] = "success";
                    echo json_encode($return);
                  } else {
		    echo $conn->errno.": ".$conn->error."\n";
		  }
                  break;
    case "logout":
                  $email = trim_input($_POST["email"]);
                  
		  if ($email == $currentuser)
                  {
                    $currentuser = '';
                    $return["json"] = "success logged out";
                  }
                  else{
                    $return["json"] = "logged-in email is not the logged out email.";
                  }

                  echo json_encode($return);
    case "storeinput":
                  $email = $currentuser;
                  $input = trim_input($_POST["jsoninput"]);
                  $date = trim_input($_POST["date"]);
                  $tag = trim_input($_POST["tag"]);
                  $setname = trim_input($_POST["setname"]);

                  $sql = "SELECT setname FROM input WHERE useremail='".$email."'";
                  $resultQ = $conn->query($sql);
                  if ($resultQ->num_rows>0) {
                    $sql = "UPDATE input SET input='$input', date='$date',tag='$tag' WHERE useremail='$email'";
                    $conn->query($sql);
                  }
                  else
                  {
                    $sql = "INSERT INTO input(useremail, jsoninput, date, tag, setname) VALUES('$email','$input','$date','$tag','$setname')";
                    $conn->query($sql);
                  }

                  echo json_encode("your data has been saved");
                  break;
    default:      
                  break;
  }
	
}

  function trim_input($data) {
   $data = trim($data);
   $data = stripslashes($data);
   $data = htmlspecialchars($data);
   return $data;
  }
