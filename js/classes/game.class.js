class Game extends Base {

    constructor(){
        super();

        this.users = new UserList(); // skapar en userList
        this.dices = new DiceList(); // skapar dicelist
        this.counter = 0;
    }

    createUsers(){ 
        $('#addUser').html('');
        this.users.createUsers((user) => {
            setTimeout(function(){
                this.users = user;
                console.log(this.users);
                
                this.users.display('#addUser');
            }, 50);
        });

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
