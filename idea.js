class Idea {
  constructor(title, body, id) {
    this.title = title;
    this.body = body;
    this.quality = 'Swill';
    this.id = id;
  }
  saveToStorage() {
    localStorage.setItem('ideasArray', JSON.stringify(ideasArray));
  }
  deleteFromStorage() {
    var index = ideasArray.indexOf(this);
    ideasArray.splice(index, 1);
    this.saveToStorage();
  }




  // deleteFromStorage(cardId) {
  //   ideasArray.forEach(function(card, idx) {
  //     console.log(cardId);
  //     if (this.id === cardId) {
  //       ideasArray.splice(idx, 1);
  //     }
  //   localStorage.setItem('ideasArray', JSON.stringify(ideasArray));
  //   })
  // };


  // updateContent() {
  
  // }
  // updateQuality() {

  // }
  
}

