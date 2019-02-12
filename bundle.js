(function () {
    'use strict';

    var model = {
        _bords: [],
        getbord: function(){
            return this._bords
        },
        addbord: function(bord){
            _bords.push(bord);
        },
        newbord: {
            bordid: 0,
            bordname: "",
        },
        generateId: function(){
            let id = Math.floor(Math.random() * 1000000);
            let bords = this.getbord();
            for(let card of bords){
              if(card.id === id){
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
        createbord: function(element){
            let div = document.createElement("div");
            div.className = "bord";
            element.appendChild(div);
        }
    };

    function init (){
        let main = document.querySelector("main");
        view.addbtn(main,"bord-addbutton", function(){view.createbord(main);},"Creat bord");
        model.generateId();
    }

    init();

}());
