<?php
session_start();

require_once("utils.php");

$db = db_connect();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $cmd = trim_input($_POST["cmd"]);

  if (is_null($cmd)) {
    echo "empty command";
  } else {
    switch ($cmd) {
      case "upload":
        $inputId = trim_input("id");
        $userId = $_SESSION["curuserid"];
        $input = trim_input("jsoninput");
        $tag = trim_input("tag");
        $setname = trim_input("setname");
        $date = date("Y-m-d H:i:s");

        if (is_null($inputId)) {
          $sql = "INSERT INTO input(user, jsoninput, date, tag, setname, visitcnt) VALUES($userId,'$input','$date','$tag','$setname',0)";
          $res = $conn->query($sql);

          if (!$res) {
            echo json_encode(array("status" => "error", "msg": print_SQL_error()));
          } else {
            echo json_encode(array("status" => "ok", "sid": get_auto_id($db)));
          }
        } else {
          $sql = "SELECT * FROM input WHERE id=$inputId";
          
          $resultQ = $conn->query($sql);
          
          if ($resultQ->num_rows > 0) {
            $sql = "UPDATE input SET input='$input', date='$date',tag='$tag' WHERE id='$inputId'";
            $res = $conn->query($sql);

            if (!$res) {
              echo json_encode(array("status" => "error", "msg": print_SQL_error()));
            } else {
              echo json_encode(array("status" => "ok"));
            }
          }
        }

        break;
      case "retrieve":
        break;
    }
  }
}