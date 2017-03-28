class User extends Base {


	constructor(name) {
		super();

		this.userName = name;

		this.scoreList = [];

		this.startScoreList(); //Hämtar metod för att skapa listan med 18 tomma platser
        var el = '#' + this.userName;

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
}