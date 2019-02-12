import model from "./model"
import view from "./view"

export function init (){
    let main = document.querySelector("main");
    let input = document.querySelector(".maininput")
    view.addinput(main)
    view.addbtn(main,"bord-addbutton", function(){
        let id = model.generateId();
        let bordtitle = input.innerHTML;
        view.createbord(main,id,bordtitle);
        model.addbord(id);
    },"Creat bord")
    model.generateId();
}