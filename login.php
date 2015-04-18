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
	switch (trim_input("posttype")) {
		case "session":
			if (isset($_SESSION["curname"])) {
				echo json_encode(array("status" => "return", "username" => $_SESSION["curname"]));
			} else {
				echo json_encode(array("status" => "new", "sid" => $sessionid));
			}

			break;
		case "login":
			$name = trim_input("name");
			$email = trim_input("email");
			$type = trim_input("type");

			if (is_null($name) || is_null($email) || is_null($type)) {
        echo "invalid data";
			}

			//check if this is a return user using login type and email
			$sql = "SELECT * FROM user WHERE logintype='" . $type . "' AND email='" . $email . "'";

			$res = $conn->query($sql);

			if ($res && $res->num_rows != 0) {
				// this is a return user, just return status 'ok' since user's details have
				// already known in front end
				$res = $res->fetch_assoc();
				$_SESSION["curname"] = $res["name"];

				echo json_encode(array("status" => "ok", "username" => $res["name"]));
			} else {
				// this is a new user, we need to insert it into the database first, then
				// add it into the session, finally return status
				$sql = "INSERT INTO user(logintype, name, email) VALUES('" . $type . "','" . $name . "','" . $email . "')";

				$resultQ = $conn->query($sql);
				$_SESSION["curname"] = $name;

				if ($resultQ) {
					echo json_encode(array("status" => "ok"));
				} else {
					echo json_encode(array("status" => "fail", "msg" => printSQLError()));
				}
			}

			break;
		case "logout":
			$email = trim_input("email");

			if ($email == $currentuser) {
				$currentuser = '';
				$return["json"] = "success logged out";
			} else {
				$return["json"] = "logged-in email is not the logged out email.";
			}

			echo json_encode($return);
		case "storeinput":
			$email = $currentuser;
			$input = trim_input("jsoninput");
			$date = trim_input("date");
			$tag = trim_input("tag");
			$setname = trim_input("setname");

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
	if (!isset($_POST[$data])) {
		return null;
	}

	$data = trim($_POST[$data]);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}
