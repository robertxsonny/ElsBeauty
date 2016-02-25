var url = 'https://elsbeauty.com';

$(document).ready(
		function() {
			$('#cashier').hide();
			$('#home').hide('slide', {
				direction : 'left'
			}, 100);
			// check login
			checkLogin();

			$('.navbar-icon a').click(function() {
				var href = $(this).attr('href');
				$('.navbar-icon a').removeClass('active');
				$(this).addClass('active');
				$('.content-main').hide('slide', {
					direction : 'left'
				}, 500);
				window.setTimeout(function() {
					$(href).show('slide', {
						direction : 'right'
					}, 500);
				}, 500);
			});
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
				labels : [ "10:00", "11:00", "12:00", "13:00", "14:00",
						"15:00", "16:00", "17:00" ],
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
				labels : [ "10:00", "11:00", "12:00", "13:00", "14:00",
						"15:00", "16:00", "17:00" ],
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
				labels : [ "10:00", "11:00", "12:00", "13:00", "14:00",
						"15:00", "16:00", "17:00" ],
				datasets : [

						{
							label : "Kemarin",
							fillColor : "rgba(255,255,255,0)",
							strokeColor : "#A7DBD8",
							pointStrokeColor : "#A7DBD8",
							pointFillColor : "#A7DBD8",
							pointHighlightStroke : "#fff",
							pointHighlightFill : "#A7DBD8",
							data : [ 625000, 662000, 385000, 221000, 579000,
									235000, 691000, 672000 ]
						},
						{
							label : "Hari Ini",
							fillColor : "rgba(255,255,255,0)",
							strokeColor : "#69D2E7",
							pointStrokeColor : "#69D2E7",
							pointFillColor : "#69D2E7",
							pointHighlightStroke : "#fff",
							pointHighlightFill : "#69D2E7",
							data : [ 500000, 825000, 330000, 414000, 890000,
									142000, 775000, 482000 ]
						} ]
			};
			var data4 = {
				labels : [ "10:00", "11:00", "12:00", "13:00", "14:00",
						"15:00", "16:00", "17:00" ],
				datasets : [
						{
							label : "Kemarin",
							fillColor : "rgba(255,255,255,0)",
							strokeColor : "#FC9D9A",
							pointStrokeColor : "#FC9D9A",
							pointFillColor : "#FC9D9A",
							pointHighlightStroke : "#fff",
							pointHighlightFill : "#FC9D9A",
							data : [ 12000, 78000, 282000, 312000, 12800,
									91000, 44200, 128000 ]
						},
						{
							label : "Hari Ini",
							fillColor : "rgba(255,255,255,0)",
							strokeColor : "#FE4365",
							pointStrokeColor : "#FE4365",
							pointFillColor : "#FE4365",
							pointHighlightStroke : "#fff",
							pointHighlightFill : "#FE4365",
							data : [ 25000, 130000, 78000, 48000, 211000,
									82000, 121000, 266000 ]
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

			$('#logout').click(
					function() {
						var xmlhr = new XMLHttpRequest();
						xmlhr.open('POST', url
								+ "/functions/logout.php", true);
						xmlhr.onload = function(e) {
							if (xmlhr.readyState == 4) {
								if (xmlhr.status == 200) {
									if(xmlhr.responseText == '1'){
										window.location.reload();
									}
								}
							}
						}
						xmlhr.onerror = function(e) {
							window.location.href = url;
						}
						var data = new FormData();
						data.append('code',
								'866e62bb-5745-4842-a02f-bdfd68132378');
						xmlhr.send(data);
					});

		});

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
					$('#home').show('slide', {
						direction : 'right'
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