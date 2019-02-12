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
    createbord: function(element,id,inputtxt){
        let div = document.createElement("div");
        let span = document.createElement("span");
        div.appendChild(span);
        span.textContent = inputtxt;
        div.className = "bord";
        div.dataset.id = id;//Fixa data set till main element when i open it 
        element.appendChild(div);
    }
}