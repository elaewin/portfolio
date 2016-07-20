'use strict';

(function(module) {

  function Post(opts) {
    for (var key in opts) this[key] = opts[key];
  };

  Post.allPosts = [];

  Post.prototype.toHtml = function(scriptTemplateId) {
    var template = Handlebars.compile($(scriptTemplateId).text());
    this.daysAgo = parseInt((new Date() - new Date(this.pubDate))/60/60/24/1000);
    this.publishStatus = this.pubDate ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
    // this.numPerCategory = Post.countPerCategory();
    return template(this);
  };

  Post.loadAll = function(dataPassedIn) {
    Post.allPosts = dataPassedIn.sort(function(a,b) {
      return (new Date(b.pubDate)) - (new Date(a.pubDate));
    }).map(function(obj) {
      return new Post(obj);
    });
  };

  Post.fetchAll = function() {
    if (localStorage.postData) {
      $.ajax({
        url: 'data/postData.json',
        method: 'HEAD',
        success: function(data,response,xhr) {
          var eTag = xhr.getResponseHeader('ETag');
          if(!localStorage.eTag || eTag !== localStorage.eTag) {
            Post.getAllData();
          } else {
            Post.loadAll(JSON.parse(localStorage.postData));
            postView.renderIndexPage();
          }
        }
      });
    } else {
      Post.getAllData();
    }
  };

  Post.getAllData = function() {
    $.getJSON('data/postData.json', function(data, response, xhr) {
      localStorage.postData = JSON.stringify(data);
      localStorage.eTag = xhr.getResponseHeader('ETag');
      Post.loadAll(data);
      postView.renderIndexPage();
    });
  };

  // Working on this, commenting out in order to finish hw assignment
  // Post.countPerCategory = function() {
  //   var count = Post.allPosts.map(function (post) {
  //     return post.category;
  //   });
  //   .reduce(function(categoryOfPost, currentPost, index, array) {
  //     if(categoryOfPost.)
  //   }, []);
  // };

  module.Post = Post;
})(window);
