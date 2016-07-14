'use strict';

var postView = {};

postView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function() {
    var $selectedTab = $(this).attr('data-content');
    $('section.tab-content').hide();
    $('section.tab-content').each(function() {
      if($(this).attr('id') === $selectedTab) {
        $(this).fadeIn();
      }
    });
  });
  $('.main-nav .tab:first').click();
};

postView.populateFilters = function() {
  $('article').not('.template').each(function() {
    var $category, optionTag;
    $category = $(this).attr('category');
    optionTag = '<option value="' + $category + '">' + $category + '</option>';
    if($('#category-filter option[value="' + $category + '"]').length === 0) {
      $('#category-filter').append(optionTag);
    }
  });
};

postView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if($(this).val()) {
      var $cat = $(this).val();
      $('article').hide();
      $('article').each(function() {
        if ($(this).attr('category') === $cat) {
          $(this).fadeIn();
        }
      });
    } else {
      $('article').not('.template').fadeIn();
    }
  });
};

postView.populateFilters();
postView.handleCategoryFilter();
postView.handleMainNav();
