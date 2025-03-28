/**
 * main.js - Entry point for Slime Mold on the Run game
 * 
 * This file initializes the game, loads modules, and sets up event listeners
 */

// Import game modules
import { gameState, initializeGameState } from './game-state.js';
import { setupRenderer, draw } from './renderer.js';
import { setupActions } from './actions.js';
import { setupEvents } from './events.js';
import { setupUI, updateUI } from './ui-manager.js';

// DOM Elements for game controls
const startGameBtn = document.getElementById('start-game-btn');
const gameModal = document.getElementById('game-modal');

// Initialize game
function initGame() {
    console.log('Initializing game...');
    
    // Initialize game state
    initializeGameState();
    
    // Set up game systems
    setupRenderer();
    setupActions();
    setupEvents();
    setupUI();
    
    // Update UI with initial state
    updateUI();
    
    // Start game loop
    gameLoop();
    
    console.log('Game initialized!');
}

// Game loop
function gameLoop() {
    if (gameState.gameOver) return;
    
    // Draw the current state
    draw();
    
    // Check win/lose conditions
    checkGameConditions();
    
    // Continue loop
    requestAnimationFrame(gameLoop);
}

// Check win/lose conditions
function checkGameConditions() {
    // Win condition - reached Vancouver
    if (gameState.distance >= 350) {
        winGame();
        return;
    }
    
    // Lose condition - out of nutrients
    if (gameState.nutrients <= 0) {
        loseGame("Your colony ran out of nutrients and died!");
        return;
    }
    
    // Lose condition - population died
    if (gameState.population <= 0) {
        loseGame("Your colony's population dwindled to nothing!");
        return;
    }
}

// Win game
function winGame() {
    gameState.gameOver = true;
    
    // This will be implemented in ui-manager.js
    window.uiManager.showWinScreen();
}

// Lose game
function loseGame(reason) {
    gameState.gameOver = true;
    
    // This will be implemented in ui-manager.js
    window.uiManager.showLoseScreen(reason);
}

// Set up event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Show welcome modal
    gameModal.style.display = 'block';
    
    // Start game button
    startGameBtn.addEventListener('click', () => {
        gameModal.style.display = 'none';
        initGame();
    });
});

// Make game loop available globally for debugging
window.gameLoop = gameLoop;
