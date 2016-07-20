'use strict';


function Post(opts) {
  for (var key in opts) this[key] = opts[key];
};

Post.allPosts = [];

Post.prototype.toHtml = function(scriptTemplateId) {
  var template = Handlebars.compile($(scriptTemplateId).text());
  this.daysAgo = parseInt((new Date() - new Date(this.pubDate))/60/60/24/1000);
  this.publishStatus = this.pubDate ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  return template(this);
};

Post.loadAll = function(dataPassedIn) {
  dataPassedIn.sort(function(a,b) {
    return (new Date(b.pubDate)) - (new Date(a.pubDate));
  }).forEach(function(obj) {
    Post.allPosts.push(new Post(obj));
  });
};

Post.fetchAll = function() {
  if (localStorage.postData) {
    var retrievedData = JSON.parse(localStorage.postData);
    Post.loadAll(retrievedData);
    postView.renderIndexPage();
  } else {
    $.getJSON('data/postData.json', function(data) {
      localStorage.postData = JSON.stringify(data);
      Post.loadAll(data);
      postView.renderIndexPage();
    });
  }
};
