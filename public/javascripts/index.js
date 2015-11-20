$(function(){
  $('#testbutton').on('click', function(e){
    var parameters = { search: $(this).val() };
      $.get( '/api/getpresets',parameters, function(data) {
       	$('#results').html(data);
    });
 	});

	$('.presetRow').on('click', function(e){
	  window.location = '/preset?presetNumber=' + $(this).data("href");
	});

});
