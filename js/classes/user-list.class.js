class UserList extends List {

    constructor(){
        super();
        this.createUsers();
    }

    createUsers(){
        var name = window.prompt("Username: ","Username"); // frågar efter namn och tar emot det

    }








    static get sqlQueries(){
        return {
            newUser: `
                INSERT userName SET ?
                `,
            searchUser: `
                Select * FROM User WHERE userName = ?
                `
        }
    }

}


