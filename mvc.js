const playerWin = 1;
const compWin = 0;
const tie = -1;

class Model {
    constructor() {
        this.rounds = 3;
        this.round = 0;
        this.playerScore = 0;
        this.compScore = 0;
    }

    computerPlay() {
        let choice = Math.ceil(Math.random() * 3);
    
        switch (choice) {
            case 1:
                return "rock";
            case 2:
                return "paper";
            case 3:
                return "scissors";
        }
    }

    playRound(playerMove) {
        let lowerMove = playerMove.toLowerCase();
        let computerMove = this.computerPlay();

        if (lowerMove === computerMove) {
            return(tie);
        }
    
        switch (lowerMove) {
            case "rock":
                if (computerMove === "scissors") {
                    return(playerWin);
                } else {
                    return(compWin);
                }
                break;
            case "paper":
                if (computerMove === "rock") {
                    return(playerWin);
                } else {
                    return(compWin);
                }
                break;
            case "scissors":
                if (computerMove === "paper") {
                    return(playerWin);
                } else {
                    return(compWin);
                }
                break;
            default:
                throw new Error("Not a valid argument to playRound. Please specify 'rock', 'scissors' or 'paper'");
        }
    }


  }
  
  class View {
    constructor() {}
  }
  
  class Controller {
    constructor(model, view) {
      this.model = model
      this.view = view
    }

    // When rock/paper/scissor buttons clicked in view,
    // tell model to play a round with the input.

    // When model returns output from a round, update score
    // in view. To start with, don't worry about numrounds
    // or winning overall game, just keep track of the score
  }
  
  const app = new Controller(new Model(), new View())