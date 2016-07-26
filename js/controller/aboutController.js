'use strict';

(function(module){

  var aboutController = {};

  aboutController.reveal = function(){
    $('section.tab-content').hide();
    $('#about').fadeIn();
  };

  module.aboutController = aboutController;
})(window);
