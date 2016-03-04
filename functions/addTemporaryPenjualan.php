<?php
$root = $_SERVER ['DOCUMENT_ROOT'];
$dbconn = $root . '/functions/dbConnection.php';
include ($dbconn);

if (isset ( $_POST ['code'] ) && isset ( $_POST ['jsondata'] ) && isset ( $_POST ['total'] ) && isset ( $_POST ['payment'] ) && isset ( $_POST ['change'] ) && isset ( $_POST ['userid'] )) {
	$code = $_POST ['code'];
	if ($code === '866e62bb-5745-4842-a02f-bdfd68132378') {
		$barangs = json_decode ( $_POST ['jsondata'] );
		$totalinst = ( int ) $_POST ['total'];
		$paymentinst = ( int ) $_POST ['payment'];
		$changeinst = ( int ) $_POST ['change'];
		$total = 0;
		for($i = 0; $i < count ( $barangs ); $i ++) {
			$total += $barangs [$i]->hargajual * $barangs [$i]->jumlah;
		}
		$change = $paymentinst - $total;
		if ($total === $totalinst && $change === $changeinst) { // calculation validation
			$conn = new mysqli ( $GLOBALS ['servername'], $GLOBALS ['dbuser'], $GLOBALS ['dbpass'], $GLOBALS ['dbname'] );
			if ($conn->connect_error)
				die ( 'Error establishing connection to the database server! Error: ' . $conn->connect_error );
			$date = date ( 'Y/m/d H:i:s' );
			$query = "INSERT INTO `eb_pending_penjualan`
			(`totalharga`, `bayar`, `kembali`, `tanggal`)
			VALUES (" . ( string ) $total . "," . ( string ) $paymentinst . "," . $change . ",
					'" . $date . "')";
			$res = $conn->query ( $query );
			if ($res === true) {
				$id = $conn->insert_id;
				$summary = true;
				for($i = 0; $i < count ( $barangs ); $i ++) {
					$query2 = "INSERT INTO `eb_pending_queue`
							(`idbarang`, `iduser`, `idpending`, `movement`,
							`currenthargabeli`, `currenthargajual`, `tanggal`)
							VALUES (" . $barangs [$i]->id . "," . $_POST ['userid'] . "," . $id ."," . ($barangs [$i]->jumlah * (- 1)) . ",
							" . $barangs [$i]->hargabeli . "," . $barangs [$i]->hargajual . ",'" . $date . "')";
					$res2 = $conn->query ( $query2 );
					if ($res2 === false) {
						$summary = false;
					}
				}
				if ($summary === true) {
					$class = new stdClass ();
					$class->status = 0;
					$class->desc = 'Berhasil memasukkan seluruh penjualan!';
					echo json_encode ( $class );
					return;
				} else {
					$class = new stdClass ();
					$class->status = 1;
					$class->desc = 'Terjadi kesalahan dalam memasukkan item penjualan!';
					echo json_encode ( $class );
					return;
				}
			} else {
				$class = new stdClass ();
				$class->status = 1;
				$class->desc = 'Terjadi kesalahan dalam memasukkan summary penjualan!';
				echo json_encode ( $class );
				return;
			}
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