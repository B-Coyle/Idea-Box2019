class Idea {
  constructor(title, body, quality, id) {
    this.title = title;
    this.body = body;
    this.quality = quality;
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

  updateContent() {
    var index = ideasArray.indexOf(this);
    this.saveToStorage();
  }

  updateQuality(quality) {
    this.quality = quality;
  }
}