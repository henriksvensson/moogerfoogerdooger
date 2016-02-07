$(function(){
	$('.presetRow').on('click', function(e){
	  window.location = '/preset?presetNumber=' + $(this).data("href");
	});

});

var es = new EventSource("/sse");
es.onmessage = function (event) {
  console.log(event.data);
};