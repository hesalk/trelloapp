// let editIcons;
// let deleteIcons;
export default {
  cards: [],
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
