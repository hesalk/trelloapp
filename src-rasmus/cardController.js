import cardModel from './cardModel.js';
import cardView from './cardView.js'

let exitPopupButton = document.querySelector('.exit-wrapper__exit');

let addCardButtons = document.querySelectorAll('.list__add-card-btn');
for(let card of addCardButtons){
  card.addEventListener('click', addCardFunc);
}

function addCardFunc(e){
  let date = moment().format('L - LT');
  let list = e.target.parentNode;
  let title = list.querySelector('.list__title');
  let listTitle = title.innerHTML;
  let cardWrapper = list.querySelector('.list__card-wrapper');
  let textArea = list.querySelector('.list__add-card-textarea');
  if(!textArea.value){ return; }
  let cardTitle = textArea.value;
  let cardId = cardModel.generateId();
  cardModel.addCard(cardId, listTitle, cardTitle, date);
  cardView.renderCard(cardId, cardTitle, cardWrapper);
  textArea.value = '';

  editDeleteEvents();
}

function editDeleteEvents(){
  let editCardButtons = document.querySelectorAll('.card__edit-icon');
  let deleteCardButtons = document.querySelectorAll('.card__delete-icon');
  for(let deleteBtn of deleteCardButtons){
    deleteBtn.addEventListener('click', deleteCardFunc);
  };
  for(let editBtn of editCardButtons){
    editBtn.addEventListener('click', editCardFunc);
  };
}

function deleteCardFunc(e){
  let iconWrapper = e.target.parentNode;
  let card = iconWrapper.parentNode;
  let cardId = card.dataset.id;
  cardModel.removeCard(cardId);
  cardView.removeCard(card);
}

function editCardFunc(e){
  let lists = document.querySelectorAll('.list__title');
  cardModel.updateLists(lists);
  let listTitles = cardModel.getLists();
  let iconWrapper = e.target.parentNode;
  let id = iconWrapper.parentNode.dataset.id;
  cardModel.savedId = id;
  let card = cardModel.getCard(id);
  cardView.renderEdit(card, listTitles);
}

function closePopup(e){
  document.querySelector('.popup-overlay').style.display = 'none';
}
exitPopupButton.addEventListener('click', closePopup);
document.querySelector('.popup-overlay').addEventListener('click', closePopup);
document.querySelector('.popup-overlay__popup').addEventListener('click', function(e){
  event.stopPropagation();
});

document.querySelector('.popup__save-btn').addEventListener('click', function(e){
  let id = cardModel.getSavedId();
  let card = cardModel.getCard(id);
  let title = document.querySelector('.popup__title-textarea').value;
  let description = document.querySelector('.popup__description-textarea').value;
  let selector = document.querySelector('.popup__selector');
  card.cardTitle = title;
  card.cardDescription = description;
  if(card.listTitle !== selector.value){
    cardModel.moveCard(id);
  }
  card.listTitle = selector.value;
  cardView.updateCard(id, title);
  cardView.renderAllCards(cardModel.getCards());
  closePopup();
  editDeleteEvents();
});
