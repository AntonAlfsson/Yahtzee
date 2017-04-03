class User extends Base {


    constructor(name) {
        super();

        this.userName = name;
        this.scoreList = [];
        this.id = '#' + this.userName; // id till scoreboard
        this.class = '.' + this.userName;

        this.startScoreList(); //Hämtar metod för att skapa listan med 18 tomma platser

    }

    //Kanske ett sätt att få en lista med 18 tomma platser?
    startScoreList(){
        for (var i = 0; i < 18; i++){
            this.scoreList.push('');
        }
    }
    
    getDices(dices){
        var diceNumber = [dices[0].currentNumber, dices[1].currentNumber, dices[2].currentNumber, dices[3].currentNumber, dices[4].currentNumber];
        // nu har vi diceNumber med alla nr från seaste kastet att skicka vidare in i metoder
        console.log('kast: ', diceNumber);

        this.checkFor123456(diceNumber);
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

    checkFor123456(diceNumber){
        console.log(diceNumber);

        var one = 0;
        var two = 0;
        var three = 0;
        var four = 0;
        var five = 0;
        var six = 0;

        for (let i = 0; i < diceNumber.length; i++){
            if (diceNumber[i]===1)
                one++;
            else if (diceNumber[i]===2)
                two=two+2;
            else if (diceNumber[i]===3)
                three=three+3;
            else if (diceNumber[i]===4)
                four=four+4;
            else if (diceNumber[i]===5)
                five=five+5;
            else if (diceNumber[i]===6)
                six=six+6;
        }

        console.log('Summa 1: ', one, 'Summa 2: ', two, 'Summa 3: ', three, 'Summa 4: ', four, 'Summa 5: ', five, 'Summa 6: ', six);

        //Skriv ut om inte är noll
        

        //Vänta på klick





    }



}