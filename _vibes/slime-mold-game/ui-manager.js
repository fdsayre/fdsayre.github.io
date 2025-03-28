/**
 * ui-manager.js - UI updates and management
 * 
 * This file handles UI updates, event messages, modals, etc.
 */

import { gameState, getCurrentLocation, addStateChangeListener } from './game-state.js';

// DOM elements
const nutrientsValue = document.getElementById('nutrients-value');
const distanceValue = document.getElementById('distance-value');
const populationValue = document.getElementById('population-value');
const currentLocationEl = document.getElementById('current-location');
const locationDescriptionEl = document.getElementById('location-description');
const eventMessagesEl = document.getElementById('event-messages');
const slimeFactEl = document.getElementById('slime-fact');

// Modal elements
const gameModal = document.getElementById('game-modal');
const eventModal = document.getElementById('event-modal');
const eventTitle = document.getElementById('event-title');
const eventDescription = document.getElementById('event-description');
const eventChoices = document.getElementById('event-choices');

// UI Manager object
export const uiManager = {
    // Log an event message
    logEvent(message) {
        const eventElement = document.createElement('p');
        eventElement.textContent = `Day ${gameState.day}: ${message}`;
        eventMessagesEl.prepend(eventElement);
        
        // Limit log size
        if (eventMessagesEl.children.length > 10) {
            eventMessagesEl.removeChild(eventMessagesEl.lastChild);
        }
        
        // Update the UI after logging an event
        this.updateStats();
    },
    
    // Update stats display
    updateStats() {
        nutrientsValue.textContent = Math.floor(gameState.nutrients);
        distanceValue.textContent = Math.floor(gameState.distance);
        populationValue.textContent = gameState.population.toFixed(1);
        
        // Update location if needed
        const location = getCurrentLocation();
        currentLocationEl.textContent = location.name;
        locationDescriptionEl.textContent = location.description;
    },
    
    // Show a random slime fact
    showRandomSlimeFact() {
        const randomIndex = Math.floor(Math.random() * gameState.slimeFacts.length);
        slimeFactEl.textContent = gameState.slimeFacts[randomIndex];
    },
    
    // Show an event modal
    showEventModal(event) {
        eventTitle.textContent = event.title;
        eventDescription.textContent = event.description;
        
        // Clear previous choices
        eventChoices.innerHTML = '';
        
        // Add choices to modal
        event.choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice.text;
            button.addEventListener('click', () => {
                // Execute the choice effect
                choice.effect();
                
                // Close the modal
                eventModal.style.display = 'none';
                
                // Make sure UI is updated after choice
                this.updateStats();
            });
            eventChoices.appendChild(button);
        });
        
        // Show the modal
        eventModal.style.display = 'block';
    },
    
    // Show win screen
    showWinScreen() {
        eventTitle.textContent = "Victory!";
        eventDescription.innerHTML = `
            <p>Congratulations! Your slime mold colony has successfully traveled from Kamloops to Vancouver!</p>
            <p>After ${gameState.day} days of travel, your colony has established itself in the moist, temperate climate of Vancouver, where it will thrive.</p>
            <p>Final stats:</p>
            <ul>
                <li>Days traveled: ${gameState.day}</li>
                <li>Final population: ${gameState.population.toFixed(1)}</li>
                <li>Nutrients remaining: ${Math.floor(gameState.nutrients)}</li>
            </ul>
        `;
        
        // Clear choices and add replay button
        eventChoices.innerHTML = '';
        const replayBtn = document.createElement('button');
        replayBtn.textContent = "Play Again";
        replayBtn.addEventListener('click', () => {
            eventModal.style.display = 'none';
            window.location.reload(); // Simplest way to restart the game
        });
        eventChoices.appendChild(replayBtn);
        
        // Show the modal
        eventModal.style.display = 'block';
    },
    
    // Show lose screen
    showLoseScreen(reason) {
        eventTitle.textContent = "Game Over";
        eventDescription.innerHTML = `
            <p>${reason}</p>
            <p>Your journey has ended after ${gameState.day} days.</p>
            <p>Final stats:</p>
            <ul>
                <li>Distance traveled: ${Math.floor(gameState.distance)} km</li>
                <li>Final location: ${getCurrentLocation().name}</li>
            </ul>
        `;
        
        // Clear choices and add replay button
        eventChoices.innerHTML = '';
        const replayBtn = document.createElement('button');
        replayBtn.textContent = "Try Again";
        replayBtn.addEventListener('click', () => {
            eventModal.style.display = 'none';
            window.location.reload(); // Simplest way to restart the game
        });
        eventChoices.appendChild(replayBtn);
        
        // Show the modal
        eventModal.style.display = 'block';
    }
};

// Setup UI function - called at game initialization
export function setupUI() {
    // Set up listener for game state changes
    addStateChangeListener(() => {
        uiManager.updateStats();
    });
    
    // Set up safety interval for UI updates
    setupSafetyInterval();
    
    console.log('UI set up');
    return true;
}

// Set up safety interval for UI updates
function setupSafetyInterval() {
    // Update UI every 2 seconds as a fallback mechanism
    setInterval(() => {
        uiManager.updateStats();
    }, 2000);
}

// Update UI with current game state
export function updateUI() {
    // Initial update
    uiManager.updateStats();
    
    // Show a random slime fact on first update
    uiManager.showRandomSlimeFact();
}

// Make uiManager available globally
window.uiManager = uiManager;
