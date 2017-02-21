'use strict';

(function(module) {

  function Post(opts) {
    Object.keys(opts).forEach(ele => this[ele] = opts[ele]);
  }

  Post.allPosts = [];

  Post.prototype.toHtml = function(scriptTemplateId) {
    let template = Handlebars.compile($(scriptTemplateId).text());
    this.daysAgo = parseInt((new Date() - new Date(this.pubDate))/60/60/24/1000);
    this.publishStatus = this.pubDate ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
    this.body = marked(this.body);
    this.numPerCategory = Post.countPerCategory(this.category).length;
    return template(this);
  };

  Post.loadAll = function(dataPassedIn) {
    Post.allPosts = dataPassedIn.sort(function(a,b) {
      return (new Date(b.pubDate)) - (new Date(a.pubDate));
    }).map(function(obj) {
      return new Post(obj);
    });
  };

  Post.fetchAll = function(nextFunction) {
    if (localStorage.postData) {
      $.ajax({
        url: 'data/postData.json',
        method: 'HEAD',
        success: function(data,response,xhr) {
          let eTag = xhr.getResponseHeader('ETag');
          if(!localStorage.eTag || eTag !== localStorage.eTag) {
            Post.getAllData(nextFunction);
          } else {
            Post.loadAll(JSON.parse(localStorage.postData));
            nextFunction();
          }
        }
      });
    } else {
      Post.getAllData(nextFunction);
    }
  };

  Post.getAllData = function(nextFunction) {
    $.getJSON('data/postData.json', function(data, response, xhr) {
      localStorage.postData = JSON.stringify(data);
      localStorage.eTag = xhr.getResponseHeader('ETag');
      Post.loadAll(data);
      nextFunction();
    });
  };

  Post.countPerCategory = function(categoryToCount) {
    let count = Post.allPosts.map(function(post) {
      return post.category;
    })
    .reduce(function(categoryOfPost, currentCategory) {
      if(currentCategory === categoryToCount) {
        categoryOfPost.push(currentCategory);
      }
      return categoryOfPost;
    }, []);
    return count;
  };

  module.Post = Post;
})(window);
