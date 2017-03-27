class Game extends Base {

    constructor(){
        super();

       // this.users = new UserList(); // skapar en userList
        this.dices = new DiceList(); // skapar dicelist
        this.counter = 0;

       /* this.users.createUsers((l)=>{
            l && (this.users = l);
            var me = this;
            $(function(){
                console.log('me', me.users);
                //$('#score').append(me.users);
                //me.users.display('#score');
            });
        });*/
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

    }

    static get sqlQueries(){
        return {
            newUser: `
INSERT User SET ?
`
        }
    }
}
