class Game extends Base {

  constructor(){
      super();
      //this.display('body'); // display this i body
      //var users = new UserList(); // skapar en userList
      //users.createUsers(); 
      
     // var dices = new DiceList(); // skapar dicelist
    
      
     // this.counter = 1;
      
  }
    
    
    pressedRoll(){ // funktion då man trycker på knappen "Roll"
        this.counter++;
        if(counter == 3){
            // set button "Roll" to inactive
         //   $document.getElementById("#Roll").disabled = true; 
          //  dices.rollDice();
           /* boolean b1 = users[0].setScore(()=>{
                if(b1){
                    alert('Game done!');
                }else{
                    this.counter = 1;
                }
            }); */
            
        }else{
           // dices.rollDice();
        }
        
        setTimeout(function(){ // timeout 1 sec för att vänta på rollDice metoden
            // uppdatera namn för html plats till dices och display dice
         //   $(document).find("#diceDiv").display(dices);
        }, 1000);
            
    }


}
