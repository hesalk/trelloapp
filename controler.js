import model from "./model"
import view from "./view"

export function init (){
    let main = document.querySelector("main");
    view.addinput(main)
    view.addbtn(main,"bord-addbutton", function(){
        let id = model.generateId();
        view.createbord(main,id);
        model.addbord(id);
    },"Creat bord")
    model.generateId();
}