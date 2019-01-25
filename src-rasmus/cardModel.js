export default {
  cards: [],
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
  addCard: function(id, listTitle, cardTitle){
    let card = {
      id: id,
      listTitle: listTitle,
      cardTitle: cardTitle,
      cardComment: '',
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
  }
}
