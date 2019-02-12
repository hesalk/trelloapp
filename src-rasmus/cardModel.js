export default {
  cards: [],
  lists: [],
  getLists: function(){
    return this.lists;
  },
  updateLists: function(listElements){
    this.lists = [];
    for(let element of listElements){
      this.lists.push(element.innerHTML);
    };
  },
  generateId: function(){
    let id = Math.floor(Math.random() * 1000000);
    let cards = this.getCards();
    for(let card of cards){
      if(card.id === id){
        return this.generateId();
      }
    }
    return id;
  },
  addCard: function(id, listTitle, cardTitle, date){
    let main = document.querySelector('main'); //change
    let card = {
      id: id,
      listTitle: listTitle,
      cardTitle: cardTitle,
      cardDescription: '',
      date: date,
      comments: [],
      boardId: main.dataset.boardid, //change
    }
    this.cards.push(card);
  },
  getCards: function(){
    return this.cards;
  },
  getCard: function(id){
    id = Number(id);
    for(let card of this.cards){
      if(card.id === id){
        return card;
      }
    }
  },
  removeCard: function(id){
    id = Number(id);
    let cards = this.getCards();
    for(let i = 0; i < cards.length; i++){
      if(cards[i].id === id){
        cards.splice(i, 1);
      }
    }
  },
  moveCard: function(id){
    id = Number(id);
    for(let i = 0; i < this.cards.length; i++){
      if(this.cards[i].id === id){
        let card = this.cards.splice(i, 1);
        this.cards.push(card[0]);
      }
    }
  },
  savedId: '',
  getSavedId: function(){
    return this.savedId;
  },
}
