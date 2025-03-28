/**
 * actions.js - Game actions
 * 
 * This file contains all the action functions for the game (forage, explore, rest, split)
 */

import { 
    gameState, 
    changeNutrients, 
    changeDistance, 
    changePopulation, 
    advanceDay, 
    getCurrentLocation 
} from './game-state.js';

import { uiManager } from './ui-manager.js';
import { getRandomEvent } from './events.js';

// DOM elements for buttons
const forageBtn = document.getElementById('forage-btn');
const exploreBtn = document.getElementById('explore-btn');
const restBtn = document.getElementById('rest-btn');
const splitBtn = document.getElementById('split-btn');

// Setup action buttons
export function setupActions() {
    // Add event listeners to buttons
    forageBtn.addEventListener('click', forageAction);
    exploreBtn.addEventListener('click', exploreAction);
    restBtn.addEventListener('click', restAction);
    splitBtn.addEventListener('click', splitAction);
    
    console.log('Actions set up');
    return true;
}

// Forage action
function forageAction() {
    // Consume some nutrients to forage
    changeNutrients(-5);
    
    // Get current location
    const location = getCurrentLocation();
    
    // Calculate nutrients gained based on location's nutrient availability
    const nutrientsGained = (5 + Math.random() * 15) * (location.nutrientAvailability / 50);
    changeNutrients(nutrientsGained);
    
    // Make sure UI is updated
    uiManager.updateStats();
    
    uiManager.logEvent(`Foraged for food in ${location.name}. Spent 5 nutrients and found ${Math.floor(nutrientsGained)} nutrients.`);
    
    // Small chance of special discovery
    if (Math.random() > 0.8) {
        triggerRandomEvent();
    }
    
    advanceDay();
    
    // Ensure UI is updated after action
    uiManager.updateStats();
}

// Explore action
function exploreAction() {
    // Consume nutrients to explore
    changeNutrients(-10);
    
    // Calculate progress
    const distanceGained = 5 + Math.random() * 10;
    
    // Move forward
    const result = changeDistance(distanceGained);
    
    // Make sure UI is updated
    uiManager.updateStats();
    
    uiManager.logEvent(`Explored ahead and moved forward ${Math.floor(distanceGained)} km. -10 nutrients`);
    
    // If we reached a new location, log it
    if (result.locationReached) {
        uiManager.logEvent(`You've reached ${result.locationReached.name}!`);
        
        // Special event for reaching a new location
        if (Math.random() > 0.3) {
            triggerRandomEvent();
        }
    } else {
        // Regular chance of finding something interesting
        if (Math.random() > 0.6) {
            triggerRandomEvent();
        }
    }
    
    advanceDay();
    
    // Ensure UI is updated after action
    uiManager.updateStats();
}

// Rest action
function restAction() {
    // Recover nutrients
    const nutrientsRecovered = 15 + Math.random() * 10;
    changeNutrients(nutrientsRecovered);
    
    // Small chance of population growth
    if (Math.random() > 0.7) {
        changePopulation(0.2);
        uiManager.logEvent(`Rested and recovered ${Math.floor(nutrientsRecovered)} nutrients. Your colony grew slightly! +0.2 population`);
    } else {
        uiManager.logEvent(`Rested and recovered ${Math.floor(nutrientsRecovered)} nutrients.`);
    }
    
    advanceDay();
    
    // Ensure UI is updated after action
    uiManager.updateStats();
}

// Split action
function splitAction() {
    // Can only split if population is at least 1.5
    if (gameState.population < 1.5) {
        uiManager.logEvent("Your colony is too small to split. Need at least 1.5 population.");
        return;
    }
    
    // Split the colony
    changePopulation(-0.5);
    
    // Distance boost from splitting
    const distanceGained = 15 + Math.random() * 10;
    const result = changeDistance(distanceGained);
    
    // Make sure UI is updated
    uiManager.updateStats();
    
    uiManager.logEvent(`Split part of your colony to explore ahead! -0.5 population, +${Math.floor(distanceGained)} km`);
    
    // If we reached a new location, log it
    if (result.locationReached) {
        uiManager.logEvent(`You've reached ${result.locationReached.name}!`);
        
        // Special event for reaching a new location
        if (Math.random() > 0.3) {
            triggerRandomEvent();
        }
    } else {
        // Higher chance of event when splitting
        if (Math.random() > 0.4) {
            triggerRandomEvent();
        }
    }
    
    advanceDay();
    
    // Ensure UI is updated after action
    uiManager.updateStats();
}

// Trigger a random event
function triggerRandomEvent() {
    const event = getRandomEvent();
    if (event) {
        uiManager.showEventModal(event);
    }
}

// Export actions for debugging
export const actions = {
    forage: forageAction,
    explore: exploreAction,
    rest: restAction,
    split: splitAction,
    triggerRandomEvent
};

// Make actions available globally for debugging
window.gameActions = actions;
