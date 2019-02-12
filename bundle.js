(function () {
    'use strict';

    var model = {
        _bords: [],
        getbord: function(){
            return this._bords
        },
        addbord: function(bordname,id){
            let bord = {
                bordname: bordname,
                id: id,
            };
            this._bords.push(bord);
        },
        generateId: function(){
            let id = Math.floor(Math.random() * 1000000);
            let bords = this.getbord();
            for(let bord of bords){debugger
              if(bord.id === id){
                return this.generateId();
              }
            }
            console.log(id);
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
            div.dataset.id = id;
            element.appendChild(div);
        }
    };

    function init (){
        let main = document.querySelector("main");
        view.addbtn(main,"bord-addbutton", function(){
            view.createbord(main,model.generateId());
        },"Creat bord");
        model.generateId();
    }

    init();

}());
