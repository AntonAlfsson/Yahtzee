    class Game extends Base {

    constructor(){
        super();

       // this.users = new UserList(); // skapar en userList
        this.dices = new DiceList(); // skapar dicelist
        this.counter = 0;

       /* this.users.createUsers((l)=>{
            l && (this.users = l);
            var me = this;
            $(function(){
                console.log('me', me.users);
                //$('#score').append(me.users);
                //me.users.display('#score');
            });
        });*/
    }


    pressedRoll(){ // funktion då man trycker på knappen "Roll"
        this.counter++;
        $('#tarning').append(this.dices);
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
        }

    }

    insertGameInDb(){
        //Hämtar högsta idGame från databasen
        this.db.getGame([idGame], (data)=>{
            this.idGame = data[0].idGame;
            callback && callback(this);
        });

        //Spara variabel med nya spelets idGame
        var idGame = this.idGame + 1;

        //Sparar nya idGame i databasen
        this.db.newGame({ // skapas ett nytt game i DB
                        idGame: idGame
                    });
  }


    static get sqlQueries(){
        return {
            newUser: `
            INSERT User SET ?
`,
            getGame: `
            SELECT max(idGame) FROM Game
`
            newGame: `
            INSERT Game SET ?
`
        }
    }
}
