'use strict';

(function(module) {
  const blogView = {};
  const blogOffset = 125;

  let blogCompiler = function(obj) {
    let template = Handlebars.compile($('#blog-template').html());
    return template(obj);
  };

  blogView.renderBlogEntry = function() {
    $('#blog div').empty().append(
      blogObj.githubData.map(blogCompiler)
    );
    blogView.cleanUpHtml();
    blogView.setTeasers();
  };

  blogView.cleanUpHtml = function() {
    $('#blog div').removeAttr('id');
    $('h2 a').remove();
    $('h3 a').remove();
    $('h5 a').remove();
    $('#blog svg').remove();
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  };

  blogView.setTeasers = function() {
    $('.announce article').each(function() {
      let $blogBody = $(this).find('.announce article');
      if(($blogBody.children()).length < 3) {
        $(this).find('.read_on').hide();
      }
      $('.announce article p').nextAll().hide();
      $(this).removeClass('show');
    });

    $('a.read_more').on('click', function(event) {
      event.stopPropagation();
      event.preventDefault();
      let $selection = $(event.target).prev();
      if($selection.hasClass('show')) {
        $(event.target).html('Show more &#8594;');
        $('.announce article p').nextAll().slideUp('slow');
        $($selection).removeClass('show');
        $('body').animate({
          scrollTop: $(event.target).parent().offset().top - blogOffset
        }, 'slow');
      } else {
        $(event.target).html('&#8592; Show less');
        $selection.addClass('show');
      }
      $('.show *').fadeIn();
    });
  };

  blogObj.requestData(blogView.renderBlogEntry);

  module.blogView = blogView;
})(window);
