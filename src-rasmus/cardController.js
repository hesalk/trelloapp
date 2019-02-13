import cardModel from './cardModel.js';
import cardView from './cardView.js'

export function cardFunction(){
  let addListButton = document.querySelector('.add-list-button');
  let addCardButtons = document.querySelectorAll('.list__add-card-btn');
  let editCardButtons = document.querySelectorAll('.card__edit-icon');
  let deleteCardButtons = document.querySelectorAll('.card__delete-icon');

  function init(){
    cardView.renderAllCards(cardModel.getCards());
    editCardButtons = document.querySelectorAll('.card__edit-icon');
    deleteCardButtons = document.querySelectorAll('.card__delete-icon');
  }

  init();
  callCardFunc();
  editDeleteEvents();

  addListButton.addEventListener('click', callCardFunc)

  function callCardFunc(){
    addCardButtons = document.querySelectorAll('.list__add-card-btn');
    for(let cardButton of addCardButtons){
      cardButton.addEventListener('click', addCardFunc);
    }
  }

  let exitPopupButton = document.querySelector('.exit-wrapper__exit');
  let commentContainer = document.querySelector('.popup__comments-container')
  let commentPopupButton = document.querySelector('.popup__comment-btn');
  let commentTextarea = document.querySelector('.popup__comment-textarea');

  function addCardFunc(e){
    let date = moment().format('DD/MM/YYYY - HH:mm');
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
    dragDropEvents();
  }

  function editDeleteEvents(){
    editCardButtons = document.querySelectorAll('.card__edit-icon');
    deleteCardButtons = document.querySelectorAll('.card__delete-icon');
    for(let deleteBtn of deleteCardButtons){
      deleteBtn.addEventListener('click', deleteCardFunc);
    };
    for(let editBtn of editCardButtons){
      editBtn.addEventListener('click', editCardFunc);
    };
  }

  function dragDropEvents(){
    let dragged;
    let startList;
    document.addEventListener('dragstart', function(e){
      dragged = e.target
      for(let element of e.path){
        if(element.className === 'list'){
          startList = element;
        }
      }
      setTimeout(() => {
        e.target.style.opacity = 0;
      },0)

    });
    document.addEventListener('dragend', function(e){
      e.target.style.opacity = 1;
    });
    document.addEventListener('dragover', function(e){
      e.preventDefault();
    });
    document.addEventListener('drop', function(e){
      e.preventDefault();
      for(let element of e.path){
        if(element.className === 'list'){
          if(startList === element) return;

          let dropzone = element.querySelector('.list__card-wrapper');
          let listTitle = element.querySelector('.list__title');
          dragged.parentNode.removeChild(dragged);
          dropzone.appendChild(dragged);
          let id = dragged.dataset.id;
          let card = cardModel.getCard(id);
          card.listTitle = listTitle.innerHTML;
          cardModel.moveCard(id);
        }
      }
    })

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
    cardView.renderComments(card.comments);
  }

  function closePopup(e){
    commentContainer.innerHTML = '';
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
    editDeleteEvents();
    document.querySelector('.popup-overlay').style.display = 'none';
  }
  exitPopupButton.addEventListener('click', closePopup);
  document.querySelector('.popup-overlay').addEventListener('click', closePopup);
  document.querySelector('.popup-overlay__popup').addEventListener('click', function(e){
    event.stopPropagation();
  });

  function commentFunc(){
    if(commentTextarea.value){
      let id = cardModel.getSavedId();
      let card = cardModel.getCard(id);
      card.comments.push(commentTextarea.value);
      cardView.renderComments(card.comments);
      commentTextarea.value = '';
    }
  }
  commentPopupButton.addEventListener('click', commentFunc);
}
