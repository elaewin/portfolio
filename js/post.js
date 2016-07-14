'use strict';

var postsArray = [];

function Post(source) {
  this.title = source.title;
  this.category = source.category;
  this.pubDate = source.pubDate;
  this.website = source.website;
  this.githubRepo = source.githubRepo;
  this.postContent = source.postContent;
}

Post.prototype.toHtml = function() {
  var $newPost = $('article.template').clone();
  $newPost.find('h2').text(this.title);
  $newPost.attr('category', this.category);
  if(this.website !== '') {
    $newPost.find('.link a').attr('href', this.website);
  } else {
    $newPost.find('.link').addClass('grey');
  };
  if(this.githubRepo !== '') {
    $newPost.find('.repo a').attr('href', this.githubRepo);
  } else {
    $newPost.find('.repo').addClass('grey');
  };
  $newPost.find('.post_body').html(this.postContent);

  // Based on the example from the lab on 7/12.
  $newPost.find('time[pubdate]').attr('title', this.pubDate);
  $newPost.find('time').html('about ' + parseInt((new Date() - new Date(this.pubDate))/60/60/24/1000) + ' days ago');

  $newPost.removeClass('template').addClass('post_content');

  return ($newPost);
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
