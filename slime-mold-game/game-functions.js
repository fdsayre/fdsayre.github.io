// Game functions

// Forage action
function forage() {
    // Consume some nutrients to forage
    changeNutrients(-5);
    
    // Get current location
    const location = gameState.locations[gameState.currentLocationIndex];
    
    // Calculate nutrients gained based on location's nutrient availability
    const nutrientsGained = (5 + Math.random() * 15) * (location.nutrientAvailability / 50);
    changeNutrients(nutrientsGained);
    
    logEvent(`Foraged for food in ${location.name}. Spent 5 nutrients and found ${Math.floor(nutrientsGained)} nutrients.`);
    
    // Small chance of special discovery
    if (Math.random() > 0.8) {
        triggerRandomEvent();
    }
    
    advanceDay();
}

// Explore action
function explore() {
    // Consume nutrients to explore
    changeNutrients(-10);
    
    // Calculate progress
    const distanceGained = 5 + Math.random() * 10;
    
    // Move forward
    changeDistance(distanceGained);
    
    logEvent(`Explored ahead and moved forward ${Math.floor(distanceGained)} km. -10 nutrients`);
    
    // Chance of finding something interesting
    if (Math.random() > 0.6) {
        triggerRandomEvent();
    }
    
    advanceDay();
}

// Rest action
function rest() {
    // Recover nutrients
    const nutrientsRecovered = 15 + Math.random() * 10;
    changeNutrients(nutrientsRecovered);
    
    // Small chance of population growth
    if (Math.random() > 0.7) {
        changePopulation(0.2);
        logEvent(`Rested and recovered ${Math.floor(nutrientsRecovered)} nutrients. Your colony grew slightly! +0.2 population`);
    } else {
        logEvent(`Rested and recovered ${Math.floor(nutrientsRecovered)} nutrients.`);
    }
    
    advanceDay();
}

// Split action
function split() {
    // Can only split if population is at least 1.5
    if (gameState.population < 1.5) {
        logEvent("Your colony is too small to split. Need at least 1.5 population.");
        return;
    }
    
    // Split the colony
    changePopulation(-0.5);
    
    // Distance boost from splitting
    const distanceGained = 15 + Math.random() * 10;
    changeDistance(distanceGained);
    
    logEvent(`Split part of your colony to explore ahead! -0.5 population, +${Math.floor(distanceGained)} km`);
    
    // Higher chance of event when splitting
    if (Math.random() > 0.4) {
        triggerRandomEvent();
    }
    
    advanceDay();
}

// Advance a day
function advanceDay() {
    gameState.day += 1;
    
    // Passive nutrient consumption based on population
    const dailyConsumption = gameState.population * 2;
    changeNutrients(-dailyConsumption);
    
    // Random event chance each day
    if (Math.random() > 0.8) {
        triggerRandomEvent();
    }
    
    // Show a new slime fact occasionally
    if (gameState.day % 3 === 0) {
        showRandomSlimeFact();
    }
}

// Trigger a random event
function triggerRandomEvent() {
    // Get a random event
    const randomIndex = Math.floor(Math.random() * gameState.events.length);
    const event = gameState.events[randomIndex];
    
    // Set up event modal
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
            
            // Advance the day (unless this is from another action that already advances the day)
            if (!gameState.fromAction) {
                advanceDay();
            }
        });
        eventChoices.appendChild(button);
    });
    
    // Show the modal
    eventModal.style.display = 'block';
}

// Win game
function winGame() {
    gameState.gameOver = true;
    
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
        initGame();
    });
    eventChoices.appendChild(replayBtn);
    
    // Show the event modal
    eventModal.style.display = 'block';
}

// Lose game
function loseGame(reason) {
    gameState.gameOver = true;
    
    eventTitle.textContent = "Game Over";
    eventDescription.innerHTML = `
        <p>${reason}</p>
        <p>Your journey has ended after ${gameState.day} days.</p>
        <p>Final stats:</p>
        <ul>
            <li>Distance traveled: ${Math.floor(gameState.distance)} km</li>
            <li>Final location: ${gameState.locations[gameState.currentLocationIndex].name}</li>
        </ul>
    `;
    
    // Clear choices and add replay button
    eventChoices.innerHTML = '';
    const replayBtn = document.createElement('button');
    replayBtn.textContent = "Try Again";
    replayBtn.addEventListener('click', () => {
        eventModal.style.display = 'none';
        initGame();
    });
    eventChoices.appendChild(replayBtn);
    
    // Show the event modal
    eventModal.style.display = 'block';
}
