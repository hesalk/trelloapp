(function () {
    'use strict';

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

    }

    init();

}());
