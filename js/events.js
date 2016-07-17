'use strict';

var pageEvents = {};

pageEvents.hamburgerMenu = function() {
  $('.main-nav div').on('click', function() {
    $(this).toggleClass('icon-cross');
    $('.main-nav ul').toggle();
  });
  //
  // $('.main-nav').on('click', '.tab', function() {
  //   if($);
  // });
};

pageEvents.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function() {
    var $selectedTab = $(this).attr('data-content');
    var $hamburger = $('.main-nav div');
    $('section.tab-content').hide();
    $('section.tab-content[id="' + $selectedTab + '"]').fadeIn('slow');
    if($hamburger.hasClass('icon-cross')) {
      $hamburger.toggleClass('icon-cross');
      console.log($(this).parent());
      $(this).parent().fadeOut();
    }
  });
  $('.main-nav .tab:last').click();
};

pageEvents.hamburgerMenu();
pageEvents.handleMainNav();
