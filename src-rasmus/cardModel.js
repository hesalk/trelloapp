// let editIcons;
// let deleteIcons;
export default {
  cards: [],
  generateId: function(){
    let id = Math.floor(Math.random() * 1000000);
    let cards = this.getCards();
    if(!cards.length){
      return id;
    }
    for(let card of cards){
      if(card.id === id){
        return this.generateId();
      }
    }
    return id;
  },
  addCard: function(id, listTitle, cardTitle, cardComment){
    let card = {
      id: id,
      listTitle: listTitle,
      cardTitle: cardTitle,
      cardComment: cardComment,
    }
    this.cards.push(card);
  },
  getCards: function(){
    return this.cards;
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
