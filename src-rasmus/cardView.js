export default {
  renderCard: function(id, cardTitle, list){
    let card = document.createElement('div');
    let editIcon = document.createElement('i');
    let deleteIcon = document.createElement('i');
    card.dataset.id = id;
    card.classList.add('list__card');
    card.innerHTML = cardTitle;
    editIcon.classList.add('material-icons');
    editIcon.classList.add('list__card__edit-icon');
    editIcon.innerHTML = 'edit';
    deleteIcon.classList.add('material-icons');
    deleteIcon.classList.add('list__card__delete-icon');
    deleteIcon.innerHTML = 'delete';
    list.appendChild(card);
    card.appendChild(editIcon);
    card.appendChild(deleteIcon);
  },
  removeCard: function(card){
    let list = card.parentNode;
    list.removeChild(card);
  }
}
