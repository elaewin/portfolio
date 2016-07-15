'use strict';

function hamburgerMenu() {
  $('.main-nav div').on('click', function() {
    $(this).toggleClass('icon-cross');
    $('.main-nav ul').toggle();
  });
};

hamburgerMenu();
