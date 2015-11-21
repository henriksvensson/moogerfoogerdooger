$(function(){
	$('.presetRow').on('click', function(e){
	  window.location = '/preset?presetNumber=' + $(this).data("href");
	});

});
