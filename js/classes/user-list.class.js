class UserList extends List {

    constructor() {
        super(User);
    }

    createUsers(callback){

        do{
            var name = window.prompt("Username: ","Username"); // frågar efter namn och tar emot det

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

            var anotherUser = window.confirm("Another player?"); // frågar efter ytterligare users om nej b1 = false och loopen bryts

        }while(anotherUser);

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


