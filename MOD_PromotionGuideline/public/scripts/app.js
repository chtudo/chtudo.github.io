var lastId,
		menuItems,
		scrollItems;

$(document).ready(function() {

	navElement = '.nav-' + $(body).attr('id');

	$(navElement).addClass('open');

	var nav = $("#doc-nav li ul"),
			menuItems = nav.find("li a");

	scrollItems = menuItems.map(function(){

		var item = $($(this).attr("href"));

		if (item.length) { return item; }

	});

	var sideNav = $('#doc-nav'); // Side Navigation
	var sideNavWidth = sideNav.width(); // Width of Side Navigation
	var openNav = $('.open'); // Current Open Navigation Section (or Current Page)
	var navHeight = sideNav.height() + 36; // Side Navigation height plus some padding
	var routerOffset = $('#router').offset().top; // Y Position of the Router Element that stops navigation from being fixed
	var navOffset = sideNav.offset().top; // Y Position of the Side Navigation
	var openNavOffset = openNav.offset().top -10; // Y Position of the Open Element in the side navigation

	// Position Navigation and Highlight Section in view when Window Scrolls

	$(window).scroll(function(){

		routerOffset = $('#router').offset().top;

		var fromTop = $(this).scrollTop();

		// Get id of current scroll item
		var cur = scrollItems.map(function(){

		  if ($(this).offset().top-36 < fromTop)
		  return this;

		});

		// Get the id of the current element

		cur = cur[cur.length-1];

		var id = cur && cur.length ? cur[0].id : "";

		if (lastId !== id) {

			lastId = id;

		  // Set remove active class
		  menuItems.removeClass("active").end().find("[href=#"+id+"]").addClass("active");

		}

		if ($(window).scrollTop() >= openNavOffset && $(window).scrollTop() < routerOffset-navHeight-(navOffset-openNavOffset)) {

	    sideNav.removeAttr('style').css({

				position: 'fixed',

				top: navOffset-openNavOffset,

				width: sideNavWidth

 			});

	  } else if ($(window).scrollTop() >= routerOffset-navHeight-(navOffset-openNavOffset)) {

			sideNav.css({

				position: 'relative',

				top: routerOffset-navOffset-navHeight,

			});

		} else {

	    sideNav.removeAttr('style');
	  }

	});

	// Fade in Videos on load

	$('video').hide(0).fadeIn(500);

	// Play Videos if clicked

	$('video').click(function() {
		$(this).siblings('.video-play, .video-replay').addClass('hidden');
		$(this)[0].play();
	});

	// Play Videos with Controls

	$('.video-play, .video-replay').click(function() {
		$(this).addClass('hidden');
		$(this).siblings('video')[0].play();
	});

	$('video').bind("ended", function() {
		$(this).siblings('.video-play').hide();
		$(this).siblings('.video-replay').show().removeClass('hidden');
	});

	// Animate Scroll to Anchor Links

	$("a[href^=#]").click(function(e) {

		e.preventDefault();

		var dest = $(this).attr('href'); console.log(dest);

		$('html,body').animate({ scrollTop: $(dest).offset().top }, 300);

	});

});
