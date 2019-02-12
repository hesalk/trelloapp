import model from "./model"
import view from "./view"

export function init (){
    let main = document.querySelector("main");
    view.addinput(main)
    let input = document.querySelector(".maininput")
    console.log(input);
    view.addbtn(main,"bord-addbutton", function(){
        let id = model.generateId();
        let bordtitle = input.value
        view.createbord(main,id,bordtitle);
        model.addbord(id,bordtitle);
        view.clearinput(input);
    },"Creat bord")
    model.generateId();
}