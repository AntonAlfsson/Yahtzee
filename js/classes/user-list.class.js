class UserList extends List {

    constructor() {
        super(User);
    }

    createUsers(callback){
            var name = window.prompt("Username: ","Username"); // frågar efter namn och tar emot det
            if(name != null){
                var userAlredyPlaying = true;
                for(let i = 0; i < this.length; i++){
                    if(this[i].userName == name){
                        userAlredyPlaying = false;
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
            }

    }


    static get sqlQueries(){
        return {
            newUser: `
INSERT User SET ?
`,
            searchUser: `
Select * FROM User WHERE userName = ?
`
        }
    }

}


