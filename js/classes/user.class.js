class User extends Base {


    constructor(name) {
        super();

        this.userName = name;
        this.scoreList = [];
        this.id = '#' + this.userName; // id till scoreboard

        this.startScoreList(); //Hämtar metod för att skapa listan med 18 tomma platser

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
        var el = this; // sparar this i el eftersom vi förlorar this scopet i nästa function
        //Om något skrivs i input-fältet, returnera false
        $('.form-control').on('change', function(){
            el.setTotalScore();
            callback(false);
        });
    }

    setTotalScore(){    
        var tot = 0;

        for(let i = 0; i < 17; i++){
            this.scoreList[i] = $(this.id+i).val();

            if($(this.id+i).val() != "" && this.id+i != this.id+6){
                tot += parseInt($(this.id+i).val());
            }
        }

        $(this.id+17).val(tot);
        this.setBonusHalfScore();  
    }

    setBonusHalfScore(){

        var bonus = 0;

        for(let i = 0; i < 6; i++){
            if($(this.id+i).val() != ""){
                bonus += parseInt($(this.id+i).val());
            }
        }
        $(this.id+6).val(bonus);
        if(bonus >= 63){
            $(this.id+7).val(50);
        }else{
            $(this.id+7).val(0);
        }
    }
}