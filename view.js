export default {
    addbtn: function(element, newclass, onClick,btntxt){
        let button = document.createElement("button");
        element.appendChild(button);
        button.className = newclass;
        button.innerHTML = btntxt;
        button.addEventListener('click', onClick);
    },
    addinput: function(element){
        let input = document.createElement("input");
        input.className = "maininput"
        element.appendChild(input);
    },
    clearinput: function(input){
        input.value = ""
    },
    clearmain: function(element){
        element.innerHTML = ""
    },
    createbord: function(element,id,inputtxt,onBordClick){
        let div = document.createElement("div");
        let span = document.createElement("span");
        div.appendChild(span);
        span.textContent = inputtxt;
        div.className = "bord";
        div.dataset.id = id;//Fixa data set till main element when i open it 
        element.appendChild(div);
        div.addEventListener('click', onBordClick)
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
}