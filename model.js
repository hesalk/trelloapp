export default {
    _bords: [],
    getbord: function(){
        return this._bords
    },
<<<<<<< HEAD
    addbord: function(bordname,id){
        let bord = {
            bordname: bordname,
            id: id,
        }
        this._bords.push(bord);
=======
    addbord: function(id,bordtitle){
        let bord = {
            bordtitle: bordtitle,
            id: id,
        }
        this._bords.push(bord)
        console.log(this._bords)
>>>>>>> hesham
    },
    generateId: function(){
        let id = Math.floor(Math.random() * 1000000);
        let bords = this.getbord();
<<<<<<< HEAD
        for(let bord of bords){debugger
=======
        for(let bord of bords){
>>>>>>> hesham
          if(bord.id === id){
            return this.generateId();
          }
        }
        console.log(id)
        return id;
    },
}