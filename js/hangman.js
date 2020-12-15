const con = document.createElement('div');
const br = document.createElement('br');
const guessedLettersCon = document.createElement('div');
const outputCon = document.createElement('div');
const guessesCon = document.createElement('div');
const hangmanTitle = document.createElement('h1');
const showPuzzle = document.createElement("span");
const showGuessedLetters = document.createElement("span");

hangmanTitle.textContent = "Hangman";

document.querySelector('body').appendChild(con);
con.appendChild(hangmanTitle);

class Hangman {
    constructor(word) {
        this.finalWord = word;
        this.word = word.toLowerCase().split('');
        this.maxLetters = 10;
        this.remainingGuesses = (this.maxLetters - this.finalWord.length);
        this.guessedLetters = [''];
        this.showGuesses = document.createElement('h3');
        this.showGuesses.textContent = `You have ${this.remainingGuesses} remaining guesses left`;
    }
    resetGameState() {
        setTimeout(() => {
            hangmanTitle.textContent = "Hangman";
            this.guessedLetters = [''];
            this.remainingGuesses = (this.maxLetters - this.finalWord.length);
            this.showGuesses.textContent = `You have ${this.remainingGuesses} remaining guesses left`;
            randomNum = Math.random() * (hangmanGames.length - 1);
            index = Math.round(randomNum);
            hangmanGames[index].getPuzzle();
        }, 3000);
    }
    getPuzzle() {
        let puzzle = '';

        this.word.forEach((letter) => {
            if (this.guessedLetters.includes(letter) || letter === ' ') {
                puzzle += letter;
            } else {
                puzzle += '*';
            }
        });
    
        if (puzzle === this.finalWord) {
            hangmanTitle.textContent = "Congrontulations, You WEEEEN";
            this.resetGameState();
        }
    
        showPuzzle.setAttribute('id', 'puzzle');
    
        showPuzzle.textContent = puzzle;
        showGuessedLetters.textContent = `Guessed Letters:${this.guessedLetters}`;
        this.showGuesses.textContent = `You have ${this.remainingGuesses} remaining guesses left`;
    
        if (!document.querySelector("#puzzle")) {
            guessedLettersCon.appendChild(showGuessedLetters);
            outputCon.appendChild(showPuzzle);
            guessesCon.appendChild(this.showGuesses);
        } else {
            guessedLettersCon.removeChild(showGuessedLetters);
            outputCon.removeChild(document.querySelector("#puzzle"));
            outputCon.appendChild(showPuzzle);
            guessedLettersCon.appendChild(showGuessedLetters);
        }
    }
    makeGuess(guess) {
        if (!this.guessedLetters.includes(guess)) {
            this.guessedLetters.forEach(() => {
                if (!this.guessedLetters.includes(guess)) {
                    this.guessedLetters.push(guess);
                }
            });
            if (!this.word.includes(guess)) {
                this.remainingGuesses -= 1;
                this.showGuesses.textContent = `You have ${this.remainingGuesses} remaining guesses left`;
                // Losing State
                if (this.remainingGuesses === 0) {
                    hangmanTitle.textContent = "Game Over";
                    this.resetGameState();
                }
            }
            hangmanGames[index].getPuzzle();
        }
    }
}

/*const req = new XMLHttpRequest();
        
req.addEventListener('readystatechange', (e) => {
    if (e.target.readyState === 4) {
        const res = JSON.parse(e.target.responseText);
        const game = new Hangman(res.puzzle);
        game.getPuzzle();
        window.addEventListener('keypress', (e) => {
            game.makeGuess(e.key);
        });
    }
});

req.open('GET', 'http://puzzle.mead.io/puzzle');
req.send();*/

// Hangman games
const game1 = new Hangman('dog');
const game2 = new Hangman('doggo');
const game3 = new Hangman('catto');

const hangmanGames = [game1, game2, game3];
let randomNum = Math.random() * (hangmanGames.length - 1);
let index = Math.round(randomNum);

window.addEventListener('keypress', (e) => {
    hangmanGames[index].makeGuess(e.key);
});

con.appendChild(guessedLettersCon);
con.appendChild(outputCon);
con.appendChild(guessesCon);

hangmanGames[index].getPuzzle();