<?php
function updateStock($barangid, $movement) {
	$conn = new mysqli ( $GLOBALS ['servername'], $GLOBALS ['dbuser'], $GLOBALS ['dbpass'], $GLOBALS ['dbname'] );
	if ($conn->connect_error)
		die ( 'Error establishing connection to the database server! Error: ' . $conn->connect_error );
	$query = 'SELECT * FROM `eb_barang` WHERE `id` = ' . $barangid;
	$res = $conn->query ( $query );
	if ($res->num_rows > 0) {
		while ( $item = $res->fetch_assoc () ) {
			$currentstock = ( float ) $item ['stok'];
			$stok = $currentstock + ( float ) $movement;
			$query2 = 'UPDATE `eb_barang` SET `stok`=' . ( string ) $stok . ' WHERE `id` = ' . $barangid;
			$res2 = $conn->query ( $query2 );
			if ($res2 === true)
				return true;
			else
				return false;
		}
	} else
		return false;
}

?>