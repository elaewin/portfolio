'use strict';

(function(module) {
  var githubView = {};

  var blogCompiler = function(obj) {
    var template = Handlebars.compile($('#blog-template').html());
    return template(obj);
  };

  githubView.renderBlogEntry = function() {
    $('#blog').empty().append(
      githubObj.ghData.map(blogCompiler)
    );
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  };

  githubObj.requestData(githubView.renderBlogEntry);

  module.githubView = githubView;
})(window);
