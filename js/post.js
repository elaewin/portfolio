'use strict';

var postsArray = [];

function Post(opts) {
  for (var key in opts) this[key] = opts[key];
};

Post.prototype.toHtml = function() {
  var source = $('#post_template').html();
  var templateFunction = Handlebars.compile(source);

  // Based on the example from the lab on 7/14.
  this.daysAgo = parseInt((new Date() - new Date(this.pubDate))/60/60/24/1000);
  this.publishStatus = this.pubDate ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

  return templateFunction(this);
};

// Sorts by pubDate, ascending
postData.sort(function(a,b) {
  return (new Date(b.pubDate)) - (new Date(a.pubDate));
});

// Creates new Post objects and pushes them to postsArray.
postData.forEach(function(obj) {
  postsArray.push(new Post(obj));
});

postsArray.forEach(function(post) {
  $('#posts').append(post.toHtml());
});
