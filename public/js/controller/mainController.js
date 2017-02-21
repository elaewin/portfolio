'use strict';

(function(module) {
  const mainController = {};

  mainController.hamburgerMenu = () => {
    const $hamburger = $('.main-nav div');
    $hamburger.on('click', function() {
      if($hamburger.hasClass('icon-menu')) {
        $hamburger.toggleClass('icon-cross');
        $('.main-nav ul').toggle();
      }
    });
  };

  mainController.contactLinkHandler = () => {
    $('#email-placeholder').click( function() {
      const username = 'erica.winberry', domain = 'gmail.com';
      window.location.href = 'mailto:' + username + '@' + domain;
    } );
  };

  mainController.hamburgerMenu();
  mainController.contactLinkHandler();

  module.mainController = mainController;
})(window);
