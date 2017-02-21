'use strict';

(function(module) {
  const blogObj = {};

  blogObj.githubData = [];

  blogObj.requestData = callback => {
    const filesUrl = '/github/repos/elaewin/learning_journal_201/contents';
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
      blogObj.sortBlogEntries(blogObj.githubData);
      setTimeout(callback, 1000);
    });
  };

  blogObj.getBlogEntries = current => {
    const regex = /lj_code201_day\d\d\.md/i;
    if(current.name.match(regex)) {
      let newUrl = '/reposReq' + current.url.split('https://api.github.com')[1] + '&sort=name';
      $.ajax({
        url: newUrl,
        success: function(urlData, message, xhr) {
          // console.log(urlData);
          let splitByDate = urlData.split('.md" id="file"')[0].split('201_day')[1];
          let newBlogObj = {
            'classDay': splitByDate,
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

  blogObj.sortBlogEntries = blogEntries => {
    blogEntries.sort(function(a,b) {
      return (b.classDay) - (a.classDay);
    });
  };

  module.blogObj = blogObj;
})(window);
