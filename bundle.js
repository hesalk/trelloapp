(function () {
    'use strict';

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
            console.log(this._bords);
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
        createbord: function(element,id){
            let div = document.createElement("div");
            div.className = "bord";
            div.dataset.id = id;//Fixa data set till main element when i open it 
            element.appendChild(div);
        }
    };

    function init (){
        let main = document.querySelector("main");
        view.addbtn(main,"bord-addbutton", function(){
            let id = model.generateId();
            view.createbord(main,id);
            model.addbord(id);
        },"Creat bord");
        model.generateId();
    }

    init();

}());
