
var ideasArray = JSON.parse(localStorage.getItem('ideasArray')) || [];

var searchInput = document.querySelector('#search-box');
var searchBtn = document.querySelector('.search-btn-container');

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

ideaCardArea.addEventListener('keyup', updateText);

saveBtn.addEventListener ('click', function(e) {
  e.preventDefault();
  ideaClass();
  clearFields();
});

searchInput.addEventListener('keydown', function() {
  searchIdeaCard();
});

onload(ideasArray);

function onload(oldIdeas) {
  ideasArray = [];
  oldIdeas.forEach(function(idea) {
    var newIdea = new Idea (idea.title, idea.body, idea.quality, idea.id);
    ideasArray.push(newIdea);
    addCard(newIdea);
  });
};

function ideaClass(idea) {
  var newIdea = idea || new Idea(titleInput.value, bodyInput.value, 'Swill', Date.now());
  addCard(newIdea);
  ideasArray.push(newIdea);
  newIdea.saveToStorage(ideasArray);
};

function addCard(newIdea) {
  var clone = ideaCardTemplate.content.cloneNode(true);
  clone.getElementById("idea-card-js").setAttribute('data-id', newIdea.id);
  clone.getElementById("idea-title").innerText = newIdea.title;
  clone.getElementById("idea-body").innerText = newIdea.body;
  console.log(clone.getElementById("quality-text"));
  clone.getElementById("quality-text").innerText = newIdea.quality;
  ideaCardArea.insertBefore(clone, ideaCardArea.firstChild);
};

function clearFields() {
  titleInput.value = "";
  bodyInput.value = "";
};

ideaCardArea.addEventListener('click', function(event) {
  deleteCard();
  changeQuality(event);
  // changeQualityCounter();
});

function deleteCard() {
  if (event.target.className === 'delete-button') {
    event.target.closest('.idea-card').remove();
    var ideaToDelete = findIdea(event);
    ideaToDelete.deleteFromStorage();
  }
}

function updateText(e) {
  var ideaToUpdate = findIdea(event);
  if (e.target.id === 'idea-title') {
    ideaToUpdate.title = e.target.innerHTML;
  }
  if (e.target.id === 'idea-body') {
    ideaToUpdate.body = e.target.innerHTML;
  }
  ideaToUpdate.saveToStorage();
}

function findIdea(event) {
  var id = Number(event.target.closest('.idea-card').getAttribute('data-id'));
  return ideasArray.find(function(idea) {
    return idea.id === id;
  });
}

function changeQuality(event) {
  if (event.target.id === 'upvote-button') {
    upvoteIdea(event);
  }
  if (event.target.id === 'downvote-button') {
    downvoteIdea(event);
  }
}

function upvoteIdea(event) {
  var ideaToUpdate = findIdea(event);
  console.log(ideaToUpdate);
  var qualityText = event.target.closest('.idea-card-bottom').querySelector('#quality-text');
  console.log(qualityText);
  if (ideaToUpdate.quality === 'Swill'){
    qualityText.innerHTML = 'Plausible';
    ideaToUpdate.updateQuality('Plausible');
  } else if (ideaToUpdate.quality === 'Plausible') {
    qualityText.innerHTML = 'Genius';
    ideaToUpdate.updateQuality('Genius');
  }
  ideaToUpdate.saveToStorage();
}

function downvoteIdea(event) {
  var ideaToUpdate = findIdea(event);
  console.log(ideaToUpdate);
  var qualityText = event.target.closest('.idea-card-bottom').querySelector('#quality-text');
  console.log(qualityText);
  if (ideaToUpdate.quality === 'Genius'){
    qualityText.innerHTML = 'Plausible';
    ideaToUpdate.updateQuality('Plausible');
  } else if (ideaToUpdate.quality === 'Plausible') {
    qualityText.innerHTML = 'Swill';
    ideaToUpdate.updateQuality('Swill');
  }
  ideaToUpdate.saveToStorage();
}

// var ideaQualityCounter = 0;
// function changeQualityCounter() {
//   if (event.target.id === 'upvote-button') {
//     ideaQualityCounter++;
//     if (ideaQualityCounter > 2) {
//       ideaQualityCounter = 2;
//     }
//     console.log(ideaQualityCounter);
//   } if (event.target.id === 'downvote-button') {
//     ideaQualityCounter--;
//     if (ideaQualityCounter < 0) {
//       ideaQualityCounter = 0;
//     }
//     console.log(ideaQualityCounter);
//   }
//   changeIdeaQuality();
//   console.log(quality)
// }

// function changeIdeaQuality() {
//   if (ideaQualityCounter === 0) {
//     quality.value = 'Swill';
//   } else if (ideaQualityCounter === 1) {
//     quality.value = 'Plausible';
//   } else if (ideaQualityCounter === 2) {
//     quality.value = 'Genius'
// }
// };

function searchIdeaCard() {
    ideaCardArea.innerHTML = '';
    var filteredIdeas = ideasArray.filter(function(idea) {
      return idea.body.toLowerCase().includes(searchInput.value) || idea.title.toLowerCase().includes(searchInput.value);
    });
    filteredIdeas.forEach(function(idea) {
      addCard(idea);
    })
};

function clearSearch() {
    searchInput.value = ''
};



///// NOTES FROM REFACTORING THAT MIGHT BE USEFUL

// array.from(document.querySelectorAll) to use array prototype methods
// form fields querySelectorAll for "does have all inputs"
// querying multiple values off the dom creates a node.list not an array
// array.from(ideaFormFields) - array.from creates a new shallow copy from an element that isn't an array

// deleting card with .closest instead of bubbling up through parents manually