$(function(){
	$('.navmain li').removeClass('on');
	$('#jiekuan').addClass('on');
	$('.navmain li').find('dl').hide();
	$('#jiekuan').find('dl').show();
    $('.navmain li').hover(function(){
		$('.navmain li').find('dl').hide();
	    $(this).find('dl').show();
	},function(){
		$('.navmain li').find('dl').hide();
		$('#jiekuan').find('dl').show();
	});
	$('.mlist li').hover(function(){
		$(this).css('background-color','#fffaef');
    },function(){
		$(this).css('background-color','#f9f9f9');
	});
	$('.colorcg2').hover(function(){
		$(this).removeClass('colorcg2').addClass('colorcg');
	},function(){
		$(this).removeClass('colorcg').addClass('colorcg2');
	});
});