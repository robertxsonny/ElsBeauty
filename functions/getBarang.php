<?php
$root = $_SERVER ['DOCUMENT_ROOT'];
$dbconn = $root . '/functions/dbConnection.php';
include ($dbconn);

if (isset ( $_POST ['code'] )) {
	$code = $_POST ['code'];
	if ($code === '866e62bb-5745-4842-a02f-bdfd68132378') {
		$conn = new mysqli ( $GLOBALS ['servername'], $GLOBALS ['dbuser'], $GLOBALS ['dbpass'], $GLOBALS ['dbname'] );
		if ($conn->connect_error)
			die ( 'Error establishing connection to the database server! Error: ' . $conn->connect_error );
		$query = "SELECT `id`, `namabarang`, `description`, `stok`, `hargabeli`, `hargajual`, `iduser`, `username`, `name` FROM `eb_barang_with_users`";
		$res = $conn->query ( $query );
		$ret = array ();
		if ($res->num_rows > 0) {
			while ( $item = $res->fetch_assoc () ) {
				$class = new stdClass ();
				$class->id = ( int ) $item ['id'];
				$class->namabarang =  $item ['namabarang'];
				$class->description = $item ['description'];
				$class->stok = ( float ) $item ['stok'];
				$class->hargabeli = ( float ) $item ['hargabeli'];
				$class->hargajual = ( float ) $item ['hargajual'];
				$class->iduser = ( int ) $item ['iduser'];
				$class->username = $item ['username'];
				$class->name = $item ['name'];
				array_push($ret, $class);
			}
		}
		
		$json = json_encode ( $ret );
		echo $json;
		return;
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