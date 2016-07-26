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

  mainController.hamburgerMenu();

  module.mainController = mainController;
})(window);
