export default {
  renderCard: function(id, cardTitle, cardWrapper){
    let card = document.createElement('div');
    let titleElement = document.createElement('span');
    let iconWrapper = document.createElement('div');
    let editIcon = document.createElement('i');
    let deleteIcon = document.createElement('i');
    card.dataset.id = id;
    card.classList.add('list__card');
    titleElement.innerHTML = cardTitle;
    titleElement.classList.add('card__title');
    iconWrapper.classList.add('card__icon-wrapper');
    editIcon.classList.add('material-icons');
    editIcon.classList.add('card__edit-icon');
    editIcon.innerHTML = 'edit';
    deleteIcon.classList.add('material-icons');
    deleteIcon.classList.add('card__delete-icon');
    deleteIcon.innerHTML = 'delete';
    cardWrapper.appendChild(card);
    card.appendChild(titleElement);
    card.appendChild(iconWrapper);
    iconWrapper.appendChild(editIcon);
    iconWrapper.appendChild(deleteIcon);
  },
  renderAllCards: function(cards){
    let cardWrappers = document.querySelectorAll('.list__card-wrapper');
    let listTitles = document.querySelectorAll('.list__title');
    for(let wrapper of cardWrappers){
      wrapper.innerHTML = '';
    }
    for(let card of cards){
      for(let title of listTitles){
        if(title.innerHTML === card.listTitle){
          let list = title.parentNode;
          let wrapper = list.querySelector('.list__card-wrapper');
          this.renderCard(card.id, card.cardTitle, wrapper);
        }
      }
    }
  },
  removeCard: function(card){
    console.log(card);
    let list = card.parentNode;
    list.removeChild(card);
  },
  renderEdit: function(card, listTitles){
    let popupOverlay = document.querySelector('.popup-overlay');
    let titleTextarea = document.querySelector('.popup__title-textarea');
    let commentTextarea = document.querySelector('.popup__comment-textarea');
    let date = document.querySelector('.popup__date');
    let selector = document.querySelector('.popup__selector');
    selector.innerHTML = '';
    titleTextarea.value = card.cardTitle;
    commentTextarea.value = card.cardComment;
    for(let title of listTitles){
      let optionElement = document.createElement('option');
      optionElement.innerHTML = title;
      if(title === card.listTitle){
        optionElement.selected = 'selected';
      }
      selector.appendChild(optionElement);
    }
    date.innerHTML = card.date;
    popupOverlay.style.display = "block";
  },
  updateCard: function(id, title){
    let allCards = document.querySelectorAll('.list__card');
    for(let card of allCards){
      if(id === card.dataset.id){
        card.querySelector('.card__title').innerHTML = title;
      }
    }
  }
}
