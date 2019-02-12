export default {
    _bords: [],
    getbord: function(){
        return this._bords
    },
    addbord: function(bordname,id){
        let bord = {
            bordname: bordname,
            id: id,
        }
        this._bords.push(bord);
    },
    generateId: function(){
        let id = Math.floor(Math.random() * 1000000);
        let bords = this.getbord();
        for(let bord of bords){debugger
          if(bord.id === id){
            return this.generateId();
          }
        }
        console.log(id)
        return id;
    },
}