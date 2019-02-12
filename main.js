var ideasArray = [];

var searchInput = document.querySelector('#search-term');
var searchBtn = document.querySelector('.search-btn');

var title = document.querySelector('#title-box');
var body = document.querySelector('#body-box');
var saveBtn = document.querySelector('.save-btn');

var downvoteBtn = document.querySelector('#downvote-button');
var upvoteBtn = document.querySelector('#upvote-button');
var quality = document.querySelectorAll('.idea-quality');


// window.onload
// get cards from local storage
// parse and append to dom