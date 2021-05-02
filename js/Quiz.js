class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide()

   background("black")

    textSize(20)
    fill("yellow")
    text("THE RESULT OF THE QUIZ IS:",370,100)
    text("~~~~~~~~~~~~~~~~~~~~~~~~~",370,120)

    Contestant.getPlayerInfo()

    if(allContestants !== undefined){
      fill("lightblue")
      textSize(15)
      var y=230
      text("*NOTE: CONTESTANT WHO ANSWERED CORRECT ARE HIGHLIGHTED IN GREEN COLOUR",20,230)
      for(var plr in allContestants){
        var correctAns = "2"
        y=y+40
        if(correctAns===allContestants[plr].answer){
          fill("green")
        }
        else{
          fill("red")
        }
        text(allContestants[plr].name+" : "+allContestants[plr].answer,250,y)
      }
    }

    

    
  }

}
