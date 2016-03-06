var url = 'https://elsbeauty.com';
var isconnected;
$(document).ready(function() {
	$('#cashier').hide('slide', {
		direction : 'left'
	}, 100);
	$('#home').hide('slide', {
		direction : 'left'
	}, 100);
	$('.loading').hide();
	$('#nosignal').hide();
	$('#connected').hide();
	// check login
	checkLogin();
	window.setInterval(function() {
		checkConnection();
	}, 2000);

	$('#searchtext').keypress(function(e){
		if (e.which == 13) {
			getBarangByName();
		}
	});
	
	$('.reset-button').click(function() {
		if (confirm('Anda yakin akan mengulangi penjualan?')) {
			localStorage.setItem('penjualan', '');
			$('#paymentamount').val('');
			$('#paymentamount').prop('disabled', false);
			$('#change-amount').html((0).formatMoney(2, ',', '.'));
			refreshPenjualan();
		}
	});
	// auto comma
	$('#paymentamount').keypress(function(e) {
		if (e.which == 13) {
			// calculate change
			var totaljson = localStorage.getItem('penjualan');
			var barangs = JSON.parse(totaljson);
			var total = 0;
			for (var i = 0; i < barangs.length; i++) {
				total += barangs[i].hargajual * barangs[i].jumlah;
			}
			var num = Number($(this).val().replace(',', ''));
			var change = num - total;
			$('#change-amount').html(change.formatMoney(2, ',', '.'));
			$('#paymentamount').val(num.formatMoney(2, ',', '.'));
			$('#paymentamount').prop('disabled', true);
			addPenjualan();
		}
	});

	$('.navbar-icon a').click(function() {
		var href = $(this).attr('href');
		$('.navbar-icon a').removeClass('active');
		$(this).addClass('active');
		$('.content-main').hide('slide', {
			direction : 'left'
		}, 500);
		$('.loading').fadeIn('slow');
		window.setTimeout(function() {
			$(href).show('slide', {
				direction : 'right'
			}, 500);

			// preloading items
			if (href == '#cashier') {
				$('#change-amount').html((0).formatMoney(2, ',', '.'));
				$('paymentamount').val('');
				$('#payment-amount').prop('disabled', false);
				getBarangByName();
				refreshPenjualan();
			}

		}, 500);
	});

	drawGraph();
	$('#logout').click(function() {
		var xmlhr = new XMLHttpRequest();
		xmlhr.open('POST', url + "/functions/logout.php", true);
		xmlhr.onload = function(e) {
			if (xmlhr.readyState == 4) {
				if (xmlhr.status == 200) {
					if (xmlhr.responseText == '1') {
						window.location.reload();
					}
				}
			}
		}
		xmlhr.onerror = function(e) {
			window.location.href = url;
		}
		var data = new FormData();
		data.append('code', '866e62bb-5745-4842-a02f-bdfd68132378');
		xmlhr.send(data);
	});

});

