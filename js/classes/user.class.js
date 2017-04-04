class User extends Base {


    constructor(name) {
        super();

        this.userName = name;
        this.scoreList = [];
        this.id = '#' + this.userName; // id till scoreboard
        this.class = '.' + this.userName;

        this.startScoreList(); //Hämtar metod för att skapa listan med 18 tomma platser

    }

    saveToDb(gameId){
        console.log(gameId);
        console.log(this.userName); 
        var finalScore = this.scoreList[17];
        console.log(finalScore);
        console.log(this.scoreList[17]);
       
        this.db.newGameHasScore({Game_idGame: gameId, User_userName:this.userName, score:finalScore}, ()=> {
            console.log(finalScore);
        });


    }

 

    //Kanske ett sätt att få en lista med 18 tomma platser?
    getScore(){
       
        console.log("hi for userside");
        
    }

    startScoreList(){
        for (var i = 0; i < 18; i++){
            this.scoreList.push('');
        }
    }
    
    getDices(dices){
        var diceNumber = [dices[0].currentNumber, dices[1].currentNumber, dices[2].currentNumber, dices[3].currentNumber, dices[4].currentNumber];
        // nu har vi diceNumber med alla nr från seaste kastet att skicka vidare in i metoder
        console.log('kast: ', diceNumber);
    }
    
    activeScoreBoard(){
        $(this.class).removeAttr('disabled');
    }

    //Hämtas av en annan klass och returnerar true eller false
    setScore(callback){
        var el = this; // sparar this i el eftersom vi förlorar this scopet i nästa function
        //Om något skrivs i input-fältet, returnera false
        $(this.class).on('change', function(){
            el.setTotalScore((b1)=>{
                callback(b1);
            });
        });
    }

    setTotalScore(callback){  
        $(this.class).attr({'disabled': 'disabled'});
        $(this.class).off();
        var tot = 0;

        for(let i = 0; i < 17; i++){
            this.scoreList[i] = $(this.id+i).val();

            if($(this.id+i).val() != "" && this.id+i != this.id+6){
                tot += parseInt($(this.id+i).val());
            }
        }

        $(this.id+17).val(tot);
        this.scoreList[17] = tot;
        this.setBonusHalfScore();  
        
        var b1 = true;
        for(let i = 0; i < 17; i++){
            if(this.scoreList[i] == ""){
                b1 = false;
            }
        }
        return callback(b1);
        
        
    }

    setBonusHalfScore(){

        var bonus = 0;

        for(let i = 0; i < 6; i++){
            if($(this.id+i).val() != ""){
                bonus += parseInt($(this.id+i).val());
            }
        }
        $(this.id+6).val(bonus);
        if(bonus >= 63){
            $(this.id+7).val(50);
        }else{
            $(this.id+7).val(0);
        }
    }

    static get sqlQueries(){
        return{
            newGameHasScore: `
            INSERT into Game_has_User SET ?
`
        }
    }
}