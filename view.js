export default {
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
}