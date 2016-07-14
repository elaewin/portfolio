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
/* 1. As the creator, I want the Home and About nav links to act as tabs, so my
      story is revealed FAST.
    * This means your links to NOT navigate to a new page.
    * Instead, your "single page app" shows only the section related to the
      navigation tab that is selected.
    * You can use 'data-' attributes to associate a content section with a
      particular tab
    * Then use jQuery so when the tab is clicked, you hide all the sections,
      then reveal the associated section only.

STRETCH GOALS
1. As a reader, I want any lengthy descriptions truncated to the first paragraph
   so that I can easily scroll though the whole list.
2. As a reader, I want to click the "More" button so that I can expand the
   entire description.
3. As a reader, I want projects filterable by category so that I can review just
   the things that interest me.
*/
