<?php
$rootpath = $_SERVER ['DOCUMENT_ROOT'];
$dbconn = $rootpath . '/functions/dbConnection.php';
include ($dbconn);
session_start();
if (isset ( $_POST ['username'] ) && isset ( $_POST ['password'] ) && isset ( $_POST ['code'] )) {
	$code = $_POST ['code'];
	if ($code === '866e62bb-5745-4842-a02f-bdfd68132378') {
		$username = $_POST ['username'];
		$password = $_POST ['password'];
		$md5 = md5 ( $password );
		$conn = new mysqli ( $GLOBALS ['servername'], $GLOBALS ['dbuser'], $GLOBALS ['dbpass'], $GLOBALS ['dbname'] );
		if ($conn->connect_error)
			die ( 'Error establishing connection to the database server! Error: ' . $conn->connect_error );
		$query = "SELECT * FROM `eb_users` WHERE `username` = '" . $username . "' AND `password` = '" . $md5 . "'";
		$res = $conn->query ( $query );
		if ($res->num_rows > 0) {
			while ( $item = $res->fetch_assoc () ) {
				$class = new stdClass ();
				$class->id = $item['id'];
				$class->username = $item ['username'];
				$class->name = $item ['name'];
				$class->status = 0;
				//add to session
				$_SESSION['username'] = $item ['username'];
				$_SESSION['md5'] = $item ['password'];
				$_SESSION['time'] = time();
				echo json_encode ( $class );
				return;
			}
		} else {
			$class = new stdClass ();
			$class->status = 1;
			$class->desc = 'Wrong username or password!';
			echo json_encode($class);
			return;
		}
	} else {
		$class = new stdClass ();
		$class->status = 2;
		$class->desc = 'Token code is wrong!';
		echo json_encode ( $class );
		return;
	}
} else {
	$class = new stdClass ();
	$class->status = 2;
	$class->desc = 'Token code is wrong!';
	echo json_encode ( $class );
	return;
}
?>