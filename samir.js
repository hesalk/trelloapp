export function listFunction() {  
  let main = document.querySelector('main');
  let listContainer = document.createElement('div');
  let addListContainer = document.createElement('div');
  let inputList = document.createElement('input');
  let button = document.createElement('button');
  let listArray = [];
  listContainer.classList.add('list-container');
  addListContainer.classList.add('add-list-container');

  main.appendChild(listContainer);
  main.appendChild(addListContainer);

  addListContainer.appendChild(inputList);
  addListContainer.appendChild(button);

  button.textContent = 'Add list!';
  button.classList.add('add-list-button');
  inputList.classList.add('add-text');

  button.addEventListener('click', function(e){
    if(inputList.value){
      addList();
      inputList.value = ""
    }
  });
  function addList(){
    let list = document.createElement('div');
    list.classList.add('list')
    let titleSpan = document.createElement('span');
    titleSpan.innerHTML = inputList.value;
    titleSpan.classList.add('list__title');
    listContainer.appendChild(list);
    list.appendChild(titleSpan);
    let listWrap = document.createElement('div');
    listWrap.classList.add('list__card-wrapper');
    list.appendChild(listWrap);
    let addCardButton = document.createElement('button');
    addCardButton.classList.add('list__add-card-btn');
    list.appendChild(addCardButton);
    addCardButton.textContent ='Add card!'
    let cardTextArea = document.createElement('textarea');
    cardTextArea.classList.add('list__add-card-textarea');
    list.appendChild(cardTextArea);
    listArray.push(titleSpan.innerHTML);
  }
}
