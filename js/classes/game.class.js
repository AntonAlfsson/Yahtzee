class Game extends Base {

  constructor(){
      super();
      
      //var users = new UserList(); // skapar en userList
      //users.createUsers(); 
      
      this.dice = new Dice('dice1');
      
      
     // var dices = new DiceList(); // skapar dicelist
      this.counter = 0;
  }
    
    
    pressedRoll(){ // funktion då man trycker på knappen "Roll"
        this.counter++;
        if(this.counter == 3){
            // set button "Roll" to inactive
            $('#roll').attr("disabled", true);
            this.dice.rollDice();
           /* boolean b1 = users[0].setScore(()=>{
                if(b1){
                    alert('Game done!');
                }else{
                    this.counter = 1;
                }
            }); */
            
        }else{
            this.dice.rollDice();
        }
        
        //setTimeout(function(){ // timeout 1 sec för att vänta på rollDice metoden
            // uppdatera namn för html plats till dices och display dice
         //   $(document).find("#diceDiv").display(dices);
      //  }, 1000);
            
    }
}
