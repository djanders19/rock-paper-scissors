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
            return (tie);
        }

        switch (lowerMove) {
            case "rock":
                if (computerMove === "scissors") {
                    return (playerWin);
                } else {
                    return (compWin);
                }
                break;
            case "paper":
                if (computerMove === "rock") {
                    return (playerWin);
                } else {
                    return (compWin);
                }
                break;
            case "scissors":
                if (computerMove === "paper") {
                    return (playerWin);
                } else {
                    return (compWin);
                }
                break;
            default:
                throw new Error("Not a valid argument to playRound. Please specify 'rock', 'scissors' or 'paper'");
        }
    }


}

class View {
    constructor() {
        // The root element:
        this.app = this.getElement('#root');

        // Title:
        this.title = this.createElement('h1');
        this.title.textContent = "MVC Rock/Paper/Scissors";
        this.app.append(this.title);

        this.scores = this.createElement('div')
        this.playerScore = this.createElement('h2');
        this.computerScore = this.createElement('h2');
        this.playerScore.textContent = '0';
        this.computerScore.textContent = '0';
        this.scores.append(this.playerScore, this.computerScore);
        this.app.append(this.scores);

        // Create a form
        this.form = this.createElement('form');

        // Create buttons for Rock, Paper and Scissors:
        this.rockButton = this.createElement('button');
        this.rockButton.textContent = 'Rock';
        this.rockButton.type = 'button';
        this.paperButton = this.createElement('button');
        this.paperButton.textContent = 'Paper';
        this.paperButton.type = 'button';
        this.scissorButton = this.createElement('button');
        this.scissorButton.textContent = 'Scissors';
        this.scissorButton.type = 'button';

        this.form.append(this.rockButton, this.paperButton, this.scissorButton);
        this.app.append(this.form);
    }

    get _playerScore() {
        return this.playerScore.textContent;
    }

    get _compScore() {
        return this.computerScore.textContent;
    }

    // Create an element with an optional CSS class
    createElement(tag, className) {
        const element = document.createElement(tag)
        if (className) element.classList.add(className)

        return element
    }

    // Retrieve an element from the DOM
    getElement(selector) {
        const element = document.querySelector(selector)

        return element
    }

    displayScores(playerScore, compScore) {
        this.playerScore.textContent = playerScore;
        this.computerScore.textContent = compScore;
    }
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