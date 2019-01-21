/* --- Model --- */
let editIcons;
let deleteIcons;
let cards = {
  // id: ,
  // title: ,
  // comment: ,
  // date: ,
}

/* --- View --- */
let cardView = {
  render: function(list){
    let card = document.createElement('div');
    let editIcon = document.createElement('i');
    let deleteIcon = document.createElement('i');
    card.classList.add('list__card');
    editIcon.classList.add('material-icons');
    editIcon.classList.add('list__card__edit-icon');
    editIcon.innerHTML = 'edit';
    deleteIcon.classList.add('material-icons');
    deleteIcon.classList.add('list__card__delete-icon');
    deleteIcon.innerHTML = 'delete';
    list.appendChild(card);
    card.appendChild(editIcon);
    card.appendChild(deleteIcon);
  }
}

/* --- Controller --- */
let addCardButtons = document.querySelectorAll('.list__add-card-btn');

for(let card of addCardButtons){
  card.addEventListener('click', addCardFunc);
}

function addCardFunc(e){
  cardView.render(e.target.parentNode);
  editIcons = document.querySelectorAll('.list__card__edit-icon');
  deleteIcons = document.querySelectorAll('.list__card__delete-icon');

  for(let deleteBtn of deleteIcons){
    deleteBtn.addEventListener('click', deleteCardFunc);
  };
}

function deleteCardFunc(e){
  let targetCard = e.target.parentNode;
  let targetList = targetCard.parentNode;
  targetList.removeChild(targetCard);
}
