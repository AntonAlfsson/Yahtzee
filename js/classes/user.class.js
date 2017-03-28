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
    setScore(callback){

        //Loopar igenom listan och returnerar true om den är full
        for (var i = 0; i < this.scoreList.length; i++){ 
            if ((this.scoreList[i] !== '')){
                callback(true);
            }	
        }

        console.log("setScore is active");
        //Om något skrivs i input-fältet, returnera false
        $('.form-control').on('change', function(){
            console.log("skrivet!");
            callback(false);
        });
    }
}