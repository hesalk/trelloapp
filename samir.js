let listArray = {
  lists: [],
}

export function listFunction() {
  let main = document.querySelector('main');
  let listContainer = null
  let addListContainer = null;
  let inputList = null;
  let button = null;

  renderAddListButton();
  renderAllLists();

  function renderAddListButton(){
    listContainer = document.createElement('div');
    addListContainer = document.createElement('div');
    inputList = document.createElement('input');
    button = document.createElement('button');

    listContainer.classList.add('list-container');
    addListContainer.classList.add('add-list-container');

    main.appendChild(addListContainer);
    main.appendChild(listContainer);

    addListContainer.appendChild(inputList);
    addListContainer.appendChild(button);

    button.textContent = '+';
    button.classList.add('add-list-button');
    inputList.classList.add('add-text');
    inputList.placeholder = 'Add list'

    button.addEventListener('click', function(e){
      if(inputList.value){
        addList();
        inputList.value = ""
      }
    });
  }



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
    addCardButton.textContent ='Add card'
    let cardTextArea = document.createElement('textarea');
    cardTextArea.classList.add('list__add-card-textarea');
    list.appendChild(cardTextArea);
    list.appendChild(addCardButton);
    let obj = {
      listTitle: titleSpan.innerHTML,
      boardId: main.dataset.id,
    }
    listArray.lists.push(obj);
    console.log(listArray.lists);
  }

  function renderAllLists(){
    console.log(listArray.lists);
    for(let list of listArray.lists){

      if(list.boardId === main.dataset.id){
        let listElement = document.createElement('div');
        listElement.classList.add('list')
        let titleSpan = document.createElement('span');
        console.log(list);
        console.log(list.listTitle);
        titleSpan.innerHTML = list.listTitle;
        titleSpan.classList.add('list__title');
        listContainer.appendChild(listElement);
        listElement.appendChild(titleSpan);
        let listWrap = document.createElement('div');
        listWrap.classList.add('list__card-wrapper');
        listElement.appendChild(listWrap);
        let addCardButton = document.createElement('button');
        addCardButton.classList.add('list__add-card-btn');
        addCardButton.textContent ='Add card'
        let cardTextArea = document.createElement('textarea');
        cardTextArea.classList.add('list__add-card-textarea');
        listElement.appendChild(cardTextArea);
        listElement.appendChild(addCardButton);
      }
    }
  }
}
