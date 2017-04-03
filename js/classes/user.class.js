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
        this.checkForYatzy(diceNumber); // skickar dices till metoden som kontrollerar om det är yatzy
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
        $(this.class).removeAttr('placeholder');
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
        var one = 0;
        var two = 0;
        var three = 0;
        var four = 0;
        var five = 0;
        var six = 0;

        for (let i = 0; i < diceNumber.length; i++){ //Loopar tärningarna och räknar summa av varje siffra
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

            $(this.id+0).attr("placeholder", one); //Sätter placeholder till ones värde      
            $(this.id+1).attr("placeholder", two); //Sätter placeholder till twos värde
            $(this.id+2).attr("placeholder", three); //Sätter placeholder till threes värde
            $(this.id+3).attr("placeholder", four); //Sätter placeholder till fours värde
            $(this.id+4).attr("placeholder", five); //Sätter placeholder till fives värde
            $(this.id+5).attr("placeholder", six); //Sätter placeholder till six värde
        

            $(this.class).on('click', function(event){//Skapar event on click
                var el = '#' + event.target.id; //tar emot det som har klickats
                if($(el).attr('placeholder') != undefined && !$(el).attr('readonly')){ // kontrollerar att det ej är undefined
                    $(el).val($(el).attr('placeholder')); // hämtar det som står som placeholder och sätter till value
                    $(el).attr({'readonly': 'readonly'}); // sätter fältet till readonly = nu går det ej att ändra
                    $(el).trigger("change"); // triggar eventet change för att trigga event till listenern i metoden setScore
                }
            });
    }


    checkForYatzy(diceList){ // tar emot lista med nr från tärningar
        var yatzy = true;
        for(let i = 1; i < 5; i++){
            if(diceList[0] != diceList[i]){
                yatzy = false;
            }
        }

        if(yatzy){
            $(this.id+16).attr("placeholder", "50"); // sätter placeholder till 50
            
            $(this.class).on('click', function(event){ // skapar ett event on click
                var el = '#' + event.target.id; // tar emot det som klickats
                if($(el).attr('placeholder') != undefined && !$(el).attr('readonly')){ // kontrollerar att det ej är undefined
                    $(el).val($(el).attr('placeholder')); // hämtar det som står som placeholder och sätter till value
                    $(el).attr({'readonly': 'readonly'}); // sätter fältet till readonly = nu går det ej att ändra
                    $(el).trigger("change"); // triggar eventet change för att trigga event till listenern i metoden setScore
                } 
            });
        }
    }






}











