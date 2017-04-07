class Dice extends Base {

    constructor(propertyValues){
        super();
        this.diceId = propertyValues; // läger diceId som id i this html template
        this.rollable = true;
        this.currentNumber = 1; // numret som tärningen för tillfället har
    }

    rollDice(){ // metod som kollar om tärningen går att kasta
        var el = '#' + this.diceId;
        $(el).off(); // stänger av föregående listener
        var _this = this; // sparar this i _this då jag förlorar scopet i listenern
        
        $(el).bind( "click", function() { // startar en ny listener
            _this.onDiceClick(); // kallar på metoden onDiceClick
        });
        
        if(this.rollable){ // om den går att kasta kallar vi på metoden generateRandomNumber
            this.generateRandomNumber(); 

            //här lägger vi till och tar class 'animated shake' som får tärningarna att skaka när de rollas
            $('#'+this.diceId).addClass('animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                $(this).removeClass('animated shake');
            });
        }
    }

    generateRandomNumber(){
        // genererar ett numer mellan 1 - 6
        this.currentNumber = Math.floor(Math.random() * 6 + 1); 
        switch(this.currentNumber){
            case 1:
                $('div[name=' + this.diceId + ']').removeClass();
                $('div[name=' + this.diceId + ']').addClass('show-front');
                break;
            case 2:
                $('div[name=' + this.diceId + ']').removeClass();
                $('div[name=' + this.diceId + ']').addClass('show-back');
                break;
            case 3:
                $('div[name=' + this.diceId + ']').removeClass();
                $('div[name=' + this.diceId + ']').addClass('show-right');
                break;
            case 4:
                $('div[name=' + this.diceId + ']').removeClass();
                $('div[name=' + this.diceId + ']').addClass('show-left');
                break;
            case 5:
                $('div[name=' + this.diceId + ']').removeClass();
                $('div[name=' + this.diceId + ']').addClass('show-top');
                break;
            case 6:
                $('div[name=' + this.diceId + ']').removeClass();
                $('div[name=' + this.diceId + ']').addClass('show-bottom');
                break;
        }

    }

    onDiceClick(){ // när man klickar på tärningen ändrar man om täningen skall gå att kasta eller ej
        
        if(this.rollable){
            this.rollable = false;
            var el = '#'+this.diceId; // sparar dice id i el tillsammans med # för att söka efter
            $(el).css('background',"grey"); // om man vill behålla tärningen blir den gråmarkerad
        }else{
            this.rollable = true;
            var el = '#'+this.diceId;
            $(el).css('background',"none"); // tar bort markering
        }
    }

    reset(){ // återställer tärningen till kastbar ---- tänkt att nvändas mellan varje runda
        this.rollable = true;
        var el =  '#' + this.diceId;
        $(el).off();
       // var el = '#'+this.diceId; // sparar dice id i el tillsammans med # för att söka efter
        //$(el).css('background',"none");
        //$(document).find(el).text("");
    }


}