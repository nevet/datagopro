<?php

require_once("config.php");

function db_connect() {
  $db = new mysqli(db_host, db_uid, db_pwd, db_name);

  if ($db->connect_errno) // are we connected properly?
    exit("Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error); 

  return $db;
}

function get_auto_id($db) {
  return $db->insert_id;
}

function print_SQL_error($conn) {
  return $conn->errno . ": " . $conn->error . "\n";
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