class User {


	constructor(){
		var userName = '';

		var scoreList = [];

		startScoreList(scoreList); //Hämtar metod för att skapa listan med 18 tomma platser

	}


	function setScore(list){
	//Om något skrivs i input-fältet, returnera false
	$('.score').on('input', function(){
		return false;
	});

	//Loopar igenom listan och returnerar true om den är full - LYCKAS INTE MED DENNA
	for (var i = 0; i < list.length; i++){ 
		if ((list[i] !== '')){
			return true;
			}	
		}
	}

	//Kanske ett sätt att få en lista med 18 tomma platser?
	function startScoreList(list){
		for (var i = 0; i < 17; i++){
			list.push('');
		}
	}
}