'use strict';

(function(module) {

  const postController = {};

  postController.reveal = () => {
    $('.tab-content').hide();
    if($('.main-nav div').hasClass('icon-cross')) {
      $('.main-nav div').removeClass('icon-cross');
      $('.main-nav ul').fadeOut();
    }
    $('#projects').fadeIn('slow').scrollTop();
  };

  module.postController = postController;
})(window);