function drawGraph() {
	// Change the selector if needed

	// Get the tbody columns width array
	$('.list-table').each(function() {
		var width = $(this).closest('div').map(function() {
			return $(this).width();
		}).get();
		$(this).find('thead tr').children().each(function(i, v) {
			$(v).width(colWidth[i]);
		});
	});

	// Set the width of thead columns

	$("#button-collapse").click(function() {
		$("#left-navbar").slideToggle("fast");
	});
	$(window).resize(function() {
		if ($(window).width() > 768)
			$("#left-navbar").show();
		else
			$("#left-navbar").hide();
	});
	$('.button-tab').click(function() {
		$('.tab-menu .active').each(function() {
			$(this).removeClass('active');
		});
		$(this).addClass('active');
	});
	var chart1 = $("#transaction-chart").get(0).getContext("2d");
	var chart2 = $("#return-chart").get(0).getContext("2d");
	var chart3 = $("#omzet-chart").get(0).getContext("2d");
	var chart4 = $("#profit-chart").get(0).getContext("2d");
	var data1 = {
		labels : [ "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
				"16:00", "17:00" ],
		datasets : [

		{
			label : "Kemarin",
			fillColor : "rgba(158,213,76,0.7)",
			highlightFill : "rgba(158,213,76,1)",
			data : [ 2, 17, 23, 11, 7, 11, 14, 8 ]
		}, {
			label : "Hari Ini",
			fillColor : "rgba(89,168,15,0.7)",
			highlightFill : "rgba(89,168,15,1)",
			data : [ 20, 5, 8, 12, 15, 19, 20, 5 ]
		} ]
	};
	var data2 = {
		labels : [ "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
				"16:00", "17:00" ],
		datasets : [ {
			label : "Kemarin",
			fillColor : "rgba(248,135,46,0.7)",
			highlightFill : "rgba(248,135,46,1)",
			data : [ 0, 0, 0, 1, 0, 0, 1, 0 ]
		}, {
			label : "Hari Ini",
			fillColor : "rgba(252,88,12,0.7)",
			highlightFill : "rgba(252,88,12,1)",
			data : [ 0, 2, 0, 0, 0, 1, 0, 0 ]
		} ]
	};
	var data3 = {
		labels : [ "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
				"16:00", "17:00" ],
		datasets : [

				{
					label : "Kemarin",
					fillColor : "rgba(255,255,255,0)",
					strokeColor : "#A7DBD8",
					pointStrokeColor : "#A7DBD8",
					pointFillColor : "#A7DBD8",
					pointHighlightStroke : "#fff",
					pointHighlightFill : "#A7DBD8",
					data : [ 625000, 662000, 385000, 221000, 579000, 235000,
							691000, 672000 ]
				},
				{
					label : "Hari Ini",
					fillColor : "rgba(255,255,255,0)",
					strokeColor : "#69D2E7",
					pointStrokeColor : "#69D2E7",
					pointFillColor : "#69D2E7",
					pointHighlightStroke : "#fff",
					pointHighlightFill : "#69D2E7",
					data : [ 500000, 825000, 330000, 414000, 890000, 142000,
							775000, 482000 ]
				} ]
	};
	var data4 = {
		labels : [ "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
				"16:00", "17:00" ],
		datasets : [
				{
					label : "Kemarin",
					fillColor : "rgba(255,255,255,0)",
					strokeColor : "#FC9D9A",
					pointStrokeColor : "#FC9D9A",
					pointFillColor : "#FC9D9A",
					pointHighlightStroke : "#fff",
					pointHighlightFill : "#FC9D9A",
					data : [ 12000, 78000, 282000, 312000, 12800, 91000, 44200,
							128000 ]
				},
				{
					label : "Hari Ini",
					fillColor : "rgba(255,255,255,0)",
					strokeColor : "#FE4365",
					pointStrokeColor : "#FE4365",
					pointFillColor : "#FE4365",
					pointHighlightStroke : "#fff",
					pointHighlightFill : "#FE4365",
					data : [ 25000, 130000, 78000, 48000, 211000, 82000,
							121000, 266000 ]
				}

		]
	};
	var ch1 = new Chart(chart1).Bar(data1, {
		responsive : true,
		maintainAspectRatio : true,
		multiTooltipTemplate : "<%= value %> (<%= datasetLabel %>)"
	});
	var ch2 = new Chart(chart2).Bar(data2, {
		responsive : true,
		maintainAspectRatio : true,
		multiTooltipTemplate : "<%= value %> (<%= datasetLabel %>)"
	});
	var ch3 = new Chart(chart3).Line(data3, {
		responsive : true,
		maintainAspectRatio : true,
		bezierCurve : false,
		multiTooltipTemplate : "<%= value %> (<%= datasetLabel %>)"
	});
	var ch4 = new Chart(chart4).Line(data4, {
		responsive : true,
		maintainAspectRatio : true,
		bezierCurve : false,
		multiTooltipTemplate : "<%= value %> (<%= datasetLabel %>)"
	});
}

