class UserList extends List {

    constructor(){
        super();
        this.createUsers();
    }

    createUsers(){
        do{
            var name = window.prompt("Username: ","Username"); // frågar efter namn och tar emot det

            this.db.searchUser([name], (data)=>{
               
                if(!data.length){ // om det ej finns något i DB
                    this.db.newUser({ // skapas en ny användare i DB
                        userName: name
                    });
                    //this.push(new User(name)); // skapar objekt av användare

                }else{
                    //this.push(new User(data[0].userName));  // skapar ett objekt av user från DB
                }


            });

            var b1 = window.confirm("Another user?"); // frågar efter ytterligare users om nej b1 = false och loopen bryts
        }while(b1);


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


