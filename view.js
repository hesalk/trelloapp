export default {
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
}