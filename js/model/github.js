'use strict';

(function(module) {

  var blogObj = {};

  blogObj.githubData = [];

  blogObj.requestData = function(callback) {
    $.ajax({
      url: 'https://api.github.com/repos/elaewin/learning_journal_201/contents',
      type: 'GET',
      headers: {
        'Authorization': 'token ' + githubToken,
      },
      success: function(fileData, message, xhr) {
        fileData.forEach(function(current) {
          blogObj.getBlogEntries(current, callback);
        });
      }
    });
  };

  blogObj.getBlogEntries = function(current, callback) {
    var regex = /lj_code201_day\d\d\.md/i;
    if(current.name.match(regex)) {
      $.ajax({
        url: current.url + '&sort=name',
        type: 'GET',
        headers: {
          'Accept': 'application/vnd.github.v3.html',
          'Authorization': 'token ' + githubToken,
        },
        success: function(urlData, message, xhr) {
          var newBlogObj = {
            'category': 'CF201',
            'blog_entry': urlData
          };
          blogObj.githubData.push(newBlogObj);
        }
      }).done(callback);
    }
  };

  module.blogObj = blogObj;
})(window);
