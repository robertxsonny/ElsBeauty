<?php
$root = $_SERVER ['DOCUMENT_ROOT'];
$dbconn = $root . '/functions/dbConnection.php';
$updatestock = $root . '/functions/updateStock.php';
include ($dbconn);
include ($updatestock);

if (isset ( $_POST ['code'] ) && isset ( $_POST ['jsondata'] ) && isset ( $_POST ['total'] ) && isset ( $_POST ['payment'] ) && isset ( $_POST ['change'] ) &&
		isset($_POST['userid'])) {
	$code = $_POST ['code'];
	if ($code === '866e62bb-5745-4842-a02f-bdfd68132378') {
		$barangs = json_decode ( $_POST ['jsondata'] );
		$totalinst = ( float ) $_POST ['total'];
		$paymentinst = ( float ) $_POST ['payment'];
		$changeinst = ( float ) $_POST ['change'];
		$userid = $_POST['userid'];
		$total = 0;
		for($i = 0; $i < count ( $barangs ); $i ++) {
			$total += $barangs [$i]->hargajual * (float) $barangs [$i]->jumlah;
		}
		$change = $paymentinst - $total;
		if ($total === $totalinst && $change === $changeinst) { // calculation validation
			$conn = new mysqli ( $GLOBALS ['servername'], $GLOBALS ['dbuser'], $GLOBALS ['dbpass'], $GLOBALS ['dbname'] );
			if ($conn->connect_error)
				die ( 'Error establishing connection to the database server! Error: ' . $conn->connect_error );
			$date = date('Y/m/d H:i:s');
			$query = "INSERT INTO `eb_total_penjualan`
			(`totalharga`, `bayar`, `kembali`, `tanggal`) 
			VALUES (" . (string) $total ."," . (string)$paymentinst ."," . $change . ",
					'" . $date ."')";
			$res = $conn->query($query);
			if($res === true){
				$id = $conn->insert_id;
				$summary = true;
				for ($i = 0; $i < count($barangs); $i++) {
					$query2 = "INSERT INTO `eb_penjualan`
							(`idbarang`, `iduser`, `idpenjualan`, `jumlah`, 
							`currenthargabeli`, `currenthargajual`, `tanggal`) 
							VALUES (" . $barangs[$i]->id ."," . $userid ."," . $id ."," . $barangs[$i]->jumlah .",
							" . $barangs[$i]->hargabeli ."," . $barangs[$i]->hargajual .",'" . $date . "')";
					$res2 = $conn->query($query2);
					if($res2 === false || updateStock($barangs[$i]->id, ($barangs[$i]->jumlah* -1)) === false){
						$summary = false;
					}
				}
				if($summary === true){
					$class = new stdClass ();
					$class->status = 0;
					$class->desc = 'Berhasil memasukkan seluruh penjualan!';
					echo json_encode ( $class );	
					return;
				}
				else{
					$class = new stdClass ();
					$class->status = 1;
					$class->desc = 'Terjadi kesalahan dalam memasukkan item penjualan!';
					echo json_encode ( $class );
					return;
				}
			}
			else{
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
	$class->status = 3;
	$class->desc = 'Incomplete data!';
	echo json_encode ( $class );
	return;
}

?>