$(document).ready(function(){

	$('.submenu').click(function() {
		$(this).parent().toggleClass('open');
	})
		$('.title').click(function() {
		$(this).parent().toggleClass('close');
	})

	$('.subNavBtn').each(function() {
		$(this).click(function() {
			var posTop = $($(this).attr('href')).offset().top - $('.topnavi').height() - 5;
			var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
			$body.animate({
				scrollTop: posTop
			}, 2000, 'easeOutCirc');
			return false;
		});
	});


	$(window).scroll( function(){
		if ($(window).scrollTop() > 500){

			
		}
		if ($(window).scrollTop() > $('.header').height()-300){
			$('.topnavi').addClass('fxd');
		} else {
			$('.topnavi').removeClass('fxd');
			$('.TOlogo').removeClass('ffd')
		}
        $('.title, .block_effect').each( function(i){
			var bottom_of_object = $(this).offset().top + ($(this).height()/3 ) ;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > bottom_of_object ){
				$(this).addClass('move');
            }
		}); 
	}).scroll(); 


});
