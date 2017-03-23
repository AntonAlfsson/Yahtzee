class App {

  constructor(){
      this.start();
  }

    start(){

        this.game = new Game();


        this.game.display('body');

        var router = new Router({

          '/': ()=>{ this.showPage(this.game); }
            
        });

      }

      // page is an instance of a class
      // all classes have the display method (inherited from Base)
      showPage(page){
        $('.page-content').empty();
        page.display('.page-content');
      }
}
