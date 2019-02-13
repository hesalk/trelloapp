(function () {
  'use strict';

  var cardModel = {
    cards: [],
    lists: [],
    getLists: function(){
      return this.lists;
    },
    updateLists: function(listElements){
      this.lists = [];
      for(let element of listElements){
        this.lists.push(element.innerHTML);
      }  },
    generateId: function(){
      let id = Math.floor(Math.random() * 1000000);
      let cards = this.getCards();
      for(let card of cards){
        if(card.id === id){
          return this.generateId();
        }
      }
      return id;
    },
    addCard: function(id, listTitle, cardTitle, date){
      let main = document.querySelector('main');
      let card = {
        id: id,
        listTitle: listTitle,
        cardTitle: cardTitle,
        cardDescription: '',
        date: date,
        comments: [],
        boardId: main.dataset.id,
      };
      this.cards.push(card);
    },
    getCards: function(){
      return this.cards;
    },
    getCard: function(id){
      id = Number(id);
      for(let card of this.cards){
        if(card.id === id){
          return card;
        }
      }
    },
    removeCard: function(id){
      id = Number(id);
      let cards = this.getCards();
      for(let i = 0; i < cards.length; i++){
        if(cards[i].id === id){
          cards.splice(i, 1);
        }
      }
    },
    moveCard: function(id){
      id = Number(id);
      for(let i = 0; i < this.cards.length; i++){
        if(this.cards[i].id === id){
          let card = this.cards.splice(i, 1);
          this.cards.push(card[0]);
        }
      }
    },
    savedId: '',
    getSavedId: function(){
      return this.savedId;
    },
  };

  var cardView = {
    renderCard: function(id, cardTitle, cardWrapper){
      let card = document.createElement('div');
      let titleElement = document.createElement('span');
      let iconWrapper = document.createElement('div');
      let editIcon = document.createElement('i');
      let deleteIcon = document.createElement('i');
      card.dataset.id = id;
      card.classList.add('list__card');
      card.draggable = 'true';
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
      let main = document.querySelector('main');
      for(let wrapper of cardWrappers){
        wrapper.innerHTML = '';
      }
      for(let card of cards){
        if(card.boardId === main.dataset.id){
          for(let title of listTitles){
            if(title.innerHTML === card.listTitle){
              let list = title.parentNode;
              let wrapper = list.querySelector('.list__card-wrapper');
              this.renderCard(card.id, card.cardTitle, wrapper);
            }
          }
        }
      }
    },
    removeCard: function(card){
      let list = card.parentNode;
      list.removeChild(card);
    },
    renderEdit: function(card, listTitles){
      let popupOverlay = document.querySelector('.popup-overlay');
      let titleTextarea = document.querySelector('.popup__title-textarea');
      let descriptionTextarea = document.querySelector('.popup__description-textarea');
      let date = document.querySelector('.popup__date');
      let selector = document.querySelector('.popup__selector');
      selector.innerHTML = '';
      titleTextarea.value = card.cardTitle;
      descriptionTextarea.value = card.cardDescription;
      for(let title of listTitles){
        let optionElement = document.createElement('option');
        optionElement.innerHTML = title;
        if(title === card.listTitle){
          optionElement.selected = 'selected';
        }
        selector.appendChild(optionElement);
      }
      date.innerHTML = card.date;
      popupOverlay.style.display = "flex";
    },
    updateCard: function(id, title){
      let allCards = document.querySelectorAll('.list__card');
      for(let card of allCards){
        if(id === card.dataset.id){
          card.querySelector('.card__title').innerHTML = title;
        }
      }
    },
    renderComments: function(arr){
      let commentContainer = document.querySelector('.popup__comments-container');
      commentContainer.innerHTML = '';
      for(let comment of arr){
        let li = document.createElement('li');
        li.classList.add('popup__comment');
        li.innerHTML = comment;
        commentContainer.appendChild(li);
      }
    },
  };

  function cardFunction(){
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

    addListButton.addEventListener('click', callCardFunc);

    function callCardFunc(){
      addCardButtons = document.querySelectorAll('.list__add-card-btn');
      for(let cardButton of addCardButtons){
        cardButton.addEventListener('click', addCardFunc);
      }
    }

    let exitPopupButton = document.querySelector('.exit-wrapper__exit');
    let commentContainer = document.querySelector('.popup__comments-container');
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
      }    for(let editBtn of editCardButtons){
        editBtn.addEventListener('click', editCardFunc);
      }  }

    function dragDropEvents(){
      let dragged;
      let startList;
      document.addEventListener('dragstart', function(e){
        dragged = e.target;
        for(let element of e.path){
          if(element.className === 'list'){
            startList = element;
          }
        }
        setTimeout(() => {
          e.target.style.opacity = 0;
        },0);

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
      });

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

  let listArray = {
    lists: [],
  };

  function listFunction() {
    let main = document.querySelector('main');
    let listContainer = null;
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
      inputList.placeholder = 'Add list';

      button.addEventListener('click', function(e){
        if(inputList.value){
          addList();
          inputList.value = "";
        }
      });
    }



    function addList(){
      let list = document.createElement('div');
      list.classList.add('list');
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
      addCardButton.textContent ='Add card';
      let cardTextArea = document.createElement('textarea');
      cardTextArea.classList.add('list__add-card-textarea');
      list.appendChild(cardTextArea);
      list.appendChild(addCardButton);
      let obj = {
        listTitle: titleSpan.innerHTML,
        boardId: main.dataset.id,
      };
      listArray.lists.push(obj);
    }

    function renderAllLists(){
      for(let list of listArray.lists){
        if(list.boardId === main.dataset.id){
          let listElement = document.createElement('div');
          listElement.classList.add('list');
          let titleSpan = document.createElement('span');
          titleSpan.innerHTML = list.listTitle;
          titleSpan.classList.add('list__title');
          listContainer.appendChild(listElement);
          listElement.appendChild(titleSpan);
          let listWrap = document.createElement('div');
          listWrap.classList.add('list__card-wrapper');
          listElement.appendChild(listWrap);
          let addCardButton = document.createElement('button');
          addCardButton.classList.add('list__add-card-btn');
          addCardButton.textContent ='Add card';
          let cardTextArea = document.createElement('textarea');
          cardTextArea.classList.add('list__add-card-textarea');
          listElement.appendChild(cardTextArea);
          listElement.appendChild(addCardButton);
        }
      }
    }
  }

  var model = {
      _bords: [],
      getbord: function(){
          return this._bords
      },
      addbord: function(id,bordtitle){
          let bord = {
              bordtitle: bordtitle,
              id: id,
          };
          this._bords.push(bord);
      },
      generateId: function(){
          let id = Math.floor(Math.random() * 1000000);
          let bords = this.getbord();
          for(let bord of bords){
            if(bord.id === id){
              return this.generateId();
            }
          }
          return id;
      },
  };

  var view = {
      addbtn: function(element, newclass, onClick,btntxt){
          let button = document.createElement("button");
          element.appendChild(button);
          button.className = newclass;
          button.innerHTML = btntxt;
          button.addEventListener('click', onClick);
      },
      addinput: function(element,placeholder){
          let input = document.createElement("input");
          input.className = "maininput";
          input.placeholder = placeholder;
          element.appendChild(input);
      },
      clearinput: function(input){
          input.value = "";
      },
      clearmain: function(element){
          element.innerHTML = "";
      },
      createbord: function(element,id,inputtxt,onBordClick){
          let div = document.createElement("div");
          let span = document.createElement("span");
          div.appendChild(span);
          span.textContent = inputtxt;
          div.className = "bord";
          div.dataset.id = id;//Fixa data set till main element when i open it
          element.appendChild(div);
          div.addEventListener('click', onBordClick);
      },
      renderallbords: function(bords,domEl,onBordClick){
          bords.forEach(element => {
              let div = document.createElement("div");
              let span = document.createElement("span");
              div.className = "bord";
              div.appendChild(span);
              div.dataset.id = element.id;
              span.textContent = element.bordtitle;
              domEl.appendChild(div);
              div.addEventListener('click', onBordClick);
          });
      }
  };

  function init (listFunc, cardFunc){
      let main = document.querySelector("main");
      view.addinput(main,"Write bord name");
      let input = document.querySelector(".maininput");
      let onbackclick = function(){//5
          view.clearmain(main);
          init (listFunc, cardFunc);
          main.dataset.id = "";
          renderallbordsbtn();
  /*         console.log("lol");
          view.clearmain(main);
          view.addinput(main,"Write bord name");
          view.addbtn(main,"bord-addbutton",onnewbtnclick,"Creat bord")
          renderallbordsbtn(); */
      };
      let onbtnclick = function(){//2nd
        if(!input.value) return;
          let id = model.generateId();
          let bordtitle = input.value;
          let onBordClick = function(){//4th
              main.dataset.id = id;
              view.clearmain(main);
              listFunc();
              cardFunc();
              let container = document.querySelector('.add-list-container');
              view.addbtn(container,"backbtn",onbackclick,"backtomain");

  /*             let backButton = document.createElement('button');
              backButton.textContent = 'Back to Boards';
              main.appendChild(backButton);
              backButton.addEventListener('click', function(e){
                view.clearmain(main);
                // Rendera ut boards
              }) */
          };
          view.createbord(main,id,bordtitle,onBordClick);//3rd
          model.addbord(id,bordtitle);
          view.clearinput(input);
      };
      let onexistBordclick = function(e){
          main.dataset.id = e.target.dataset.id;
          view.clearmain(main);
              listFunc();
              cardFunc();
              view.addbtn(main,"backbtn",onbackclick,"backtomain");
      };
      let renderallbordsbtn = function(){
          view.renderallbords(model.getbord(),main,onexistBordclick);
      };
      view.addbtn(main,"bord-addbutton",onbtnclick,"Creat bord");//the statrt
      model.generateId();
  }

  // listFunction();
  // cardFunction();
  init(listFunction, cardFunction);


  // Just test code!
  // let main = document.querySelector('main');
  // let btn = document.createElement('button');
  // btn.textContent = 'click me';
  // document.body.appendChild(btn);
  //
  // btn.addEventListener('click', function(e){
  //   main.innerHTML = '';
  //   listFunction();
  //   cardFunction();
  // })

}());
