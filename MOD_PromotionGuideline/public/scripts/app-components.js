$(document).ready(function() {
	$('#glance-slider').bxSlider({
		controls: false,
		slideWidth: 136,
		slideMargin: 4,
		onSliderLoad: function(){
			$(".bx-pager" ).clone(true).appendTo(".bx-controls" ).removeClass('bx-default-pager').addClass('small-dots');
			$(".small-dots > .bx-pager-item:first-child .bx-pager-link").addClass('active');
		},
		onSlideAfter: function() {
			$(".small-dots .bx-pager-link").removeClass("active");
			var dot = $('.bx-default-pager .bx-pager-link.active').parent('div').index() + 1;
			$(".small-dots > .bx-pager-item:nth-child(" + dot + ") .bx-pager-link").addClass("active");
		}
	});

	var offsets = ['0', '82', '166', '248', '330', '414', '498', '580', '664', '746', '828', '912', '994', '1078', '1160', '1242', '1326', '1408'];
	$('#watchkit-apps-hero').css({
		'background-position': '0 -' + offsets[Math.floor(Math.random() * offsets.length)] + 'px'
	});

});
