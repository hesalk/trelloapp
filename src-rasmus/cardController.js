import cardModel from './cardModel.js';
import cardView from './cardView.js'

let addCardButtons = document.querySelectorAll('.list__add-card-btn');
// let cardId = 0;
for(let card of addCardButtons){
  card.addEventListener('click', addCardFunc);
}

function addCardFunc(e){
  let list = e.target.parentNode;
  let title = list.querySelector('.list__title');
  let listTitle = title.innerHTML;
  let textArea = list.querySelector('.list__add-card-textarea');
  if(!textArea.value){ return; }
  let cardTitle = textArea.value;
  let cardId = cardModel.generateId();
  cardModel.addCard(cardId, listTitle, cardTitle);
  cardView.renderCard(cardId, cardTitle, list);
  // cardId++;
  console.log(cardModel.getCards());
  let editIcons = document.querySelectorAll('.list__card__edit-icon');
  let deleteIcons = document.querySelectorAll('.list__card__delete-icon');

  for(let deleteBtn of deleteIcons){
    deleteBtn.addEventListener('click', deleteCardFunc);
  };
}

function deleteCardFunc(e){
  let card = e.target.parentNode;
  let cardId = card.dataset.id;
  cardModel.removeCard(cardId);
  cardView.removeCard(card);
}
