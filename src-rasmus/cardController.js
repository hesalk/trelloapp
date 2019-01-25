import cardModel from './cardModel.js';
import cardView from './cardView.js'

let exitPopupButton = document.querySelector('.exit-wrapper__exit');

let addCardButtons = document.querySelectorAll('.list__add-card-btn');
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
  textArea.value = '';
  let editCardButtons = document.querySelectorAll('.list__card__edit-icon');
  let deleteCardButtons = document.querySelectorAll('.list__card__delete-icon');

  for(let deleteBtn of deleteCardButtons){
    deleteBtn.addEventListener('click', deleteCardFunc);
  };
  for(let editBtn of editCardButtons){
    editBtn.addEventListener('click', editCardFunc);
  };
}

function deleteCardFunc(e){
  let card = e.target.parentNode;
  let cardId = card.dataset.id;
  cardModel.removeCard(cardId);
  cardView.removeCard(card);
}

function editCardFunc(e){
  let id = e.target.parentNode.dataset.id;
  let card = cardModel.getCard(id);
  cardView.renderEdit(card)
}

exitPopupButton.addEventListener('click', function(e){
  document.querySelector('.popup-overlay').style.display = 'none';
});
document.querySelector('.popup-overlay').addEventListener('click', function(e){
  e.target.style.display = 'none';
})
document.querySelector('.popup-overlay__popup').addEventListener('click', function(e){
  event.stopPropagation();
})
