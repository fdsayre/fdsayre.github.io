/**
 * game-state.js - Game state management
 * 
 * This file contains the core game state and functions to manipulate it
 */

import { locations } from './data/locations.js';
import { slimeFacts } from './data/slime-facts.js';

// Custom event for game state changes
const GAME_STATE_CHANGED = 'gameStateChanged';

// Main game state object
export const gameState = {
    // Resources
    nutrients: 100,
    distance: 0,
    population: 1,
    
    // Game progress
    day: 1,
    currentLocationIndex: 0,
    currentLocation: "Kamloops",
    gameOver: false,
    
    // Canvas and rendering
    canvas: null,
    ctx: null,
    
    // Slime mold visual representation
    slimeMold: {
        x: 50,
        y: 150,
        size: 20,
        color: "#FFD700",
        growthRate: 0.05,
        network: []
    },
    
    // Game data
    locations: [],
    slimeFacts: [],
    events: []
};

// Initialize the game state
export function initializeGameState() {
    // Reset basic values
    gameState.nutrients = 100;
    gameState.distance = 0;
    gameState.population = 1;
    gameState.day = 1;
    gameState.currentLocationIndex = 0;
    gameState.currentLocation = "Kamloops";
    gameState.gameOver = false;
    
    // Set up canvas
    const gameCanvas = document.getElementById('game-canvas');
    gameState.canvas = gameCanvas;
    gameState.ctx = gameCanvas.getContext('2d');
    
    // Set canvas dimensions
    gameCanvas.width = gameCanvas.parentElement.clientWidth;
    gameCanvas.height = gameCanvas.parentElement.clientHeight;
    
    // Load locations data
    gameState.locations = [...locations];
    
    // Reset location visitation
    gameState.locations.forEach((location, index) => {
        location.visited = index === 0;
        location.visitable = index === 0;
    });
    
    // Load slime facts
    gameState.slimeFacts = [...slimeFacts];
    
    // Position slime mold on canvas
    gameState.slimeMold.x = gameCanvas.width * 0.25;
    gameState.slimeMold.y = gameCanvas.height * 0.6;
    
    console.log('Game state initialized');
    
    // Notify that game state has changed
    notifyStateChanged('init');
}

// Notify that game state has changed
function notifyStateChanged(property) {
    // Dispatch custom event
    document.dispatchEvent(new CustomEvent(GAME_STATE_CHANGED, { 
        detail: { property }
    }));
    
    // Update UI through the global uiManager if available
    if (window.uiManager && typeof window.uiManager.updateStats === 'function') {
        window.uiManager.updateStats();
    }
}

// Change nutrients
export function changeNutrients(amount) {
    const oldValue = gameState.nutrients;
    gameState.nutrients += amount;
    
    if (gameState.nutrients < 0) {
        gameState.nutrients = 0;
    }
    
    // Notify if value changed
    if (oldValue !== gameState.nutrients) {
        notifyStateChanged('nutrients');
    }
    
    return gameState.nutrients;
}

// Change distance
export function changeDistance(amount) {
    const oldDistance = gameState.distance;
    gameState.distance += amount;
    
    if (gameState.distance < 0) {
        gameState.distance = 0;
    }
    
    // Notify if value changed
    if (oldDistance !== gameState.distance) {
        notifyStateChanged('distance');
    }
    
    // Check for reaching new locations
    const locationReached = checkLocationProgress(oldDistance);
    
    return {
        newDistance: gameState.distance,
        locationReached
    };
}

// Check if we've reached a new location
function checkLocationProgress(oldDistance) {
    let locationReached = null;
    
    gameState.locations.forEach((location, index) => {
        if (oldDistance < location.distance && gameState.distance >= location.distance) {
            gameState.currentLocationIndex = index;
            gameState.currentLocation = location.name;
            location.visited = true;
            location.visitable = true;
            locationReached = location;
            
            // Notify that location has changed
            notifyStateChanged('location');
        }
    });
    
    return locationReached;
}

// Change population
export function changePopulation(amount) {
    const oldValue = gameState.population;
    gameState.population += amount;
    
    if (gameState.population < 0) {
        gameState.population = 0;
    }
    
    // Notify if value changed
    if (oldValue !== gameState.population) {
        notifyStateChanged('population');
    }
    
    return gameState.population;
}

// Advance day
export function advanceDay() {
    gameState.day += 1;
    
    // Passive nutrient consumption based on population
    const dailyConsumption = gameState.population * 2;
    changeNutrients(-dailyConsumption);
    
    // Notify that day has changed
    notifyStateChanged('day');
    
    return gameState.day;
}

// Get current location
export function getCurrentLocation() {
    return gameState.locations[gameState.currentLocationIndex];
}

// Add event listener for game state changes
export function addStateChangeListener(callback) {
    document.addEventListener(GAME_STATE_CHANGED, callback);
}

// Remove event listener for game state changes
export function removeStateChangeListener(callback) {
    document.removeEventListener(GAME_STATE_CHANGED, callback);
}

// Make game state available globally for debugging
window.gameState = gameState;
