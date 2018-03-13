$(document).ready(function() {

  $('#links .button').click(function() {
    var selected = $(this).data('id');
    $('.block').hide();
    $('#'+selected).show();
  })
});