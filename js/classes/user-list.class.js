class UserList extends List {

    constructor() {
        super(User);
    }

    createUsers(callback){
        var name = window.prompt("Username: ","Username"); // frågar efter namn och tar emot det
        if(name != null){ // kontrollerar att man ej tryckt på avbryt
            var userAlredyPlaying = true; // boolean för kontroll om spelaren redan existerar i spelet
            for(let i = 0; i < this.length; i++){
                if(this[i].userName == name){ // kollar om namnet redan finns i userlist
                    userAlredyPlaying = false; // då sätts boolean till false och man kommer aldrig in i nästa if-sats
                }
            }
            if(userAlredyPlaying){
                this.db.searchUser([name], (data)=>{

                    if(!data.length){ // om det ej finns något i DB
                        this.db.newUser({ // skapas en ny användare i DB
                            userName: name

                        });


                        this.push(new User(name)); // skapar objekt av användare
                        callback && typeof callback == 'function' && callback(this);


                    }else{
                        this.push(new User(data[0].userName));  // skapar ett objekt av user från DB
                        callback && typeof callback == 'function' && callback(this);
                    }


                });
            }else{
                callback && typeof callback == 'function' && callback(this);
            }
        }else{
            callback && typeof callback == 'function' && callback(this);
        }

    }
    
  /*  
    setScore(callback){
        for(let i = 0; i < this.length; i++){
            this[i].setScore(callback);
        }
    }

*/
    static get sqlQueries(){
        return {
            newUser: `
INSERT User SET ?
`,
            searchUser: `
Select * FROM User WHERE userName = ?
`
,
            gameHasUser: `
INSERT Game_has_user SET ?
`
        }
    }

}


