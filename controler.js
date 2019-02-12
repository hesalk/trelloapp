import model from "./model"
import view from "./view"

export function init (){
    let main = document.querySelector("main");
    view.addinput(main)
    let input = document.querySelector(".maininput")
    console.log(input);
    let onbtnclick = function(){
        let id = model.generateId();
        let bordtitle = input.value;
        let onBordClick = function(){
            main.dataset.id = id;
            console.log("test");
        }
        view.createbord(main,id,bordtitle,onBordClick);
        model.addbord(id,bordtitle);
        view.clearinput(input);
    };
    let onexistBordclick = function(e){
        main.dataset.id = e.target.dataset.id;
    }
    let renderallbordsbtn = function(){
        view.renderallbords(model.getbord(),main,onexistBordclick)
    }
    view.addbtn(main,"bord-addbutton",onbtnclick,"Creat bord")
    view.addbtn(main,"",renderallbordsbtn,"renderallbords")
    model.generateId();
}