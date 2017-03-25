class UserList extends List {

    constructor(){
        super();
        this.createUsers();
    }

    createUsers(){
        do{
            var userName = window.prompt("Username: ","Username"); // frågar efter namn och tar emot det

            this.db.searchUser([userName], (data)=>{
               
                if(!data.length){ // om det ej finns något i DB
                    this.db.newUser({ // skapas en ny användare i DB
                        userName: userName
                    });
                    //this.push(new User(userName)); // skapar objekt av användare

                }else{
                    //this.push(new User(data[0].userName));  // skapar ett objekt av user från DB
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


