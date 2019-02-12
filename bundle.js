(function () {
    'use strict';

    var model = {
        _bords: [],
        getbord: function(){
            return this._bords
        },
<<<<<<< HEAD
        addbord: function(bordname,id){
            let bord = {
                bordname: bordname,
                id: id,
            };
            this._bords.push(bord);
=======
        addbord: function(id,bordtitle){
            let bord = {
                bordtitle: bordtitle,
                id: id,
            };
            this._bords.push(bord);
            console.log(this._bords);
>>>>>>> hesham
        },
        generateId: function(){
            let id = Math.floor(Math.random() * 1000000);
            let bords = this.getbord();
<<<<<<< HEAD
            for(let bord of bords){debugger
=======
            for(let bord of bords){
>>>>>>> hesham
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
<<<<<<< HEAD
        createbord: function(element,id){
=======
        addinput: function(element){
            let input = document.createElement("input");
            input.className = "maininput";
            element.appendChild(input);
        },
        clearinput: function(input){
            input.value = "";
        },
        createbord: function(element,id,inputtxt){
>>>>>>> hesham
            let div = document.createElement("div");
            let span = document.createElement("span");
            div.appendChild(span);
            span.textContent = inputtxt;
            div.className = "bord";
<<<<<<< HEAD
            div.dataset.id = id;
=======
            div.dataset.id = id;//Fixa data set till main element when i open it 
>>>>>>> hesham
            element.appendChild(div);
        }
    };

    function init (){
        let main = document.querySelector("main");
<<<<<<< HEAD
        view.addbtn(main,"bord-addbutton", function(){
            view.createbord(main,model.generateId());
=======
        view.addinput(main);
        let input = document.querySelector(".maininput");
        console.log(input);
        view.addbtn(main,"bord-addbutton", function(){
            let id = model.generateId();
            let bordtitle = input.value;
            view.createbord(main,id,bordtitle);
            model.addbord(id,bordtitle);
            view.clearinput(input);
>>>>>>> hesham
        },"Creat bord");
        model.generateId();
    }

    init();

}());
