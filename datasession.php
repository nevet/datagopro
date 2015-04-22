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
        $setname = trim_input("setname");
        $tag = trim_input("tag");
        $date = date("Y-m-d H:i:s");

        if (is_null($input) && is_null($setname) && is_null($tag)) {
          echo json_encode(array("status" => "error", "msg": "no information is retrieved."));
          break;
        }

        if (is_null($inputId)) {
          $sql = "INSERT INTO input(user, jsoninput, date, tag, setname, visitcnt) VALUES($userId,'$input','$date','$tag','$setname',0)";
          $res = $db->query($sql);

          if (!$res) {
            echo json_encode(array("status" => "error", "msg": print_SQL_error()));
          } else {
            echo json_encode(array("status" => "ok", "sid": get_auto_id($db)));
          }
        } else {
          $sql = "SELECT * FROM input WHERE id=$inputId";
          
          $resultQ = $db->query($sql);
          
          if ($resultQ->num_rows > 0) {
            if (!is_null($setname)) {
              $sql = "UPDATE input SET input='$input', date='$date',setname='$setname' WHERE id='$inputId'";
              $res = $db->query($sql);

              if (!$res) {
                echo json_encode(array("status" => "error", "msg": print_SQL_error()));
                break;
              }
            }

            if (!is_null($tag)) {
              $sql = "UPDATE input SET input='$input', date='$date',tag='$tag' WHERE id='$inputId'";
              $res = $db->query($sql);

              if (!$res) {
                echo json_encode(array("status" => "error", "msg": print_SQL_error()));
                break;
              }
            }

            echo json_encode(array("status" => "ok"));
          }
        }

        break;
      case "retrieveInp":
        $inputId = trim_input("id");

        if (!is_null($inputId)) {
          $sql = "SELECT * FROM input WHERE id=$inputId";
          $res = $db->query($sql);

          if (!$res || $res->num_rows > 1) {
            echo array("status" => "error", "msg" => "duplicate input found");
          } else {
            $row = $res->fetch_assoc();

            $setname = $row["setname"];
            $input = $row["jsoninput"];
            $tag = $row["tag"];

            $data = array("setname" => $setname, "input" => $input, "tag" => $tag);

            echo array("status" => "ok", "data" => $data);

            // if current requesting id is different from the associated user's id,
            // we need to increase the visitcnt by 1
            $assocId = $row["user"];

            if (!isset($_SESSION["curuserid"]) || $assocId != $_SESSION["curuserid"]) {
              $visCnt = $row["visitcnt"] + 1;

              $sql = "UPDATE input SET visitcnt=$visCnt WHERE id='$inputId'"
              $res = $db->query($sql);

              if (!$res) {
                echo json_encode(array("status" => "error", "msg": print_SQL_error()));
              }
            }
          }
        }

        break;
      case "retrieveUInp":
        $userId = $_SESSION["curuserid"];

        $sql = "SELECT * FROM input WHERE user=$userId";
        $res = $db->query($sql);

        if (!$res) {
          echo json_encode(array("status" => "error", "msg": print_SQL_error()));
        } else
        if ($res->num_rows > 0) {
          $return = array();

          while ($row = $res->fetch_assoc()) {
            $inputId = $row["id"];
            $setname = $row["setname"];
            $input = $row["jsoninput"];
            $tag = $row["tag"];

            array_push($return, array("id" => $inputId, "setname" => $setname, "input" => $input, "tag" => $tag));
          }

          echo json_encode(array("status" => "ok", "data" => $return));
        }

        break;
      case "retrievePInp":
        $sql = "SELECT * FROM input ORDER BY visitcnt DESC LIMIT 25";
        $res = $db->query($sql);

        if (!$res || $res->num_rows == 0) {
          echo json_encode(array("status" => "error", "msg": print_SQL_error()));
        } else {
          $return = array();

          while ($row = $res->fetch_assoc()) {
            $setname = $row["setname"];
            $input = $row["jsoninput"];
            $tag = $row["tag"];

            array_push($return, array("setname" => $setname, "input" => $input, "tag" => $tag));
          }

          echo json_encode(array("status" => "ok", "data" => $return));
        }
    }
  }
}