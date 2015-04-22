<?php

include("utils.php");

$db = db_connect();
$tiny = $_GET["u"];//shortened chars

$sql = "SELECT * FROM urls WHERE unique_chars='$tiny'";
$res = $db->query($sql);

if ($res && $res->num_rows > 0) {
  $row = $res->fetch_assoc();

  header("Location:datasession.php?cmd=retrieveInp&id=".$row["input"]);
} else {
  echo "invalid short url";
}
