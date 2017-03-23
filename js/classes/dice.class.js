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
            console.log('roll'); 
        }
    }

    generateRandomNumber(){
        this.currentNumber = Math.floor(Math.random() * 6 + 1); // genererar ett numer mellan 1 - 6
        switch(this.currentNumber){
            case 1:
                $(document).find("#dice1").text("\u2680");
                break;
            case 2:
                $(document).find("#dice1").text("\u2681");
                break;
            case 3:
                $(document).find("#dice1").text("\u2682");
                break;
            case 4:
                $(document).find("#dice1").text("\u2683");
                break;
            case 5:
                $(document).find("#dice1").text("\u2684");
                break;
            case 6:
                $(document).find("#dice1").text("\u2685");
                break;
        }

        console.log(this.currentNumber); 

    }

    onDiceClick(){ // när man klickar på tärningen ändrar man om täningen skall gå att kasta eller ej
        if(this.rollable){
            this.rollable = false;
        }else{
            this.rollable = true;
        }
    }

    reset(){ // återställer tärningen till kastbar ---- tänkt att nvändas mellan varje runda
        this.rollable = true;
    }


}