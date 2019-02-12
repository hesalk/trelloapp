export default {
    _bords: [],
    getbord: function(){
        return this._bords
    },
    addbord: function(id){
        let bord = {
            id: id,
        }
        _bords.push(bord)
    },
    generateId: function(){
        let id = Math.floor(Math.random() * 1000000);
        let bords = this.getbord();
        for(let bord of bords){
          if(bord.id === id){
            return this.generateId();
          }
        }
        return id;
    },
}