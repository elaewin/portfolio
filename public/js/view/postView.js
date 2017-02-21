'use strict';

(function(module) {

  const postView = {};
  const postOffset = 125; // offset for scrolling to top of closed post/project.

  postView.renderIndexPage = function() {
    Post.allPosts.forEach(function(obj) {
      $('#projects').append(obj.toHtml('#project_template'));
      let $filterContents = $('#category-filter option:contains("' + obj.category + '")');
      if($filterContents.length === 0) {
        $('#category-filter').append(obj.toHtml('#category_filter_template'));
      }
    });
    postView.handleCategoryFilter();
    postView.setTeasers();
    postView.getWordCount();
  };

  postView.handleCategoryFilter = function() {
    $('#category-filter').on('change', function() {
      let $cat = $(this).val();
      if($cat) {
        $('article').hide();
        $('article[data-category="' + $cat + '"]').fadeIn();
      } else {
        $('article').fadeIn();
      }
    });
  };

  postView.setTeasers = function() {
    $('article').each(function() {
      let $postBody = $(this).find('.post_body');
      if(($postBody.children()).length < 2) {
        $(this).find('.read_on').hide();
      }
      $('.post_body *').not(':first-child').hide();
      $(this).removeClass('show');
    });

    $('article a.read_on').on('click', function(event) {
      event.stopPropagation();
      event.preventDefault();
      let $selection = $(event.target).prev();
      if($selection.hasClass('show')) {
        $(event.target).html('Show more &#8594;');
        $('.show *').not(':first-child').slideUp('slow');
        $($selection).removeClass('show');
        $('body').animate({
          scrollTop: $(event.target).parent().offset().top - postOffset
        }, 'slow');
      } else {
        $(event.target).html('&#8592; Show less');
        $selection.addClass('show');
      }
      $('.show *').fadeIn();
    });
  };

  postView.getWordCount = function () {
    let wordCount = Post.allPosts.map(function(post) {
      return post.body.match(/\w+/g).length;
    }). reduce(function(totalCount, currentCount) {
      return totalCount + currentCount;
    });
    $('.word_count').text(wordCount);
  };


  Post.fetchAll(postView.renderIndexPage);
  module.postView = postView;

})(window);
