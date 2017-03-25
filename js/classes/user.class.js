class User extends Base {


	constructor(){

		super();

		this.userName = '';

		this.scoreList = [];

		//this.startScoreList(); //Hämtar metod för att skapa listan med 18 tomma platser

	}


	//Kanske ett sätt att få en lista med 18 tomma platser?
	startScoreList(){
		for (var i = 0; i < 18; i++){
			this.scoreList.push('');
		}
	}

	//Hämtas av en annan klass och returnerar true eller false
	setScore(){
		console.log("setScore is active");
	//Om något skrivs i input-fältet, returnera false
	$('.score').on('input', function(){
		console.log("skrivet!");
		return false;
	});

	//Loopar igenom listan och returnerar true om den är full
	for (var i = 0; i < this.scoreList.length; i++){ 
		if ((this.scoreList[i] !== '')){
			return true;
			}	
		}
	}

	//Räknar ut bonussumma och lägger till 50 när summan blir över 63
	totalSum(){

		var bonusSum = 0;
		var totalSum = 0;

		//Räknar ut bonussumma
		for (var i = 0; i < this.scoreList.length-12; i++){
			bonusSum = bonusSum + this.scoreList[i];
		}

		//Lägger till totalen för bonussumman i arrayen 
		this.scoreList[6] = bonusSum;

		//Delar ut bonus om bonussumman är över 63
		if (bonusSum >= 63){			
			this.scoreList[7] = 50;
		}
		else{
			this.scoreList[7] = 0;
		}

		//Räknar ut totalsumman
		for (var j = 6; j < this.scoreList.length; j++){
			totalSum = totalSum + this.scoreList[j	];
		}

		//Lägger till totalsumman i arrayen
		this.scoreList[17] = totalSum;

		return totalSum;
	}

}
