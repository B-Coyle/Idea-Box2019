
var ideasArray = JSON.parse(localStorage.getItem('ideasArray')) || [];

var searchInput = document.querySelector('#search-term');
var searchBtn = document.querySelector('.search-btn');

var titleInput = document.querySelector('#title-box');
var bodyInput = document.querySelector('#body-box');
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

onload(ideasArray);

function onload(oldIdeas) {
  ideasArray = [];
  oldIdeas.forEach(function(idea) {
    var newIdea = new Idea (idea.title, idea.body, idea.id);
    ideasArray.push(newIdea);
    addCard(newIdea);
  });
};

function ideaClass(idea) {
  var newIdea = idea || new Idea(titleInput.value, bodyInput.value, Date.now());
  addCard(newIdea);
  ideasArray.push(newIdea);
  newIdea.saveToStorage(ideasArray);
};

function addCard(newIdea) {
  var clone = ideaCardTemplate.content.cloneNode(true);
  clone.getElementById("idea-card-js").setAttribute('data-id', newIdea.id);
  clone.getElementById("idea-title").innerText = newIdea.title;
  clone.getElementById("idea-body").innerText = newIdea.body;
  clone.getElementById("idea-quality").innerText = 'Quality: ' + newIdea.quality;
  ideaCardArea.insertBefore(clone, ideaCardArea.firstChild);
};

function clearFields() {
  titleInput.value = "";
  bodyInput.value = "";
};

ideaCardArea.addEventListener('click', function(event) {
  deleteCard();
  changeQualityCounter();
});

function deleteCard() {
  if (event.target.className === 'delete-button') {
    event.target.closest('.idea-card').remove();
    var id = Number(event.target.closest('.idea-card').getAttribute('data-id'));
    var ideaToDelete = ideasArray.find(function(idea) {
      return idea.id === id;
    });
    ideaToDelete.deleteFromStorage();
  }
}

// to edit content in the ideacard
var ideaTitle = document.getElementById('idea-title');
var ideaBody = document.getElementById('idea-body');

ideaTitle.addEventListener('click', function() {
  localStorage.setItem('ideaTitle', this.innerHTML);
  localStorage.setItem('ideaBody', this.innerHTML);
})



var ideaQualityCounter = 0;
function changeQualityCounter() {
  if (event.target.id === 'upvote-button') {
    ideaQualityCounter++;
    if (ideaQualityCounter > 2) {
      ideaQualityCounter = 2;
    }
    console.log(ideaQualityCounter);
  } if (event.target.id === 'downvote-button') {
    ideaQualityCounter--;
    if (ideaQualityCounter < 0) {
      ideaQualityCounter = 0;
    }
    console.log(ideaQualityCounter);
  }
  changeIdeaQuality();
  console.log(quality)
}

function changeIdeaQuality() {
  if (ideaQualityCounter === 0) {
    quality.value = 'Swill';
  } else if (ideaQualityCounter === 1) {
    quality.value = 'Plausible';
  } else if (ideaQualityCounter === 2) {
    quality.value = 'Genius'
}
}




///// NOTES FROM REFACTORING THAT MIGHT BE USEFUL

// array.from(document.querySelectorAll) to use array prototype methods
// form fields querySelectorAll for "does have all inputs"
// querying multiple values off the dom creates a node.list not an array
// array.from(ideaFormFields) - array.from creates a new shallow copy from an element that isn't an array

// deleting card with .closest instead of bubbling up through parents manually