function checkLogin() {
	var xmlhr = new XMLHttpRequest();
	xmlhr.open('POST', url + "/functions/checkAuthorize.php", true);
	xmlhr.onload = function(e) {
		if (xmlhr.readyState == 4) {
			if (xmlhr.status == 200) {
				var obj = JSON.parse(xmlhr.responseText);
				if (obj.status != 0) {
					window.location.href = url + '/login.php';
				} else {
					localStorage.setItem('userid', obj.id);
					$('#loggedinuser').html(obj.name);
					$('#home').show('slide', {
						direction : 'left'
					}, 500);
				}
			}
		}
	}
	xmlhr.onerror = function(e) {
		window.location.href = url + '/login.php';
	}
	var data = new FormData();
	data.append('code', '866e62bb-5745-4842-a02f-bdfd68132378');
	xmlhr.send(data);
}

function getBarangByName() {
	var xmlhr = new XMLHttpRequest();
	xmlhr.open('POST', url + '/functions/getBarangByName.php');
	xmlhr.onload = function(e) {
		if (xmlhr.readyState == 4) {
			if (xmlhr.status == 200) {
				var barangs = JSON.parse(xmlhr.responseText);
				var html = '<table id="item-add-list" class="list-table">';
				html += '<colgroup><col style="width: 10%;" /><col style="width: 60%;" /><col style="width: 20%;" /></colgroup>';

				for (var i = 0; i < barangs.length; i++) {
					html += '<tr>';
					html += "<td><button class=\"add-button\" id=\"btn-item-add\" onclick=\"addItem("
							+ barangs[i].id
							+ ", '"
							+ barangs[i].namabarang
							+ "', "
							+ barangs[i].hargajual
							+ ", "
							+ barangs[i].hargabeli
							+ ", 'add')\"><i class=\"fa fa-plus\"></i></button></td>";
					html += '<td>' + barangs[i].namabarang + '</td>';
					html += '<td>'
							+ barangs[i].hargajual.formatMoney(2, ',', '.')
							+ '</td>';
					html += '</tr>';
				}
				html += '</table>';
				$('#baranglist').html(html);
				$('.loading').slideToggle('fast');
			}
		}
	};
	xmlhr.onerror = function(e) {
		$('.loading').show();
		$('.loading .progress').hide();
		$('.loading .text').html('Terjadi kesalahan saat memuat barang!');
		window.setTimeout(function() {
			$('.loading').fadeOut('slow');
		}, 2000);
	}
	var data = new FormData();
	data.append('code', '866e62bb-5745-4842-a02f-bdfd68132378');
	data.append('keyword', $('#searchtext').val());
	xmlhr.send(data);
	$('.loading .progress').show();
	$('.loading').show();
}

function addItem(id, name, hargajual, hargabeli, movement) {
	var current = localStorage.getItem('penjualan');
	var array = [];
	if (!current) { // if there is no item
		var obj = {
			"id" : id,
			"name" : name,
			"hargajual" : hargajual,
			"hargabeli" : hargabeli,
			"jumlah" : 1
		};
		array.push(obj);
		localStorage.setItem('penjualan', JSON.stringify(array));
	} else { // if there are items
		var currentobj = JSON.parse(current);
		var exists = false;
		for (var i = 0; i < currentobj.length; i++) {
			if (currentobj[i].id == id) {
				if (movement == "add")
					currentobj[i].jumlah++;
				else if (movement == "remove")
					currentobj[i].jumlah--;
				exists = true;
				break;
			}
		}
		if (exists === false) {
			var obj = {
				"id" : id,
				"name" : name,
				"hargajual" : hargajual,
				"hargabeli" : hargabeli,
				"jumlah" : 1
			};
			currentobj.push(obj);
		}
		localStorage.setItem('penjualan', JSON.stringify(currentobj));
	}
	refreshPenjualan();
}

function changeItem(id, input) {
	var current = localStorage.getItem('penjualan');
	var currentobj = JSON.parse(current);
	for (var i = 0; i < currentobj.length; i++) {
		if (currentobj[i].id == id) {
			currentobj[i].jumlah = input.value;
			break;
		}
	}
	localStorage.setItem('penjualan', JSON.stringify(currentobj));
	refreshPenjualan();
}

