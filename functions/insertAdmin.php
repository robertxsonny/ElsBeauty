<?php
$rootpath = $_SERVER['DOCUMENT_ROOT'];
$dbconn = $rootpath . '/functions/dbConnection.php';
include($dbconn);

if(isset($_POST['username']) && isset($_POST['password'])){
	$username = $_POST['username'];
	$password = $_POST['password'];
	$md5 = md5($password);
	$conn = new mysqli($GLOBALS['servername'], $GLOBALS['dbuser'], $GLOBALS['dbpass'],
			$GLOBALS['dbname']);
	if($conn->connect_error)
		die('Error establishing connection to the database server! Error: ' . $conn->connect_error);
	$query = "INSERT INTO `eb_users`(`username`, `password`) VALUES ('" . $username ."','" . $md5 ."')";
	$res = $conn->query($query);
	$class = new stdClass();
	if($res === true){
		$class->username = $username;
		$class->password = $password;
		$class->status = 1;
	}
	else{
		$class->status = 0;
	}
	$json = json_encode($class);
	echo $json;
}


?>