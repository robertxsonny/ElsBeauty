<?php
$rootpath = $_SERVER['DOCUMENT_ROOT'];
$dbconn = $rootpath . '/functions/dbConnection.php';
include($dbconn);

if(isset($_POST['username']) && isset($_POST['password']) && isset($_POST['code'])){
	$code = $_POST['code'];
	$name = '';
	if(isset($_POST['name']))
		$name = $_POST['name'];
	if($code === '866e62bb-5745-4842-a02f-bdfd68132378'){
		$username = $_POST['username'];
		$password = $_POST['password'];
		$md5 = md5($password);
		$conn = new mysqli($GLOBALS['servername'], $GLOBALS['dbuser'], $GLOBALS['dbpass'],
				$GLOBALS['dbname']);
		if($conn->connect_error)
			die('Error establishing connection to the database server! Error: ' . $conn->connect_error);
			$query = "INSERT INTO `eb_users`(`username`, `password`,`name`) VALUES ('" . $username ."','" . $md5 ."','" . $name ."')";
			$res = $conn->query($query);
			$class = new stdClass();
			if($res === true){
				$class->username = $username;
				$class->password = $password;
				$class->name = $name;
				$class->status = 1;
			}
			else{
				$class->status = 0;
				$class->desc = 'Unknown error while inserting new admin.';
			}
			$json = json_encode($class);
			echo $json;
			return;
	}
	else 
	{
		$class = new stdClass();
		$class->status = 2;
		$class->desc = 'Token code is wrong!';
		echo json_encode($class);
		return;
	}
}
else{
	$class = new stdClass();
	$class->status = 2;
	$class->desc = 'Token code is wrong!';
	echo json_encode($class);
	return;
}


?>