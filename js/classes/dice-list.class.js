class DiceList {

	constructor(diceList) {

		var dice1 = new Dice('1'); //skapa Dice
		var dice2 = new Dice('2');
		var dice3 = new Dice('3');
		var dice4 = new Dice('4');
		var dice5 = new Dice('5');

		this.diceList =[null, dice1 , dice2,dice3,dice4,dice5]; //array innehaller list av class Dices
		
		
	}

	rollDice() {

		for(var i = 1; i<this.diceList.length; i++){
			console.log(this.diceList);
			

		}
	}

	resetRoll() {

		for(var i = 0; i<this.diceList.length; i++){
			console.log(this.diceList);
		}
			
	}
 

 
}