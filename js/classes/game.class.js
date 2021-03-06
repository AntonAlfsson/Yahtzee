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

    newGame(){
        var areYouSure = confirm('Are you sure?');

        if(areYouSure){
            $('.middle').remove();
            this.users = new UserList();
            $('#user').attr("data-click", 'createUsers');
            $('#roll').attr("disabled", true);
            $('#addUser').html('');
            this.counter = 0;
            this.dices.resetRoll();
            this.currentUserPlaying = 0;
            this.numberOfUsersDone = 0;
            this.startGame();
        }
    }

    startGame(){

        var tempIdGame = 0;

        //Hämtar högsta idGame från databasen
        this.db.getGame((data)=>{
            tempIdGame = data[0].maxGame;

            //Plussar på
            this.idGame = tempIdGame+1;
        });

    }

    //Knappen Add users
    createUsers(){
        var thisGame = this;
        if(this.users.length <= 3){

            $('#addUser').html('');
            this.users.createUsers((user) => {
                //Efter att funktionen createUsers har kört klart, så gör de här sakerna:
                setTimeout(function(){
                    this.users = user;

                    if(!this.users.length == 0){ // kollar att det finns minst 1 user annars fortsätter knappen roll att vara disabled
                        $('#roll').attr("disabled", false);
                    }
                    this.users.display('#addUser');
                    var maxH=0;
                    $('table').each(function(){if($(this).height() > maxH){maxH = $(this).height();}})
                    $('table').height(maxH);
                }, 50);

            });

        }
    }

    //Sparar data i Game_has_user
    saveGameRoundToDB(){
        var userName;

        for (var user of this.users){
            userName = user.userName;
            this.db.newGameHasUser({Game_idGame: this.idGame, User_username: userName, score: user.scoreList[17]},()=>{
                console.log('lägger till user i game_has_user', userName);
            });
        }
    }


    pressedRoll(){ // funktion då man trycker på knappen "Roll"
        $('#user').attr("data-click", ''); // det ska inte gå att lägga till users när spelet har börjat
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

        if(this.numberOfUsersDone == this.users.length){
            $('#roll').attr("disabled", true);

            //Lägger till nytt game i databasen
            this.db.newGame({idGame: this.idGame}, ()=>{
                //SpelId och alla användare sparas till DB
                this.saveGameRoundToDB();

            });

            $('.gamePage').append('<div class="middle"><h1 class="animated zoomIn">Game Done!</h1></div>').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {

            });
        }
    }

    highscoreList(){
        var list = {};

        this.db.getHighscore( (data)=>{
            for(let i = 0; i < data.length; i++){
                let j = i + 1;
                $('.name'+i).text(j + '. ' + data[i].User_userName + ' ' + data[i].score + 'p');
            }
        });
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
`,
            getHighscore: `
SELECT User_userName, score FROM Game_has_User ORDER BY score DESC LIMIT 10
`
        }
    }
}
