'use strict';

(function(module){
  const blogController = {};

  blogController.reveal = () => {
    $('.tab-content').hide();
    if($('.main-nav div').hasClass('icon-cross')) {
      $('.main-nav div').removeClass('icon-cross');
      $('.main-nav ul').fadeOut();
    }
    $('#blog').fadeIn('slow').scrollTop();
  };

  module.blogController = blogController;
})(window);