function removeItem(id, name) {
	if (confirm('Anda yakin akan menghapus item ' + name + '?')) {
		var current = localStorage.getItem('penjualan');
		var currentobj = JSON.parse(current);
		for (var i = 0; i < currentobj.length; i++) {
			if (currentobj[i].id == id) {
				currentobj.splice(i, 1);
				break;
			}
		}
		localStorage.setItem('penjualan', JSON.stringify(currentobj));
		refreshPenjualan();
	}
}

function refreshPenjualan() {
	var current = localStorage.getItem('penjualan');
	var html = '';
	html += '<table id="item-buy-list" class="list-table">';
	html += '<colgroup><col style="width: 15%" /><col style="width: 50%" /><col style="width: 30%" /><col style="width: 5%" /></colgroup>';
	var total = 0;
	if (current) {
		var barangs = JSON.parse(current);
		for (var i = 0; i < barangs.length; i++) {
			html += '<tr>';
			html += "<td><input onchange=\"changeItem(" + barangs[i].id
					+ ", this)\" type=\"number\" class=\"item-qty\" value=\""
					+ barangs[i].jumlah + "\" /></td>";
			html += '<td>' + barangs[i].name + '<br /> <small>@ '
					+ barangs[i].hargajual.formatMoney(2, ',', '.')
					+ '</small></td>';
			html += '<td>'
					+ (barangs[i].jumlah * barangs[i].hargajual).formatMoney(2,
							',', '.') + '</td>';
			html += "<td><button onclick=\"removeItem("
					+ barangs[i].id
					+ ",'"
					+ barangs[i].name
					+ "')\" class=\"remove-button\" id=\"btn-item-remove\"><i class=\"fa fa-times\"></i></button></td>";
			html += '</tr>';
			total += barangs[i].jumlah * barangs[i].hargajual;
		}
	}
	html += '</table>';
	$('#total-price').html(total.formatMoney(2, ',', '.'));
	$('#orderlist').html(html);
}

function checkConnection() {
	var xmlhr = new XMLHttpRequest();
	xmlhr.open('GET', 'https://elsbeauty.com');
	xmlhr.onload = function(e) {
		if (xmlhr.readyState == 4) {
			if (xmlhr.status == 200) {
				isconnected = true;
				$('#connected').show();
				$('#nosignal').hide();
			} else {
				isconnected = false;
				$('#connected').hide();
				$('#nosignal').show();

			}
		}
	};
	xmlhr.onerror = function(e) {
		isconnected = false;
		$('#connected').hide();
		$('#nosignal').show();
	}
	xmlhr.send();
}

function addPenjualan() {
	var xmlhr = new XMLHttpRequest();
	xmlhr.open('POST', url + '/functions/addPenjualan.php');
	xmlhr.onload = function(e) {
		if (xmlhr.readyState == 4) {
			if (xmlhr.status == 200) {
				var obj = JSON.parse(xmlhr.responseText);
				if (obj.status == '0') {
					alert('Penjualan selesai dilakukan.');
					localStorage.setItem('penjualan', '');
					$('#paymentamount').val('');
					$('#paymentamount').prop('disabled', false);
					$('#change-amount').html((0).formatMoney(2, ',', '.'));
					refreshPenjualan();
				} else {
					alert(obj.status);
					alert(obj.desc);
				}
			}
		}
	};
	var data = new FormData();
	data.append('code', '866e62bb-5745-4842-a02f-bdfd68132378');
	data.append('jsondata', localStorage.getItem('penjualan'));
	var total = $('#total-price').html();
	var payment = $('#paymentamount').val();
	var change = $('#change-amount').html();
	var totalint = total.replace(',00', '');
	var paymentint = payment.replace(',00', '');
	var changeint = change.replace(',00', '');
	while (totalint.indexOf('.') > 0)
		totalint = totalint.replace('.', '');
	while (paymentint.indexOf('.') > 0)
		paymentint = paymentint.replace('.', '');
	while (changeint.indexOf('.') > 0)
		changeint = changeint.replace('.', '');
	data.append('total', totalint);
	data.append('payment', paymentint);
	data.append('change', changeint);
	data.append('userid', localStorage.getItem('userid'));
	xmlhr.send(data);
}