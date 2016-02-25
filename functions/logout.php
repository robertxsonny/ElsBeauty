<?php
session_start ();
if(isset($_POST['code'])){
	$code = $_POST['code'];
	if($code == '866e62bb-5745-4842-a02f-bdfd68132378'){
		session_destroy();
		echo true;
	}
	else echo false;
}
else echo false;

return;
?>