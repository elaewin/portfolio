'use strict';

(function(module) {
  var blogView = {};

  var blogCompiler = function(obj) {
    var template = Handlebars.compile($('#blog-template').html());
    return template(obj);
  };

  blogView.renderBlogEntry = function() {
    $('#blog').empty().append(
      blogObj.githubData.map(blogCompiler)
    );
    blogView.cleanUpHtml();
    // blogView.setTeasers();
  };

  blogView.cleanUpHtml = function() {
    $('#blog div').removeAttr('id');
    $('h2 a').remove();
    $('h3 a').remove();
    $('h5 a').remove();
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  };

  // blogView.setTeasers = function() {
  //   $('article').each(function() {
  //     var $blogBody = $(this).find('div');
  //     if(($blogBody.children()).length < 2) {
  //       $(this).find('.read_on').hide();
  //     }
  //     $('div *').not(':first-child').hide();
  //     $(this).removeClass('show');
  //   });
  //
  //   $('article a.read_on').on('click', function(event) {
  //     event.stopPropagation();
  //     event.preventDefault();
  //     var $selection = $(event.target).prev();
  //     if($selection.hasClass('show')) {
  //       $(event.target).html('Show more &#8594;');
  //       $('.show *').not(':first-child').hide();
  //       $($selection).removeClass('show');
  //     } else {
  //       $(event.target).html('&#8592; Show less');
  //       $selection.addClass('show');
  //     }
  //     $('.show *').fadeIn();
  //   });
  // };

  blogObj.requestData(blogView.renderBlogEntry);

  module.blogView = blogView;
})(window);
