import model from "./model"
import view from "./view"

export function init (){
    let main = document.querySelector("main")
    view.addbtn(main,"bord-addbutton", function(){
        view.createbord(main,model.generateId())},"Creat bord")
    model.generateId();
}