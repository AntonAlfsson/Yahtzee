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
        $(this.class).removeAttr('placeholder');
        
        var diceNumber = [dices[0].currentNumber, dices[1].currentNumber, dices[2].currentNumber, dices[3].currentNumber, dices[4].currentNumber];
        // nu har vi diceNumber med alla nr från seaste kastet att skicka vidare in i metoder
        
        $(this.class).on('click', function(event){ // skapar ett event on click
            var el = '#' + event.target.id; // tar emot det som klickats
            if($(el).attr('placeholder') != undefined && !$(el).attr('readonly')){ // kontrollerar att det ej är undefined
                $(el).val($(el).attr('placeholder')); // hämtar det som står som placeholder och sätter till value
                $(el).attr({'readonly': 'readonly'}); // sätter fältet till readonly = nu går det ej att ändra
                $(el).trigger("change"); // triggar eventet change för att trigga event till listenern i metoden setScore
            }
        });

        this.checkForYatzy(diceNumber); // skickar dices till metoden som kontrollerar om det är yatzy
        this.checkFor123456(diceNumber);
        this.checkFor1par(diceNumber);
        this.checkForFyrtal(diceNumber);
        this.checkForTretal(diceNumber);
        this.checkForSmallStraight(diceNumber);
        this.checkForHouse(diceNumber);
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

            if($(this.id+i).val() != "" && $(this.id+i).val() != "-" && this.id+i != this.id+6){
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
            if($(this.id+i).val() != "" && $(this.id+i).val() != "-"){
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
            if (diceNumber[i] === 1)
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
        
        console.log(one, two, three, four, five, six);
        
        if(one == 0){
            $(this.id+0).attr("placeholder", '-');
        }else{
            $(this.id+0).attr("placeholder", one); //Sätter placeholder till ones värde
        }

        if(two == 0){
            $(this.id+1).attr("placeholder", '-');
        }else{
            $(this.id+1).attr("placeholder", two); //Sätter placeholder till twos värde
        }

        if(three == 0){
            $(this.id+2).attr("placeholder", '-');
        }else{
            $(this.id+2).attr("placeholder", three); //Sätter placeholder till threes värde
        }

        if(four == 0){
            $(this.id+3).attr("placeholder", '-');
        }else{
            $(this.id+3).attr("placeholder", four); //Sätter placeholder till fours värde
        }

        if(five == 0){
            $(this.id+4).attr("placeholder", '-');
        }else{
            $(this.id+4).attr("placeholder", five); //Sätter placeholder till fives värde
        }

        if(six == 0){
            $(this.id+5).attr("placeholder", '-');
        }else{
            $(this.id+5).attr("placeholder", six); //Sätter placeholder till six värde
        }
    }

    checkFor1par(diceList){
        var one = 0;
        var two = 0;
        var three = 0;
        var four = 0;
        var five = 0;
        var six = 0;

        for(let i = 0; i < diceList.length; i++){
            if(diceList[i] === 1){
                one++;
            }
            else if(diceList[i] === 2){
                two += 2;
            }
            else if(diceList[i] === 3){
                three += 3;
            }
            else if(diceList[i] === 4){
                four += 4;
            }
            else if(diceList[i] === 5){
                five += 5;
            }
            else{
                six += 6;
            }
        }

        if(six >= 12){
            $(this.id+8).attr('placeholder', '12');
        }
        else if(five >= 10){
            $(this.id+8).attr('placeholder', '10');
        }
        else if(four >= 8){
            $(this.id+8).attr('placeholder', '8');
        }
        else if(three >= 6){
            $(this.id+8).attr('placeholder', '6');
        }
        else if(two >= 4){
            $(this.id+8).attr('placeholder', '4');
        }
        else if(one >= 2){
            $(this.id+8).attr('placeholder', '2');
        }
        else{
            $(this.id+8).attr('placeholder', '-');
        }
    }

    checkForTretal(diceList){
        var one = 0;
        var two = 0;
        var three = 0;
        var four = 0;
        var five = 0;
        var six = 0;

        for(let i = 0; i < diceList.length; i++){
            if(diceList[i] === 1){
                one++;
            }
            else if(diceList[i] === 2){
                two += 2;
            }
            else if(diceList[i] === 3){
                three += 3;
            }
            else if(diceList[i] === 4){
                four += 4;
            }
            else if(diceList[i] === 5){
                five += 5;
            }
            else{
                six += 6;
            }
        }

        if(one >= 3){
            $(this.id+10).attr('placeholder', '3');
        }
        else if(two >= 6){
            $(this.id+10).attr('placeholder', '6');
        }
        else if(three >= 9){
            $(this.id+10).attr('placeholder', '9');
        }
        else if(four >= 12){
            $(this.id+10).attr('placeholder', '12');
        }
        else if(five >= 15){
            $(this.id+10).attr('placeholder', '15');
        }
        else if(six >= 18){
            $(this.id+10).attr('placeholder', '18');
        }
        else{
            $(this.id+10).attr('placeholder', '-');
        }

    }

    checkForFyrtal(diceList){

        var one = 0;
        var two = 0;
        var three = 0;
        var four = 0;
        var five = 0;
        var six = 0;

        for(let i = 0; i < diceList.length; i++){
            if(diceList[i] === 1){
                one++;
            }
            else if(diceList[i] === 2){
                two += 2;
            }
            else if(diceList[i] === 3){
                three += 3;
            }
            else if(diceList[i] === 4){
                four += 4;
            }
            else if(diceList[i] === 5){
                five += 5;
            }
            else{
                six += 6;
            }
        }

        if(one >= 4){
            console.log(one);
            $(this.id+11).attr('placeholder', '4');
        }
        else if(two >= 8){
            $(this.id+11).attr('placeholder', '8');
        }
        else if(three >= 12){
            $(this.id+11).attr('placeholder', '12');
        }
        else if(four >= 16){
            $(this.id+11).attr('placeholder', '16');
        }
        else if(five >= 20){
            $(this.id+11).attr('placeholder', '20');
        }
        else if(six >= 24){
            $(this.id+11).attr('placeholder', '24');
        }
        else{
            $(this.id+11).attr('placeholder', '-');
        }

    }

    checkForHouse(diceNumber){

        var one = 0;
        var two = 0;
        var three = 0;
        var four = 0;
        var five = 0;
        var six = 0;

        var twoOfTheSame = false;
        var threeOfTheSame = false;

        //Går igenom diceNumber och ser hur många det finns av varje sort
        for(let i = 0; i < diceNumber.length; i++){
           if(diceNumber[i] === 1){
                one++;
            }
            else if(diceNumber[i] === 2){
                two += 2;
            }
            else if(diceNumber[i] === 3){
                three += 3;
            }
            else if(diceNumber[i] === 4){
                four += 4;
            }
            else if(diceNumber[i] === 5){
                five += 5;
            }
            else{
                six += 6;
            }
        }

        //Om det finns två av något, ändra twoOfTheSame till true
        if (one === 2 || two === 4 || three === 6 || four === 8 || five === 10 || six === 12){
            twoOfTheSame = true;
        }
        //Om det finns tre av något, ändra threeOfTheSame till true
        if (one === 3 || two === 6 || three === 9 || four === 12 || five === 15 || six === 18){
            threeOfTheSame = true;
        }

        //Räkna ihop totalen av alla tärningar
        var diceNumberSum = one+two+three+four+five+six;

        //Om båda villkoren uppfylls, skriv ut totalen i score board
        if (twoOfTheSame && threeOfTheSame){
            $(this.id+12).attr('placeholder', diceNumberSum);
        }else{
            $(this.id+12).attr('placeholder', '-');
        }

    }

    checkForSmallStraight(diceNumber){
        var smallStraightList = [1, 2, 3, 4, 5];//Definierar hur en small straight ser ut

        diceNumber.sort(function(a, b){return a - b});//Sorterar tärningarna i nummerordning

        var match = true;

        for (var i = 0; i < diceNumber.length; i++){ //Loopar genom båda arrayerna 
            if (diceNumber[i] !== smallStraightList[i]){
                match = false;
            }          
        }
        if (match){
            $(this.id+13).attr("placeholder", 15);//Sätter placeholder till small straights värde
        }else{ 
            $(this.id+13).attr('placeholder', '-'); //Skriver ut "-"
        } 

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
        }else{
            $(this.id+16).attr("placeholder", "-"); // sätter placeholder till -
        }
    }
}
