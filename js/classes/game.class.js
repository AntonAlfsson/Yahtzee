class Game extends Base {

    constructor(){
        super();

        this.users = new UserList(); // skapar en userList
        this.dices = new DiceList(); // skapar dicelist
        this.counter = 0;
        this.game = this.startGame();
    }

    //Knappen Add users
    createUsers(){ 
        $('#addUser').html('');
        this.users.createUsers((user) => {
            setTimeout(function(){
                this.users = user;
                console.log(this.users);
                
                this.users.display('#addUser');
            }, 50);
        });

        //Ska hända efter att users har skapats för den här omgången - behöver hjälp med callback!
        this.game.saveGameRoundToDB();

    }


    startGame(){

        var tempIdGame = 0;
        var newIdGame = 0;

        //Hämtar högsta idGame från databasen
        this.db.getGame((data)=>{
            tempIdGame = data[0].maxGame;
            console.log('Hämtar högsta idGame från db', data);

            //Plussar på 
            newIdGame = tempIdGame+1;
        
            //Lägger till nytt game i databasen
            this.db.newGame({idGame: newIdGame}, (data)=>{
                console.log('Lägger till nytt game i db', data);
            });

        });

    }

    saveGameRoundToDB(){
        for (var user of userList){
            this.db.newGameHasUser((data)=>{
                User_username: user;
                Game_idGame: this.game;
            });
        }

    }


    pressedRoll(){ // funktion då man trycker på knappen "Roll"
        this.counter++;
        if(this.counter == 3){
            // set button "Roll" to inactive
            $('#roll').attr("disabled", true);
            this.dices.rollDice();
            
             this.users.setScore((b1)=>{
                 console.log(b1);
                if(b1){
                    alert('Game done!');
                }else{
                    this.counter = 0;
                    this.dices.resetRoll();
                    $('#roll').attr("disabled", false);
                }
            });
            

        }else{
            this.dices.rollDice();
            $('#user').attr("disabled", true); // det ska inte gå att lägga till users när spelet har börjat
        }

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
                INSERT into Game_has_user SET ?
`
        }
    }
}
