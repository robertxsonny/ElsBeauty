<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="/css/login.css" rel='stylesheet' type='text/css'>
<link href='https://fonts.googleapis.com/css?family=Pinyon+Script'
	rel='stylesheet' type='text/css'>
<link
	href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400italic,300italic,300'
	rel='stylesheet' type='text/css'>
<script src="/js/jquery-2.2.1.min.js"></script>
<script src="/js/jquery-ui.js"></script>
<script src="/js/login.js" type="text/javascript"></script>
<title>ElsBeauty - Login</title>
</head>
<body>
	<form id="loginform">
		<div class="main">
			<div class="title"></div>
			<div class="loginbox">
				<p>Login to Inventory System</p>
				<table class="userdetails">
					<tr>
						<td>Username</td>
						<td><input id="username" type="text" class="input" /></td>
					</tr>
					<tr>
						<td>Password</td>
						<td><input id="password" type="password" class="input" /></td>
					</tr>
					<tr>
						<td colspan="2">
							<button class="submit">Login</button>
						</td>
					</tr>
				</table>
				<div class="success">
					<span></span>
					<p class="text">Berhasil masuk. Mengarahkan...</p>
				</div>
				<div class="wait">
					<span></span>
					<p class="text">Menunggu...</p>
				</div>
				<div class="warning">
					<span></span>
					<p class="text">Username atau password yang Anda masukkan salah!</p>
				</div>
			</div>
		</div>
	</form>
</body>
</html>