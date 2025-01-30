// GET ELEMENTS BY DOM
const CloseButton = document.querySelector('.CloseButton');
const RulesModal = document.getElementById('RulesModal');
const RulesButton = document.querySelector('.Rules');
const Rock = document.querySelector('.Rock');
const Paper = document.querySelector('.Paper');
const Scissors = document.querySelector('.Scissors');
const UserPickText = document.querySelector('.UserPickText');
const ComputerPickText = document.getElementById('ComputerPickText');
const ScoreCounter = document.querySelector('.ScoreCounter');

// Add this variable at the top with other declarations
let score = 0;

// Update the score display initially
ScoreCounter.textContent = 0;

// EVENT LISTENERS

// Function to get a random computer choice
function getComputerChoice() {
    const ComputerChoice = ['rock', 'paper', 'scissors'];
    return ComputerChoice[Math.floor(Math.random() * ComputerChoice.length)];
}

function getWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) return 'tie';
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'win';
    }
    return 'lose';
}

function handleChoice(selectedElement, otherElements) {
    // Disable hover effects
    document.querySelector('.UserChoices').classList.add('game-active');

    selectedElement.classList.add('selected');
    UserPickText.classList.add('visible');

    otherElements.forEach(element => {
        element.style.display = 'none';
    });

    // Get computer's choice after delay
    setTimeout(() => {
        const computerChoice = getComputerChoice();

        // Hide all house choices first
        document.querySelectorAll('.HouseChoice').forEach(el => {
            el.style.display = 'none';
        });

        // Show the selected house choice
        const houseElement = document.querySelector(`.HouseChoice.${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}`);
        houseElement.style.display = 'flex';
        document.querySelector('.ComputerPickText').classList.add('visible');

        // Show result after computer's choice appears
        setTimeout(() => {
            const result = getWinner(selectedElement.classList[1].toLowerCase(), computerChoice);
            const gameResult = document.querySelector('.GameResult');

            // Update score based on result
            if (result === 'win') {
                score += 1;
                gameResult.innerHTML = `<h2>YOU WIN</h2>`;
                gameResult.style.color = 'hsl(138, 100%, 50%)';
            } else if (result === 'lose') {
                score -= 1; // Prevent negative score
                gameResult.innerHTML = `<h2>YOU LOSE</h2>`;
                gameResult.style.color = 'hsl(349, 71%, 52%)';
            } else {
                gameResult.innerHTML = `<h2>DRAW</h2>`;
                gameResult.style.color = 'hsl(229, 64%, 46%)';
            }

            // Update score display
            ScoreCounter.textContent = score;
            updateScoreColor();

            gameResult.classList.add('visible');

            document.querySelector('.PlayAgain').classList.add('visible');
        }, 500);
    }, 1000);
}

// color the score based on the result of the game
function updateScoreColor(result) {
    if (score === 0) {
        ScoreCounter.style.color = 'hsl(229, 64%, 46%)';
    } else if (score < 0) {
        ScoreCounter.style.color = 'hsl(349, 71%, 52%)';
    } else {
        ScoreCounter.style.color = 'hsl(138, 100%, 50%)';
    }

}

// Add play again functionality
document.querySelector('.PlayAgainButton').addEventListener('click', () => {
    // Reset everything
    document.querySelector('.UserChoices').classList.remove('game-active');
    document.querySelectorAll('.visible').forEach(el => el.classList.remove('visible'));
    document.querySelectorAll('.HouseChoice').forEach(el => {
        el.style.display = 'none';
    });
    document.querySelectorAll('.UserChoice').forEach(el => {
        el.classList.remove('selected');
        el.style.display = 'flex';
    });
    document.querySelector('.GameResult').innerHTML = '';
});

Rock.addEventListener('click', () => {
    handleChoice(Rock, [Paper, Scissors]);
});

Paper.addEventListener('click', () => {
    handleChoice(Paper, [Rock, Scissors]);
});

Scissors.addEventListener('click', () => {
    handleChoice(Scissors, [Rock, Paper]);
});

// Rules section
RulesButton.addEventListener('click', () => {
    RulesModal.style.visibility = 'visible';
});

CloseButton.addEventListener("click", () => {
    RulesModal.style.visibility = 'hidden';
});