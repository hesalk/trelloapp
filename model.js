export default {
    _bords: [],
    getbord: function(){
        return this._bords
    },
    addbord: function(bord){
        _bords.push(bord)
    },
    newbord: {
        bordid: 0,
        bordname: "",
    },
    generateId: function(){
        let id = Math.floor(Math.random() * 1000000);
        let bords = this.getbord();
        for(let card of bords){
          if(card.id === id){
            return this.generateId();
          }
        }
        return id;
    },
}