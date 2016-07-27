'use strict';

(function(module) {
  var githubView = {};

  var blogCompiler = Handlebars.compile($('#blog-template').text());

  githubView.renderBlogEntry = function() {
    $('#blog').empty().append(
      githubObj.ghData.map(blogCompiler)
    );
  };

  module.githubView = githubView;
})(window);
