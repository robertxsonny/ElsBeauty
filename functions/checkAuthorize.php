<?php
$rootpath = $_SERVER ['DOCUMENT_ROOT'];
$dbconn = $rootpath . '/functions/dbConnection.php';
include ($dbconn);
session_start ();
if (isset ( $_SESSION ['username'] ) && isset ( $_SESSION ['md5'] ) && isset ( $_SESSION ['time'] ) && isset ( $_POST ['code'] )) {
	$code = $_POST ['code'];
	if ($code === '866e62bb-5745-4842-a02f-bdfd68132378') {
		// check session time for 30 min
		if ($_SESSION ['time'] + (30 * 60) < time ()) {
			$class = new stdClass ();
			$class->status = 1;
			$class->desc = 'Session timed out!';
			echo json_encode ( $class );
			return;
		}
		
		$username = $_SESSION ['username'];
		$password = $_SESSION ['md5'];
		$conn = new mysqli ( $GLOBALS ['servername'], $GLOBALS ['dbuser'], $GLOBALS ['dbpass'], $GLOBALS ['dbname'] );
		if ($conn->connect_error)
			die ( "Error establishing database connection! Error: " . $conn->connect_error );
		$query = "SELECT * FROM `eb_users` WHERE `username` = '" . $username . "' AND `password` = '" . $password . "'";
		$res = $conn->query ( $query );
		if ($res->num_rows > 0) {
			while ( $item = $res->fetch_assoc () ) {
				$class = new stdClass ();
				$class->id = $item ['id'];
				$class->username = $item ['username'];
				$class->name = $item ['name'];
				$class->status = 0;
				echo json_encode ( $class );
				return;
			}
		} else {
			$class = new stdClass ();
			$class->status = 1;
			$class->desc = 'Wrong username or password!';
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
} else {
	$class = new stdClass ();
	$class->status = 3;
	$class->desc = "You're not logged in!";
	echo json_encode ( $class );
	return;
}
?>