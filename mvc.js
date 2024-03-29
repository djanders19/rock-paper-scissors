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
                    this.playerScore = this.playerScore + 1;
                    return (playerWin);
                } else {
                    this.compScore = this.compScore + 1;
                    return (compWin);
                }
                break;
            case "paper":
                if (computerMove === "rock") {
                    this.playerScore = this.playerScore + 1;
                    return (playerWin);
                } else {
                    this.compScore = this.compScore + 1;
                    return (compWin);
                }
                break;
            case "scissors":
                if (computerMove === "paper") {
                    this.playerScore = this.playerScore + 1;
                    return (playerWin);
                } else {
                    this.compScore = this.compScore + 1;
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
        this.labelPlayerScore = this.createElement("h2");
        this.labelPlayerScore.textContent = "Player score:"
        this.playerScore = this.createElement('h3');
        this.labelCompScore = this.createElement("h2");
        this.labelCompScore.textContent = "Computer score:"
        this.computerScore = this.createElement('h3');
        this.playerScore.textContent = '0';
        this.computerScore.textContent = '0';
        this.scores.append(this.labelPlayerScore, this.playerScore, this.labelCompScore, this.computerScore);
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

    // Event listeners:
    bindRock(handler) {
        this.rockButton.addEventListener('click', event => {
            event.preventDefault()

            handler();
        })
    }

    bindPaper(handler) {
        this.paperButton.addEventListener('click', event => {
            event.preventDefault()

            handler();
        })
    }

    bindScissors(handler) {
        this.scissorButton.addEventListener('click', event => {
            event.preventDefault()

            handler();
        })
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

        // Display initial scores:
        this.onScoreChange(this.model.playerScore, this.model.compScore);

        // Add event listeners:
        this.view.bindRock(this.handleRock);
        this.view.bindPaper(this.handlePaper);
        this.view.bindScissors(this.handleScissors);
    }

    // When rock/paper/scissor buttons clicked in view,
    // tell model to play a round with the input.

    // When model returns output from a round, update score
    // in view. To start with, don't worry about numrounds
    // or winning overall game, just keep track of the score
    onScoreChange = (playerScore, compScore) => {
        this.view.displayScores(playerScore, compScore);
    }

    // Event handlers:
    handleRock = () => {
        console.log('firing rock handler')
        this.model.playRound('rock');
        this.view.displayScores(this.model.playerScore, this.model.compScore);
    }

    handlePaper = () => {
        this.model.playRound('paper');
        this.view.displayScores(this.model.playerScore, this.model.compScore);
    }

    handleScissors = () => {
        this.model.playRound('scissors');
        this.view.displayScores(this.model.playerScore, this.model.compScore);
    }
}

const app = new Controller(new Model(), new View())