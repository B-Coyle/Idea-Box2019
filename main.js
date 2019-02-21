
var ideasArray = JSON.parse(localStorage.getItem('ideasArray')) || [];

var searchInput = document.querySelector('#search-box');
var searchBtn = document.querySelector('.search-btn-container');

var titleInput = document.querySelector('#title-box');
var bodyInput = document.querySelector('#body-box');
var saveBtn = document.getElementById('save-button');

var downvoteBtn = document.querySelector('#downvote-button');
var upvoteBtn = document.querySelector('#upvote-button');
var quality = document.querySelectorAll('#idea-quality');
var qualityValue = document.getElementById('quality-text');
var ideaCardTemplate = document.getElementById('idea-card-template');
var ideaCardArea = document.getElementById('idea-card-area');

var dumbledoreBtn = document.getElementById('dumbledore-filter');
var geniusBtn = document.getElementById('genius-filter');
var plausibleBtn = document.getElementById('plausible-filter');
var swillBtn = document.getElementById('swill-filter');
var riddikulusBtn = document.getElementById('riddikulus-filter');

saveBtn.addEventListener ('click', function(e) {
  e.preventDefault();
  ideaClass();
  clearFields();
});

searchInput.addEventListener('keydown', function() {
  searchIdeaCard();
});

ideaCardArea.addEventListener('keyup', updateText);

ideaCardArea.addEventListener('click', function(event) {
  deleteCard();
  changeQuality(event);
});

dumbledoreBtn.addEventListener('click', function() {
  filterQuality('Dumbledore');
});

geniusBtn.addEventListener('click', function() {
  filterQuality('Genius');
});

plausibleBtn.addEventListener('click', function() {
  filterQuality('Plausible');
});

swillBtn.addEventListener('click', function() {
  filterQuality('Swill');
});

riddikulusBtn.addEventListener('click', function() {
  filterQuality('Riddikulus');
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
  // console.log(clone.getElementById("quality-text"));
  clone.getElementById("quality-text").innerText = newIdea.quality;
  ideaCardArea.insertBefore(clone, ideaCardArea.firstChild);
};

function clearFields() {
  titleInput.value = "";
  bodyInput.value = "";
};

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
   if (ideaToUpdate.quality === 'Riddikulus') {
    qualityText.innerHTML = 'Swill';
    ideaToUpdate.updateQuality('Swill');
  } else if (ideaToUpdate.quality === 'Swill'){
    qualityText.innerHTML = 'Plausible';
    ideaToUpdate.updateQuality('Plausible');
  } else if (ideaToUpdate.quality === 'Plausible') {
    qualityText.innerHTML = 'Genius';
    ideaToUpdate.updateQuality('Genius');
  } else if (ideaToUpdate.quality === 'Genius') {
    qualityText.innerHTML = 'Dumbledore';
    ideaToUpdate.updateQuality('Dumbledore');
  }
  ideaToUpdate.saveToStorage();
}

function downvoteIdea(event) {
  var ideaToUpdate = findIdea(event);
  console.log(ideaToUpdate);
  var qualityText = event.target.closest('.idea-card-bottom').querySelector('#quality-text');
  console.log(qualityText);
   if (ideaToUpdate.quality === 'Dumbledore') {
    qualityText.innerHTML = 'Genius';
    ideaToUpdate.updateQuality('Genius');
  } else if (ideaToUpdate.quality === 'Genius'){
    qualityText.innerHTML = 'Plausible';
    ideaToUpdate.updateQuality('Plausible');
  } else if (ideaToUpdate.quality === 'Plausible') {
    qualityText.innerHTML = 'Swill';
    ideaToUpdate.updateQuality('Swill');
  } else if (ideaToUpdate.quality === 'Swill') {
    qualityText.innerHTML = 'Riddikulus';
    ideaToUpdate.updateQuality('Riddikulus');
  }
  ideaToUpdate.saveToStorage();
}

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

function filterQuality(quality) {
    ideaCardArea.innerHTML = '';
    var filteredQualities = ideasArray.filter(function(idea) {
      return idea.quality === quality;
    });
    filteredQualities.forEach(function(idea) {
      addCard(idea);
    })
};

// function showRecentButtons() {
//   var showMore = document.getElementById('#show-more-btn');
//   var showLess = document.getElementById('#show-less-btn');
//   if (ideaCardTemplate.children.length > 10) {
//     // showMore.style.display = 'block';
//     // showLess.style.display = 'none';
//   }
// }

// function updateShownArray() {
//   var shownArray = Array.from(document.querySelectorAll('.js-idea-card'));
//   shownArray.forEach(function(card, index) {
//     if(index < numCounter) {
//       card.style.display = 'block';
//     } else {
//       card.style.display = 'none';
//     }
//   });
// };
