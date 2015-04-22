<?php
session_start();

require_once("utils.php");

$db = db_connect();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $cmd = trim_input("cmd");

  if (is_null($cmd)) {
    echo "empty command";
  } else {
    switch ($cmd) {
      case "upload":
        $inputId = trim_input("id");
        $userId = isset($_SESSION["curuserid"]) ? $_SESSION["curuserid"] : NULL;
        $input = trim_input("jsoninput");
        $setname = trim_input("setname");
        $tag = trim_input("tag");
        $date = date("Y-m-d H:i:s");

        if (is_null($input) && is_null($setname) && is_null($tag)) {
          // none of the fields are filled
          echo json_encode(array("status" => "error", "msg" => "no information is retrieved."));
          break;
        }

        if (is_null($inputId)) {
          // this is a new entry, insert into the db
          $sql = "INSERT INTO input(user, jsoninput, date, tag, setname, visitcnt) VALUES($userId,'$input','$date','$tag','$setname',0)";
          $res = $db->query($sql);

          if (!$res) {
            echo json_encode(array("status" => "error", "msg" => print_SQL_error($db)));
          } else {
            echo json_encode(array("status" => "ok", "sid" => get_auto_id($db)));
          }
        } else {
          // we've got the input in the database, we need to update whatever fields are made
          $sql = "SELECT * FROM input WHERE id=$inputId";
          $resultQ = $db->query($sql);
          
          if ($resultQ->num_rows > 0) {
            // if input is filled, update input field
            if (!is_null($input)) {
              $sql = "UPDATE input SET jsoninput='$input', date='$date' WHERE id=$inputId";
              $res = $db->query($sql);

              if (!$res) {
                echo json_encode(array("status" => "error", "msg" => print_SQL_error($db)));
                break;
              }
            }

            // if setname is filled, update setname field
            if (!is_null($setname)) {
              $sql = "UPDATE input SET date='$date', setname='$setname' WHERE id=$inputId";
              $res = $db->query($sql);

              if (!$res) {
                echo json_encode(array("status" => "error", "msg" => print_SQL_error($db)));
                break;
              }
            }

            // if tag is filled, update tag field
            if (!is_null($tag)) {
              $sql = "UPDATE input SET date='$date', tag='$tag' WHERE id=$inputId";
              $res = $db->query($sql);

              if (!$res) {
                echo json_encode(array("status" => "error", "msg" => print_SQL_error($db)));
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

              $sql = "UPDATE input SET visitcnt=$visCnt WHERE id='$inputId'";
              $res = $db->query($sql);

              if (!$res) {
                echo json_encode(array("status" => "error", "msg" => print_SQL_error($db)));
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
          echo json_encode(array("status" => "error", "msg" => print_SQL_error($db)));
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
          echo json_encode(array("status" => "error", "msg" => print_SQL_error($db)));
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