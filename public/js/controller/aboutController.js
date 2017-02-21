'use strict';

(function(module){

  var aboutController = {};

  aboutController.reveal = function(){
    $('.tab-content').hide();
    if($('.main-nav div').hasClass('icon-cross')) {
      $('.main-nav div').removeClass('icon-cross');
      $('.main-nav ul').fadeOut();
    }
    $('#about').fadeIn('slow').scrollTop();
  };

  module.aboutController = aboutController;
})(window);
