class Dice extends Base {

    constructor(propertyValues){
        super();
        this.diceId = propertyValues;
        this.rollable = true;
        this.currentNumber = 1;
    }

    rollDice(){ // metod som kollar om tärningen går att kasta
        if(this.rollable){ // om den går att kasta kallar vi på metoden generateRandomNumber
            this.generateRandomNumber(); 
        }
    }

    generateRandomNumber(){
        this.currentNumber = Math.floor(Math.random() * 6 + 1); // genererar ett numer mellan 1 - 6
        var el = '#'+ this.diceId;
        switch(this.currentNumber){
            case 1:
                $(document).find(el).text("\u2680");
                break;
            case 2:
                $(document).find(el).text("\u2681");
                break;
            case 3:
                $(document).find(el).text("\u2682");
                break;
            case 4:
                $(document).find(el).text("\u2683");
                break;
            case 5:
                $(document).find(el).text("\u2684");
                break;
            case 6:
                $(document).find(el).text("\u2685");
                break;
        }

    }

    onDiceClick(){ // när man klickar på tärningen ändrar man om täningen skall gå att kasta eller ej
        if(this.rollable){
            this.rollable = false;
            var el = '#'+this.diceId;
            $(el).css('background',"grey"); // om man vill behålla tärningen blir den gråmarkerad
        }else{
            this.rollable = true;
            var el = '#'+this.diceId;
            $(el).css('background',"none"); // tar bort markering
        }
    }

    reset(){ // återställer tärningen till kastbar ---- tänkt att nvändas mellan varje runda
        this.rollable = true;
    }


}