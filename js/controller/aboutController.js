'use strict';

(function(module){

  var aboutController = {};

  aboutController.reveal = function(){
    console.log('about got clicked!');
    $('section.tab-content').hide();
    // if($('.main-nav div').hasClass('icon-cross')) {
    //   $(this).toggleClass('icon-cross');
    //   $(this).parent().fadeOut();
    // }
    $('#about').fadeIn('slow').scrollTop();
  };

  module.aboutController = aboutController;
})(window);
