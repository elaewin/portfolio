'use strict';

(function(module) {

  var mainController = {};

  mainController.hamburgerMenu = function() {
    var $hamburger = $('.main-nav div');
    $hamburger.on('click', function() {
      if($hamburger.hasClass('icon-menu')) {
        $hamburger.toggleClass('icon-cross');
        $('.main-nav ul').toggle();
      }
    });
  };

  mainController.contactLinkHandler = function() {
    $('#email-placeholder').click( function() {
      var username = 'erica.winberry', domain = 'gmail.com';
      window.location.href = 'mailto:' + username + '@' + domain;
    } );
  };

  mainController.hamburgerMenu();
  mainController.contactLinkHandler();

  module.mainController = mainController;
})(window);
