'use strict';

(function(module) {

  var githubObj = {};

  githubObj.ghData = [];

  githubObj.requestData = function(callback) {
    $.ajax({
      url: 'https://api.github.com/repos/elaewin/learning_journal_201',
      type: 'GET',
      headers: {
        // 'Accept': 'application/vnd.github.v3.raw',
        'Authorization': 'token ' + githubToken,
      },
      success: function(data, message, xhr) {
        console.log(data);
      }
    });
  };

  githubObj.requestData();

  module.githubObj = githubObj;
})(window);
