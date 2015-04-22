<?php

require_once("config.php");
require_once("utils.php");

$db = db_connect();
$domain = "datagopro.com";

function generate_chars() {
  $num_chars = 5;
  $i = 0;
  $my_keys = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  $keys_length = strlen($my_keys);
  $url  = "";

  while($i < $num_chars) {
    $rand_num = mt_rand(1, $keys_length - 1);
    $url .= $my_keys[$rand_num];
    $i ++;
  }

  return $url;
}

function isUnique($chars) {
  global $db;
  
  $sql = "SELECT * FROM urls WHERE unique_chars='".$chars."'";
  $res = $db->query($sql);

  if (!$res && $res->num_row > 0) {
    return false;
  }

  return true;
}

function hasInput($inputId) {
  global $db;
  
  $sql = "SELECT * FROM urls WHERE input=$inputId";
  $res = $db->query($sql);

  if (!$res && $res->num_row > 0) {
    return true;
  }

  return false;
}

$inputId = trim_input("id");
$tiny = generate_chars();

while (!isUnique($tiny)) {
  $tiny = generate_chars();
}

if (!is_null($inputId) && hasInput($inputId)) {
  // insert (shorturl, inputid) into database
  $sql = "INSERT INTO urls (input, unique_chars) VALUES ($inputId, '$tiny')";

  $res = $db->query($sql);

  if ($res) {
    echo json_encode(array("status" => "ok", "url" => $domain."/".$tiny));
  } else {
    echo json_encode(array("status" => "error", print_SQL_error());
  }
}