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
        addinput: function(element){
            let input = document.createElement("input");
            input.className = "maininput";
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
        }
    };

    function init (){
        let main = document.querySelector("main");
        view.addinput(main);
        let input = document.querySelector(".maininput");
        console.log(input);
        view.addbtn(main,"bord-addbutton", function(){
            let id = model.generateId();
            let bordtitle = input.value;
            let onBordClick = function(){
                console.log("test");
            };
            view.createbord(main,id,bordtitle,onBordClick);
            model.addbord(id,bordtitle);
            view.clearinput(input);
        },"Creat bord");
        model.generateId();
    }

    init();

}());
