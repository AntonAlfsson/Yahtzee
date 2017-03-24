class Game extends Base {

  constructor(){
      super();
      
      //var users = new UserList(); // skapar en userList
      //users.createUsers(); 
      
      this.dices = new DiceList(); // skapar dicelist
      this.counter = 0;
  }
    
    
    pressedRoll(){ // funktion då man trycker på knappen "Roll"
        this.counter++;
        $('#tarning').append(this.dices);
        if(this.counter == 3){
            // set button "Roll" to inactive
            $('#roll').attr("disabled", true);
            this.dices.rollDice();
           /* boolean b1 = users[0].setScore(()=>{
                if(b1){
                    alert('Game done!');
                }else{
                    this.counter = 1;
                }
            }); */
            
        }else{
            this.dices.rollDice();
        }
        
        //setTimeout(function(){ // timeout 1 sec för att vänta på rollDice metoden
            // uppdatera namn för html plats till dices och display dice
         //   $(document).find("#diceDiv").display(dices);
      //  }, 1000);
            
    }
}
