$(document).ready(function() {

  var hash = window.location.hash;
  if (hash && $(hash).length) {
    openSection(hash);
  }

  $('#links .button').click(function() {
    var selected = '#'+$(this).data('id');
    openSection(selected);
  })
});

function openSection(id, heading) {
  $('.block').hide();
  $(id).show();
  window.location.hash = id.substring(1);
  if (!heading) {
    $(window).scrollTop(0);
  } else {
    $(window).scrollTop($("#"+heading).offset().top-30);
  }
}