class Idea {
  constructor(title, body, quality, id) {
    this.title = title;
    this.body = body;
    this.quality = quality || 'Swill';
    this.id = id;
  }
  saveToStorage() {
    localStorage.setItem('ideasArray', JSON.stringify(ideasArray));
  }
  deleteFromStorage() {

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
  
};

