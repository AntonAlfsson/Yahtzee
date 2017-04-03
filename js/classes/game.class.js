class Game extends Base {

    constructor(){
        super();

        this.users = new UserList(); // skapar en userList
        this.dices = new DiceList(); // skapar dicelist
        this.counter = 0;
        this.currentUserPlaying = 0;
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

        $('#user').attr("disabled", true); // det ska inte gå att lägga till users när spelet har börjat
        this.users[this.currentUserPlaying].activeScoreBoard(); // aktiverar första spelarens scoreboard

        if(this.counter == 3){
            // set button "Roll" to inactive
            $('#roll').attr("disabled", true); 
        }
        this.dices.rollDice();

        if(this.counter == 0){
            this.users[this.currentUserPlaying].setScore((b1)=>{
                if(b1){
                    alert('Game done!');
                }else{
                    this.counter = 0;
                    this.dices.resetRoll();
                    $('#roll').attr("disabled", false);

                    if(this.currentUserPlaying == this.users.length-1){
                        this.currentUserPlaying = 0;
                    }else{
                        this.currentUserPlaying++;
                    }
                }
            });
        }
        this.counter++;
    }



    static get sqlQueries(){
        return {
            newUser: `
INSERT User SET ?
`
        }
    }
}
