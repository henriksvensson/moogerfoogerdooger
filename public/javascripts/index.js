$(function(){
 $('#testbutton').on('click', function(e){
     var parameters = { search: $(this).val() };
       $.get( '/api/searching',parameters, function(data) {
       $('#results').html(data);
     });
 });
});