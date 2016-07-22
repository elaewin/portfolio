'use strict';

(function(module) {

  var postView = {};

  postView.hamburgerMenu = function() {
    $('.main-nav div').on('click', function() {
      $(this).toggleClass('icon-cross');
      $('.main-nav ul').toggle();
    });
  };

  postView.handleMainNav = function() {
    $('.main-nav').on('click', '.tab', function(event) {
      var $selectedTab = $(this).attr('data-content');
      var $hamburger = $('.main-nav div');
      $('section.tab-content').hide();
      $('section.tab-content[id="' + $selectedTab + '"]').fadeIn('slow');
      if($hamburger.hasClass('icon-cross')) {
        $hamburger.toggleClass('icon-cross');
        $(this).parent().fadeOut();
      }
    });
    $('.main-nav .tab:last').click();
  };

  postView.renderIndexPage = function() {
    Post.allPosts.forEach(function(obj) {
      $('#posts').append(obj.toHtml('#post_template'));
      var $filterContents = $('#category-filter option:contains("' + obj.category + '")');
      if($filterContents.length === 0) {
        $('#category-filter').append(obj.toHtml('#category_filter_template'));
      }
    });
    postView.hamburgerMenu();
    postView.handleCategoryFilter();
    postView.handleMainNav();
    postView.setTeasers();
    postView.getWordCount();
  };

  postView.handleCategoryFilter = function() {
    $('#category-filter').on('change', function() {
      var $cat = $(this).val();
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
      var $postBody = $(this).find('.post_body');
      if(($postBody.children()).length < 2) {
        $(this).find('.read_on').hide();
      }
      $('.post_body *').not(':first-child').hide();
      $(this).removeClass('show');
    });

    $('article a.read_on').on('click', function(event) {
      event.stopPropagation();
      event.preventDefault();
      var $selection = $(event.target).prev();
      if($selection.hasClass('show')) {
        $(event.target).html('Show more &#8594;');
        $('.show *').not(':first-child').hide();
        $($selection).removeClass('show');
      } else {
        $(event.target).html('&#8592; Show less');
        $selection.addClass('show');
      }
      $('.show *').fadeIn();
    });
  };

  postView.getWordCount = function () {
    var wordCount = Post.allPosts.map(function(post) {
      return post.body.match(/\w+/g).length;
    }). reduce(function(totalCount, currentCount) {
      return totalCount + currentCount;
    });
    $('.word_count').text(wordCount);
  };


  Post.fetchAll();
  module.postView = postView;
  
})(window);
