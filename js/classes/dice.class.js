class Dice extends Base {

  constructor(){
      super();
      var rollable = true;
      var currentNumber = 1;
  }
    
    rollDice(){ // metod som kollar om tärningen går att kasta
        if(this.rollable){ // om den går att kasta kallar vi på metoden generateRandomNumber
            this.generateRandomNumber(); 
        }
    }
    
    generateRandomNumber(){
        this.currentNumber = Math.floor(Math.random() * 6 + 1); // genererar ett numer mellan 1 - 6
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