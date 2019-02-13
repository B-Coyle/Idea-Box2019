class Idea {
  constructor(title, body, quality, id) {
    this.title = title;
    this.body = body;
    this.quality = quality || 'Swill';
    this.id = id;
  }
  saveToStorage() {
    localStorage.setItem("ideasArray", JSON.stringify(ideasArray));
  }




};

