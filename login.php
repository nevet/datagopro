<?php

session_start();

$sessionid = session_id();

$servername = "localhost";
$username = "root";
$password = "7*aIo92d";
$dbname = "datagopro";

function printSQLError() {
	return $conn->errno . ": " . $conn->error . "\n";
}

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	switch (trim_input($_POST["posttype"])) {
		case "session":
			// $sql = "SELECT * FROM user WHERE sessionid='" . $sessionid . "'";
			// $res = $conn->query($sql);
			$res = isset($_SESSION["curuser"]);

			if ($res) {
				// session still valid, return the user details back to front end
				// $res = $res->fetch_assoc();
				// $_SESSION["curuser"] = $res["name"];

				// echo json_encode($return);
				echo json_encode(array("status" => "return", "username" => $_SESSION["curuser"]));
			} else {
				echo json_encode(array("status" => "new"));
			}

			break;
		case "login":
			$name = trim_input($_POST["name"]);
			$email = trim_input($_POST["email"]);
			$type = trim_input($_POST["type"]);

			//check if this is a return user using login type and email
			$sql = "SELECT * FROM user WHERE logintype='" . $type . "' AND email='" . $email . "'";

			$res = $conn->query($sql);

			// set curuser in session to current name regardless of new or return user
			$_SESSION["curuser"] = $res["name"];

			if ($res) {
				// this is a return user, just return status 'ok' since user's details have
				// already known in front end
				$res = $res->fetch_assoc();

				echo json_encode(array("status" => "ok"));
			} else {
				// this is a new user, we need to insert it into the database first, then
				// return status
				$sql = "INSERT INTO user(logintype, name, email) VALUES('" . $type . "','" . $name . "','" . $email . "')";

				$resultQ = $conn->query($sql);

				if ($resultQ) {
					echo json_encode(array("status" => "ok"));
				} else {
					echo json_encode(array("status" => "fail", "msg" => printSQLError()));
				}
			}

			break;
		case "logout":
			$email = trim_input($_POST["email"]);

			if ($email == $currentuser) {
				$currentuser = '';
				$return["json"] = "success logged out";
			} else {
				$return["json"] = "logged-in email is not the logged out email.";
			}

			echo json_encode($return);
		case "storeinput":
			$email = $currentuser;
			$input = trim_input($_POST["jsoninput"]);
			$date = trim_input($_POST["date"]);
			$tag = trim_input($_POST["tag"]);
			$setname = trim_input($_POST["setname"]);

			$sql = "SELECT setname FROM input WHERE useremail='" . $email . "'";
			$resultQ = $conn->query($sql);
			if ($resultQ->num_rows > 0) {
				$sql = "UPDATE input SET input='$input', date='$date',tag='$tag' WHERE useremail='$email'";
				$conn->query($sql);
			} else {
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
