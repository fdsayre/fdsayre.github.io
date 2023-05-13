/* game.js */

let score = 0;
let round = 1;
let turn = 0;
let totalTurns = 10;
let nextRoundButton = document.getElementById('next-round');
let skyImage = document.getElementById('sky-image');

// Array of emojis representing various life events
let emojis = ["🌳", "👪", "💼", "🎉", "😊", "🌧️", "🤒", "🚗", "🌈", "🌪️"];

document.getElementById('take-photo').onclick = increaseScore;
document.getElementById('check-email').onclick = increaseScore;
document.getElementById('meditate').onclick = increaseScore;
document.getElementById('eat-ice-cream').onclick = increaseScore;

nextRoundButton.onclick = nextRound;
document.getElementById('end-game').onclick = endGame;

function increaseScore() {
    if(turn < totalTurns) {
        score++;
        turn++;
        document.getElementById('score-box').innerText = 'Score: ' + score;
        document.getElementById('turn-box').innerText = 'Turn: ' + turn + '/' + totalTurns;
        // Change the emoji in the central box to a random one from the array
        let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        skyImage.innerText = randomEmoji;
        if(turn === totalTurns) {
            nextRoundButton.style.display = 'block';
        }
    }
}

function nextRound() {
    if(turn === totalTurns) {
        round++;
        document.getElementById('round-box').innerText = 'Round: ' + round;
        resetGame();
    }
}

function endGame() {
    alert('Thank you for playing! Your final score is: ' + score);
    resetGame();
}

function resetGame() {
    score = 0;
    turn = 0;
    nextRoundButton.style.display = 'none';
    document.getElementById('score-box').innerText = 'Score: ' + score;
    document.getElementById('turn-box').innerText = 'Turn: ' + turn + '/' + totalTurns;
    // Reset the emoji in the central box to a random one from the array
    let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    skyImage.innerText = randomEmoji;
}

// Set initial emoji
let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
skyImage.innerText = randomEmoji;
