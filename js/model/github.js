'use strict';

(function(module) {

  var blogObj = {};

  blogObj.githubData = [];

  blogObj.requestData = function(callback) {
    var filesUrl = '/github/repos/elaewin/learning_journal_201/contents';
    $.ajax({
      url: filesUrl,
      success: function(fileData, message, xhr) {
        fileData.forEach(function(current) {
          blogObj.getBlogEntries(current);
        });
      },
      method: 'GET',
      async: true,
    }).done(function() {
      setTimeout(callback, 1000);
    });
  };

  blogObj.getBlogEntries = function(current) {
    var regex = /lj_code201_day\d\d\.md/i;
    if(current.name.match(regex)) {
      var newUrl = '/reposReq' + current.url.split('https://api.github.com')[1] + '&sort=name';
      $.ajax({
        url: newUrl,
        success: function(urlData, message, xhr) {
          console.log(newUrl);
          var newBlogObj = {
            'category': 'CF201',
            'blog_entry': urlData
          };
          blogObj.githubData.push(newBlogObj);
        },
        method: 'GET',
        async: true
      });
    }
  };

  // blogObj.requestData = function(callback) {
  //   $.get('/github/repos/elaewin/learning_journal_201/contents')
  //   .done(function(fileData, message, xhr) {
  //     fileData.forEach(function(current) {
  //       blogObj.getBlogEntries(current, callback);
  //     });
  //   });
  // };
  //
  // blogObj.getBlogEntries = function(current, callback) {
  //   var regex = /lj_code201_day\d\d\.md/i;
  //   if(current.name.match(regex)) {
  //     $.get('/reposReq' + current.url.split('https://api.github.com')[1] + '&sort=name').done(function(urlData, message, xhr) {
  //       var newBlogObj = {
  //         'category': 'CF201',
  //         'blog_entry': urlData
  //       };
  //       blogObj.githubData.push(newBlogObj);
  //     });
  //   }
  // };

  module.blogObj = blogObj;
})(window);
