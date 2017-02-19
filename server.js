'use strict';

const pg = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const requestProxy = require('express-request-proxy');

const port = process.env.PORT || 3000;
const app = express();

const conString = process.env.DATABASE_URL || 'postgres://localhost:5432';
const client = new pg.Client(conString);
client.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));

var proxyGitHub = function(request, response) {
  console.log('Routing GitHub request for', request.params[0]);
  (
    requestProxy({
      url: 'https://api.github.com/' + request.params[0],
      headers: {
        Authorization: 'token ' + process.env.GITHUB_TOKEN
      }
    })
  )(request, response);
};

var proxy2 = function(request, response) {
  console.log('Routing GitHub request for', request.params[0]);
  (
    requestProxy({
      url: 'https://api.github.com/' + request.params[0],
      headers: {
        Authorization: 'token ' + process.env.GITHUB_TOKEN,
        Accept: 'application/vnd.github.v3.html'
      }
    })
  )(request, response);
};

app.get('/github/*', proxyGitHub);
app.get('/reposReq/*', proxy2);

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', {root: '.'});
});

app.listen(port, function() {
  console.log('Server started on port', port);
});
