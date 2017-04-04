class Game extends Base {

    constructor(){
        super();

        this.users = new UserList(); // skapar en userList
        this.dices = new DiceList(); // skapar dicelist
        this.counter = 0;
        this.currentUserPlaying = 0;
        this.numberOfUsersDone = 0;
        this.idGame; //Undefined here, will be defined in startGame()
        this.startGame();
    }




    startGame(){

        var tempIdGame = 0;

        //Hämtar högsta idGame från databasen
        this.db.getGame((data)=>{
            tempIdGame = data[0].maxGame;

            //Plussar på 
            this.idGame = tempIdGame+1;

            //Lägger till nytt game i databasen
            this.db.newGame({idGame: this.idGame}, ()=>{
                
            });

        });

    }

    //Knappen Add users
    createUsers(){ 
        var thisGame = this;

        $('#addUser').html('');
        this.users.createUsers((user) => {
            //Efter att funktionen createUsers har kört klart, så gör de här sakerna:
            setTimeout(function(){
                this.users = user;

                this.users.display('#addUser');
            }, 50);
        });


    }

    //Sparar data i Game_has_user
    saveGameRoundToDB(){
        var userName;

        for (var user of this.users){
            userName = user.userName;
            this.db.newGameHasUser({Game_idGame: this.idGame, User_username: userName},()=>{
                console.log('lägger till user i game_has_user', userName);
            });
        }
    }


    pressedRoll(){ // funktion då man trycker på knappen "Roll"

        $('#user').attr("disabled", true); // det ska inte gå att lägga till users när spelet har börjat
        this.users[this.currentUserPlaying].activeScoreBoard(); // aktiverar första spelarens scoreboard
        
        if(this.counter == 2){
            // set button "Roll" to inactive
            $('#roll').attr("disabled", true); 
        }
        this.dices.rollDice();

        this.users[this.currentUserPlaying].getDices(this.dices); // skickar diceList till currentUserPlaying

        if(this.counter == 0){
            this.users[this.currentUserPlaying].setScore((b1)=>{
                if(b1){
                    this.counter = 0;
                    this.dices.resetRoll();
                    $('#roll').attr("disabled", false);

                    if(this.currentUserPlaying == this.users.length-1){
                        this.currentUserPlaying = 0;
                    }else{
                        this.currentUserPlaying++;
                    }

                    this.gameDone();

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

    gameDone(){
        this.numberOfUsersDone++;
        console.log(this.numberOfUsersDone);
        console.log(this.users.length);
        if(this.numberOfUsersDone == this.users.length){

            //SpelId och alla användare sparas till DB
            this.saveGameRoundToDB();
        }
    }
    
    gameLoop(){
        
    }



    static get sqlQueries(){
        return {
            getGame: `
SELECT max(idGame) as maxGame FROM Game limit 1
`,        
            newGame: `
INSERT into Game SET ?
`,
            newGameHasUser: `
INSERT into Game_has_User SET ?
`
        }
    }
}
