<?php

session_start();

require_once("/api/utils.php");

$sessionid = session_id();

// Create connection
$conn = db_connect();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	switch (trim_input("posttype")) {
		case "session":
			if (isset($_SESSION["tinyInput"])) {
				echo json_encode(array("status" => "tiny", "id" => $_SESSION["tinyInput"]));
				unset($_SESSION["tinyInput"]);
			} else
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
        $_SESSION["curuserid"] = $res["id"];

				echo json_encode(array("status" => "ok", "username" => $res["name"]));
			} else {
				// this is a new user, we need to insert it into the database first, then
				// add it into the session, finally return status
				$sql = "INSERT INTO user(logintype, name, email) VALUES('" . $type . "','" . $name . "','" . $email . "')";

				$resultQ = $conn->query($sql);

				if ($resultQ) {
          $_SESSION["curname"] = $name;
          $_SESSION["curuserid"] = get_auto_id($conn);

					echo json_encode(array("status" => "ok"));
				} else {
					echo json_encode(array("status" => "fail", "msg" => print_SQL_error()));
				}
			}

			break;
		case "logout":
			session_unset();
		default:
			break;
	}
}
