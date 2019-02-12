export default {
    _bords: [],
    getbord: function(){
        return this._bords
    },
    addbord: function(id,bordtitle){
        let bord = {
            bordtitle: bordtitle,
            id: id,
        }
        this._bords.push(bord)
        console.log(this._bords)
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