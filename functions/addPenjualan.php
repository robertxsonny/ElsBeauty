<?php
$root = $_SERVER ['DOCUMENT_ROOT'];
$dbconn = $root . '/functions/dbConnection.php';
include ($dbconn);

if (isset ( $_POST ['code'] )) {
	$code = $_POST['code'];
	if ($code === '866e62bb-5745-4842-a02f-bdfd68132378') {
		
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