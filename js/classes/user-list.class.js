class UserList extends List {

  constructor(){

  }

  createUsers(callback){

    this.db.askForUser()
  }

  static get sqlQueries(){
    return{
      askForUser:
      // Här skall man fråga efter användaren från databasen.
    }
  }

}
