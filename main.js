var ideasArray = [];

var searchInput = document.querySelector('#search-term');
var searchBtn = document.querySelector('.search-btn');

var title = document.querySelector('#title-box');
var body = document.querySelector('#body-box');
var saveBtn = document.getElementById('save-button');

var downvoteBtn = document.querySelector('#downvote-button');
var upvoteBtn = document.querySelector('#upvote-button');
var quality = document.querySelectorAll('#idea-quality');
var ideaCardTemplate = document.getElementById('idea-card-template');
var ideaCardArea = document.getElementById('idea-card-area');

saveBtn.addEventListener ('click', function(e) {
  e.preventDefault();
  ideaClass();
  clearFields();
});

function addCard() {
  var clone = ideaCardTemplate.content.cloneNode(true);
  clone.getElementById("idea-title").innerText = title.value;
  clone.getElementById("idea-body").innerText = body.value;
  ideaCardArea.insertBefore(clone, ideaCardArea.firstChild);
};

function clearFields() {
  title.value = "";
  body.value = "";
};

function ideaClass() {
    var newIdea = new Idea(title.value, body.value, 'Swill', Date.now());
    addCard(newIdea);
    ideasArray.push(newIdea);
    newIdea.saveToStorage(ideasArray);
};



// local storage is saving/persisting, still needs cards to reload
// window.onload
// get cards from local storage
// parse and append to dom


//counter starts at 0
//increment counter by plus1 each time upvoteButton is clicked
//decrease counter by 1 each time downvoteButton is clicked
//when counter is 0, quality is swill
//when counter is 1, quality is plaasuible
//when counter is 2, quality is genius
//when counter is > 2, counter is 2
//when counter is < 0, counter is 0
