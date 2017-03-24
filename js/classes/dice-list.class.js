class DiceList extends List {

	constructor() {
        super(Dice);		
		
        this.createDices();
        
	}
    
    createDices(){
        for(var i = 1; i < 6; i++){
            var el = 'dice' + i;
            this.push(new Dice(el));
        }
    }

	rollDice() {

		for(var i = 0; i < 5; i++){
			this[i].rollDice();
			

		}
	}

	resetRoll() {

		for(var i = 0; i < 5; i++){
			this[i].reset();
		}
			
	}
 

 
}