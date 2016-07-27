'use strict';

(function(module) {

  var githubObj = {};

  githubObj.ghData = [];

  githubObj.requestData = function(callback) {
    $.ajax({
      url: 'https://api.github.com/repos/elaewin/learning_journal_201/contents',
      type: 'GET',
      headers: {
        'Authorization': 'token ' + githubToken,
      },
      success: function(fileData, message, xhr) {
        fileData.forEach(function(current) {
          var re = 'lj' + (/\w+/);
          if(current.name === re) {
            $.ajax({
              url: current.url,
              type: 'GET',
              headers: {
                'Accept': 'application/vnd.github.v3.raw',
                'Authorization': 'token ' + githubToken,
              },
              success: function(urlData, message, xhr) {
                console.log(urlData);
              }
            });
          }
        });
      }
    });
    console.log(githubObj.ghData);
  };

  githubObj.requestData();

  module.githubObj = githubObj;
})(window);
