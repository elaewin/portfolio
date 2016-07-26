'use strict';

(function(module) {

  var postController = {};

  postController.reveal = function() {
    $('section.tab-content').hide();
    $('#posts').fadeIn('slow').scrollTop();
  };

  module.postController = postController;
})(window);
