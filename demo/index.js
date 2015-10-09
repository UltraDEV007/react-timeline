'use strict';

require('purecss');
require('highlight.js/styles/github.css');
require('react-ghfork/gh-fork-ribbon.ie.css');
require('react-ghfork/gh-fork-ribbon.css');
require('./main.css');
require('../style.css');

var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./app.jsx');

main();

function main() {
  var app = document.getElementsByClassName('demonstration')[0];

  ReactDOM.render(<App />, app);
}
