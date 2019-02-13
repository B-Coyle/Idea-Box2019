var ideasArray = [];

var searchInput = document.querySelector('#search-term');
var searchBtn = document.querySelector('.search-btn');

var title = document.querySelector('#title-box');
var body = document.querySelector('#body-box');
var saveBtn = document.getElementById('save-button');
var deleteBtn = document.getElementById('delete-button');

var deleteBtn = document.querySelector('#delete-button')
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


// deleteBtn.addEventListener ('click', function() {
//   deleteCard();
// });

// downvoteBtn.addEventListener ('click', function() {
//   qualityDown();
// })

// upvoteBtn.addEventlistener ('click', function() {
//   qualityUp();
// })


function addCard() {
  var defaultQuality = quality.value || 'Swill';
  console.log(defaultQuality);
  var clone = ideaCardTemplate.content.cloneNode(true);
  clone.getElementById("idea-title").innerText = title.value;
  clone.getElementById("idea-body").innerText = body.value;
  clone.getElementById("idea-quality").innerText = 'Quality: ' + defaultQuality;
  ideaCardArea.insertBefore(clone, ideaCardArea.firstChild);
};

function clearFields() {
  title.value = "";
  body.value = "";
};

function ideaClass() {
  var newIdea = new Idea(title.value, body.value, quality.value, Date.now());
  addCard(newIdea);
  ideasArray.push(newIdea);
  newIdea.saveToStorage(ideasArray);
};

// function deleteCard() {

// }


// local storage is saving/persisting, still needs cards to reload
// window.onload
// get cards from local storage
// parse and append to dom


//counter starts at 0
//increment counter by plus1 each time upvoteButton is clicked
//decrease counter by 1 each time downvoteButton is clicked
//when counter is 0, quality is swill
//when counter is 1, quality is plausible
//when counter is 2, quality is genius
//when counter is > 2, counter is 2
//when counter is < 0, counter is 0


// function in progress to remove card 
ideaCardTemplate.addEventListener('click', function(event) {
  if (event.target.className === '.delete-button') {
      event.target.parentElement.parentElement.remove();
  }
})

///// NOTES FROM REFACTORING THAT MIGHT BE USEFUL

// array.from(document.querySelectorAll) to use array prototype methods
// form fields querySelectorAll for "does have all inputs"
// querying multiple values off the dom creates a node.list not an array
// array.from(ideaFormFields) - array.from creates a new shallow copy from an element that isn't an array

// deleting card with .closest instead of bubbling up through parents manually


