var url = 'https://elsbeauty.com';

$(document).ready(function(){
	$('.warning').hide();
	$('.wait').hide();
	$('.success').hide();
	$('#loginform').on('submit', function(e){
		login();
		e.preventDefault();
	});
	$('.submit').click(function(){
		login();
	});
});

function login(){
	var xmlhr = new XMLHttpRequest();
	xmlhr.open('POST', url + "/functions/checkLogin.php", true);
	xmlhr.onload = function(e) {
		if (xmlhr.readyState == 4) {
			if (xmlhr.status == 200) {
				var obj = JSON.parse(xmlhr.responseText);
				if (obj.status == 0) {
					$('.wait').hide();
					$('.warning').hide();
					$('.success').show();
					window.setTimeout(function(){
						window.location.href = url;
					}, 2000);
				}
				else {
					$('.wait').hide();
					$('.success').hide();
					$('.warning').show();
				}
			}
		}
	};
	xmlhr.onerror = function(e){
		$('.warning').show();
		$('.success').hide();
	};
	var data = new FormData();
	data.append('username', $('#username').val());
	data.append('password', $('#password').val());
	data.append('code', '866e62bb-5745-4842-a02f-bdfd68132378');
	xmlhr.send(data);
	$('.wait').show();
}