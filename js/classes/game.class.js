class Game extends Base {

    constructor(){
        super();

        this.users = new UserList(); // skapar en userList
        this.dices = new DiceList(); // skapar dicelist
        this.counter = 0;
    }
    
    createUsers(){
        this.users.createUsers();
        console.log(this.users);
    }


    pressedRoll(){ // funktion då man trycker på knappen "Roll"
        this.counter++;
        if(this.counter == 3){
            // set button "Roll" to inactive
            $('#roll').attr("disabled", true);
            this.dices.rollDice();
            /* boolean b1 = users[0].setScore(()=>{
                if(b1){
                    alert('Game done!');
                }else{
                    this.counter = 1;
                }
            }); */

        }else{
            this.dices.rollDice();
            $('#user').attr("disabled", true); // det ska inte gå att lägga till users när spelet har börjat
        }

    }

    static get sqlQueries(){
        return {
            newUser: `
INSERT User SET ?
`
        }
    }
}
