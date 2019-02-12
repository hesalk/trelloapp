import model from "./model"
import view from "./view"

export function init (listFunc, cardFunc){
    let main = document.querySelector("main");
    view.addinput(main,"Write bord name")
    let input = document.querySelector(".maininput")
    console.log(input);
    let onbackclick = function(){//5
        view.clearmain(main);
        main.dataset.id = ""
        init (listFunc, cardFunc);  
        renderallbordsbtn();      
/*         console.log("lol");
        view.clearmain(main);
        view.addinput(main,"Write bord name");
        view.addbtn(main,"bord-addbutton",onnewbtnclick,"Creat bord")
        renderallbordsbtn(); */
    };
    let onnewbtnclick = function(){
        console.log("newlol")
        renderallbordsbtn();
    }
    let onbtnclick = function(){//2nd
        let id = model.generateId();
        let bordtitle = input.value;
        let onBordClick = function(){//4th
            main.dataset.id = id;
            console.log("test");
            view.clearmain(main);
            listFunc();
            cardFunc();
            view.addbtn(main,"backbtn",onbackclick,"backtomain");

/*             let backButton = document.createElement('button');
            backButton.textContent = 'Back to Boards';
            main.appendChild(backButton);
            backButton.addEventListener('click', function(e){
              view.clearmain(main);
              // Rendera ut boards
            }) */
        }
        view.createbord(main,id,bordtitle,onBordClick);//3rd
        model.addbord(id,bordtitle);
        view.clearinput(input);
    };
    let onexistBordclick = function(e){
        main.dataset.id = e.target.dataset.id;
        console.log("anotherlo");
        view.clearmain(main);
            listFunc();
            cardFunc();
            view.addbtn(main,"backbtn",onbackclick,"backtomain");
    }
    let renderallbordsbtn = function(){
        view.renderallbords(model.getbord(),main,onexistBordclick)
    }
    view.addbtn(main,"bord-addbutton",onbtnclick,"Creat bord");//the statrt
    model.generateId();
}
