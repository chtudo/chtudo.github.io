var body, search, searchInput, searchReset, searchSpacer, searchCompletion, recommended, searchSubmit, stickySubnav, filler, lockedNav;
var subnavOffset = {};
var canSearch;

function resetDisplay() {
	if(searchInput.val() === '') {
		searchReset.removeClass('enable');
	} else {
		searchReset.addClass('enable');
		searchSubmit.removeAttr('disabled');
		searchReset.removeAttr('disabled');
	}
}

function clearInput() {
	searchInput.val('');
	searchSpacer.text('');
	searchCompletion.text('');
	recommended.addClass('hidden');
	resetDisplay();

}

function searchFocus() {
	//$('.gh-nav-account').removeClass('logged-in');
	search.addClass('enhance');
	setTimeout(function() {
		searchInput.focus();
		canSearch = true;

	}, 300);
}

function searchBlur() {
	//$('.gh-nav-account').addClass('logged-in');
	clearInput();
	if (search.hasClass('enhance')) {
		search.removeClass('enhance');
		searchSubmit.attr('disabled', 'disabled');
		searchReset.attr('disabled', 'disabled');
	}
	canSearch = false;
}

function globalNav() {
	if (body.hasClass('gh-show-nav')) {
		body.removeClass('gh-show-nav');
		$('.subnav').removeClass('hidden');
	} else {
		body.addClass('gh-show-nav');
		$('#globalheader').addClass('gh-nav-reveal');
		$('.subnav').addClass('hidden');
	}
}

/*function featureTestProperty (prop) {
  var ucProp  = prop.charAt(0).toUpperCase() + prop.slice(1),
      el = document.createElement( 'test' ),
      props   = (prop + ' ' + ['Webkit','Moz','O','ms'].join(ucProp + ' ') + ucProp).split(' ');

  for ( var i in props ) {
    if ( el.style[ props[i] ] !== undefined ) { return props[i]; }
  }
  return false;
}

function featureTestValue( property, value, noPrefixes ) {
  var prop = property + ':',
      el = document.createElement( 'test' ),
      mStyle = el.style;

	if( !noPrefixes ) {
      mStyle.cssText = prop + [ '-webkit-', '-moz-', '-ms-', '-o-', '' ].join( value + ';' + prop ) + value + ';';
  } else {
      mStyle.cssText = prop + value;
  }
  return mStyle[ property ];
}

var supportsSticky = !!featureTestValue('position', 'sticky');
var supportsBackdropFilter = !!featureTestProperty('backdrop-filter');*/

$(document).ready(function() {

	body = $('body');
	search = $('li.gh-nav-search');
	searchInput = $('#gh-search-input');
	searchSubmit = $('#gh-search-submit');
	searchReset = $('#gh-search-reset');
	searchSpacer = $('span.spacer');
	searchCompletion = $('span.completion');
	recommended = $('.recommended');
	canSearch = false;
	/*stickySubnav = $('.sticky');
	if(stickySubnav.length) {
		subnavOffset = stickySubnav.offset().top + 8;
	}
	filler = $('#filler');
	lockedNav = false;*/

	search.click(function() {
		if ($(window).width() > 1024 && canSearch === false) {
			searchFocus();
		}
	});

	searchInput.keyup(resetDisplay);

	searchReset.click(function(event){
		event.preventDefault();
		clearInput();
		searchFocus();
	});

	/* Enhance Header Nav */
	$('#gh-menu-icon-toggle').click(globalNav);

	/* Enhance Footer */
	$('.directorynav .column h3').click(function() {
		if ($(this).hasClass('enhance')) {
			$(this).removeClass('enhance');
		} else {
			$(this).addClass('enhance');
		}
	});

	/* Enhance Sub Nav */
	$('.sub-title').click(function() {
		if ($(this).parent().hasClass('enhance')) {
			$(this).parent().removeClass('enhance');
		} else {
			$(this).parent().addClass('enhance');
			$(this).siblings('ul').addClass('nav-reveal');
		}
	});

	/*if (supportsBackdropFilter) {
		$('.sticky').addClass('blurred-header');
	}*/

	/* Clear File Upload */
	$(".clear-upload").click(function(e) {
		e.preventDefault();
		$(this).siblings('input[type=file]').val('');
		$(this).hide();
	});

	$('input[type=file]').change(function(){
		$(this).siblings('.clear-upload').show();
	});

});

$(window).resize(function() {
	if ($(window).width() < 1024) {
		searchBlur();
		searchSubmit.removeAttr('disabled');
	} else if ($(window).width() > 1024) {
		searchSubmit.attr('disabled', 'disabled');
	}
	if ($(window).width() >= 768) {
		if ($('body').hasClass('gh-show-nav')) {
			$('body').removeClass('gh-show-nav');
		}
		if ($('.subnav').hasClass('enhance')) {
			$('.subnav').removeClass('enhance');
		}
	}
});

$(window).scroll(function( event) {
	if(window.scrollY) {
		if ($('body').hasClass('gh-show-nav')) {
			$('body').removeClass('gh-show-nav');
			$('.subnav').removeClass('hidden');
		}
		if ($('.subnav').hasClass('enhance')) {
			$('.subnav').removeClass('enhance');
		}
	}

	/*if (!supportsSticky && stickySubnav.length) {
		if ($(window).scrollTop() >= subnavOffset) {
			if(!lockedNav){
				$('.sticky').addClass('fixed-header').after("<div id='filler'></div>");
				filler = $('#filler');
				lockedNav = true;
				filler.css("height", $('.subnav').css("height")).css("width", $('.subnav').css("width"));
			}
		} else {
			 $('.sticky').removeClass('fixed-header');
			 filler.remove();
			 lockedNav = false;
		}
	}*/

});

$(document).click(function(event) {
	if (canSearch === true) {
		var target = $(event.target);
		if( !target.is(searchReset) && !target.is(searchInput) && !target.is(search) && !target.is(searchSubmit) ){
			searchBlur();
		}
	}
});
