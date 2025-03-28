// Game state
const gameState = {
    nutrients: 100,
    distance: 0,
    population: 1,
    currentLocation: "Kamloops",
    day: 1,
    gameOver: false,
    canvas: null,
    ctx: null,
    slimeMold: {
        x: 50,
        y: 150,
        size: 20,
        color: "#FFD700",
        growthRate: 0.05,
        network: []
    },
    currentLocationIndex: 0,
    // Locations data
    locations: [
        {
            name: "Kamloops",
            distance: 0,
            description: "A city in the Thompson Valley where rivers meet. Warm and relatively dry.",
            terrain: "urban/valley",
            moisture: 30,
            nutrientAvailability: 40,
            obstacles: ["urban areas", "roads"],
            visitable: true,
            visited: true
        },
        {
            name: "Savona",
            distance: 40,
            description: "A small community at the western end of Kamloops Lake.",
            terrain: "lakeside",
            moisture: 50,
            nutrientAvailability: 45,
            obstacles: ["highway traffic"],
            visitable: false,
            visited: false
        },
        {
            name: "Cache Creek",
            distance: 80,
            description: "A village at the junction of Highways 1 and 97. Semi-arid conditions.",
            terrain: "arid/valley",
            moisture: 25,
            nutrientAvailability: 30,
            obstacles: ["dry soil", "highway junction"],
            visitable: false,
            visited: false
        },
        {
            name: "Lillooet",
            distance: 130,
            description: "A town situated on the Fraser River. Known for its hot, dry summers.",
            terrain: "river valley",
            moisture: 40,
            nutrientAvailability: 50,
            obstacles: ["steep terrain", "temperature fluctuations"],
            visitable: false,
            visited: false
        },
        {
            name: "Pemberton",
            distance: 200,
            description: "A village in a valley north of Whistler. Agricultural area with increased humidity.",
            terrain: "valley/agricultural",
            moisture: 65,
            nutrientAvailability: 70,
            obstacles: ["farmland chemicals", "human activity"],
            visitable: false,
            visited: false
        },
        {
            name: "Whistler",
            distance: 240,
            description: "Mountain resort town with abundant forests and moisture.",
            terrain: "mountain/forest",
            moisture: 75,
            nutrientAvailability: 60,
            obstacles: ["elevation changes", "tourist activity"],
            visitable: false,
            visited: false
        },
        {
            name: "Squamish",
            distance: 290,
            description: "Coastal mountain town where mountains meet the sea. High humidity.",
            terrain: "coastal/temperate rainforest",
            moisture: 85,
            nutrientAvailability: 75,
            obstacles: ["urban development", "wind"],
            visitable: false,
            visited: false
        },
        {
            name: "Vancouver",
            distance: 350,
            description: "Coastal city with mild, wet climate - perfect for slime molds!",
            terrain: "coastal/urban",
            moisture: 90,
            nutrientAvailability: 65,
            obstacles: ["urban density", "pollution"],
            visitable: false,
            visited: false
        }
    ],
    // Slime facts
    slimeFacts: [
        "Slime molds are not fungi but are classified as protists. They can move at speeds of up to 1cm per hour!",
        "Physarum polycephalum, or 'many-headed slime', can solve mazes and find the shortest path to food.",
        "Slime molds have no brain but can demonstrate a form of memory and learning.",
        "When food is scarce, individual slime mold cells can aggregate to form a larger organism.",
        "Slime molds can detect and move towards food sources, and away from harmful substances.",
        "In laboratory experiments, slime molds have recreated efficient transit networks similar to the Tokyo subway system.",
        "Some slime molds can survive in a dormant state for years when conditions are unfavorable.",
        "The bright yellow color of many slime molds serves as a warning to potential predators.",
        "Slime molds reproduce by releasing spores that can travel through air or water to start new colonies.",
        "Scientists have used slime molds to solve complex computational problems like finding optimal paths.",
        "The route from Kamloops to Vancouver includes dramatic changes in climate and elevation.",
        "The Coquihalla Highway between Kamloops and Vancouver is known for its steep grades and mountain passes.",
        "The journey from Kamloops to Vancouver passes through diverse ecosystems, from semi-arid grasslands to temperate rainforests.",
        "The Fraser River, which you'll encounter on your journey, is the longest river in British Columbia.",
        "The Coast Mountains, which you'll need to cross, create a rain shadow effect that makes Kamloops much drier than Vancouver."
    ]
};

// DOM Elements
const nutrientsValue = document.getElementById('nutrients-value');
const distanceValue = document.getElementById('distance-value');
const populationValue = document.getElementById('population-value');
const currentLocationEl = document.getElementById('current-location');
const locationDescriptionEl = document.getElementById('location-description');
const eventMessagesEl = document.getElementById('event-messages');
const slimeFactEl = document.getElementById('slime-fact');
const gameModal = document.getElementById('game-modal');
const startGameBtn = document.getElementById('start-game-btn');
const eventModal = document.getElementById('event-modal');
const eventTitle = document.getElementById('event-title');
const eventDescription = document.getElementById('event-description');
const eventChoices = document.getElementById('event-choices');
const gameCanvas = document.getElementById('game-canvas');

// Buttons
const forageBtn = document.getElementById('forage-btn');
const exploreBtn = document.getElementById('explore-btn');
const restBtn = document.getElementById('rest-btn');
const splitBtn = document.getElementById('split-btn');

// Initialize the game
function initGame() {
    // Set up canvas
    gameState.canvas = gameCanvas;
    gameState.ctx = gameCanvas.getContext('2d');
    
    // Set canvas dimensions
    gameCanvas.width = gameCanvas.parentElement.clientWidth;
    gameCanvas.height = gameCanvas.parentElement.clientHeight;
    
    // Set up events
    setupEvents();
    
    // Reset game state
    gameState.nutrients = 100;
    gameState.distance = 0;
    gameState.population = 1;
    gameState.day = 1;
    gameState.currentLocationIndex = 0;
    gameState.gameOver = false;
    
    // Reset locations
    gameState.locations.forEach((location, index) => {
        location.visited = index === 0;
        location.visitable = index === 0;
    });
    
    // Update UI
    updateUI();
    
    // Draw initial state
    draw();
    
    // Start the game loop
    gameLoop();
    
    // Show random slime fact
    showRandomSlimeFact();
    
    // Set up event listeners
    setupEventListeners();
}

// Set up events
function setupEvents() {
    gameState.events = [
        {
            title: "Fallen Log!",
            description: "You've discovered a decaying log full of nutrients and moisture!",
            choices: [
                {
                    text: "Absorb nutrients (+30 nutrients)",
                    effect: () => { changeNutrients(30); }
                },
                {
                    text: "Explore inside the log (chance for more rewards)",
                    effect: () => {
                        if (Math.random() > 0.5) {
                            changeNutrients(50);
                            logEvent("You found a nutrient-rich pocket inside the log! +50 nutrients");
                        } else {
                            changeNutrients(-10);
                            logEvent("You encountered a predatory beetle inside! -10 nutrients");
                        }
                    }
                }
            ]
        },
        {
            title: "Dry Patch Ahead",
            description: "The path ahead looks particularly dry and inhospitable.",
            choices: [
                {
                    text: "Take a detour through a longer but moister route",
                    effect: () => {
                        changeNutrients(-5);
                        logEvent("The detour was successful but cost you some energy. -5 nutrients");
                    }
                },
                {
                    text: "Push through the dry patch quickly",
                    effect: () => {
                        const success = Math.random() > 0.7;
                        if (success) {
                            changeDistance(5);
                            logEvent("You managed to cross the dry patch quickly! +5 km");
                        } else {
                            changeNutrients(-30);
                            logEvent("The dry conditions severely dehydrated your colony! -30 nutrients");
                        }
                    }
                },
                {
                    text: "Wait for rain",
                    effect: () => {
                        if (Math.random() > 0.6) {
                            changeNutrients(20);
                            logEvent("It rained! The moisture revitalized your colony. +20 nutrients");
                        } else {
                            logEvent("You waited, but no rain came. You lost a day of travel.");
                        }
                    }
                }
            ]
        },
        {
            title: "Highway Crossing",
            description: "You need to cross a busy highway to continue your journey.",
            choices: [
                {
                    text: "Cross at night when traffic is lighter",
                    effect: () => {
                        if (Math.random() > 0.4) {
                            changeDistance(10);
                            logEvent("You successfully crossed the highway under cover of darkness! +10 km");
                        } else {
                            changeNutrients(-20);
                            changePopulation(-0.5);
                            logEvent("A vehicle passed by, damaging part of your colony! -20 nutrients, -0.5 population");
                        }
                    }
                },
                {
                    text: "Use a culvert or drainage pipe under the road",
                    effect: () => {
                        changeDistance(5);
                        if (Math.random() > 0.7) {
                            changeNutrients(10);
                            logEvent("The culvert was damp and contained additional nutrients! +5 km, +10 nutrients");
                        } else {
                            logEvent("You safely crossed through the culvert. +5 km");
                        }
                    }
                }
            ]
        },
        {
            title: "Forest Discovery",
            description: "You've entered a dense forest area with multiple paths.",
            choices: [
                {
                    text: "Follow the forest floor (safe)",
                    effect: () => {
                        changeNutrients(15);
                        changeDistance(5);
                        logEvent("The forest floor provided steady nutrients and progress. +15 nutrients, +5 km");
                    }
                },
                {
                    text: "Climb up trees for a better view (risky)",
                    effect: () => {
                        if (Math.random() > 0.5) {
                            changeDistance(15);
                            changePopulation(0.5);
                            logEvent("From the higher vantage point, you found an optimal path! +15 km, +0.5 population");
                        } else {
                            changeNutrients(-25);
                            logEvent("The tree bark was too dry! You lost moisture and nutrients. -25 nutrients");
                        }
                    }
                }
            ]
        },
        {
            title: "Rain Shower",
            description: "A gentle rain begins to fall in your area.",
            choices: [
                {
                    text: "Absorb the moisture and continue",
                    effect: () => {
                        changeNutrients(25);
                        logEvent("The rain provides welcome moisture to your colony. +25 nutrients");
                    }
                },
                {
                    text: "Use the increased mobility to move faster",
                    effect: () => {
                        changeNutrients(10);
                        changeDistance(10);
                        logEvent("You glide efficiently through the wet environment! +10 nutrients, +10 km");
                    }
                }
            ]
        },
        {
            title: "Bacterial Growth",
            description: "You encounter a patch of bacteria that could be food or competition.",
            choices: [
                {
                    text: "Engulf and consume the bacteria",
                    effect: () => {
                        if (Math.random() > 0.3) {
                            changeNutrients(35);
                            logEvent("The bacteria provided excellent nutrients! +35 nutrients");
                        } else {
                            changeNutrients(-15);
                            logEvent("The bacteria were harmful to your colony! -15 nutrients");
                        }
                    }
                },
                {
                    text: "Avoid the bacteria and find another route",
                    effect: () => {
                        changeDistance(-5);
                        logEvent("You safely avoided the bacteria but had to backtrack. -5 km");
                    }
                }
            ]
        }
    ];
}

// Game loop
function gameLoop() {
    if (gameState.gameOver) return;
    
    draw();
    
    // Check if Vancouver reached
    if (gameState.distance >= 350) {
        winGame();
        return;
    }
    
    // Check if nutrients depleted
    if (gameState.nutrients <= 0) {
        loseGame("Your colony ran out of nutrients and died!");
        return;
    }
    
    // Check if population depleted
    if (gameState.population <= 0) {
        loseGame("Your colony's population dwindled to nothing!");
        return;
    }
    
    requestAnimationFrame(gameLoop);
}

// Draw game state
function draw() {
    const { ctx, canvas } = gameState;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background - terrain based on current location
    drawTerrain();
    
    // Draw progress bar
    drawProgressBar();
    
    // Draw slime mold
    drawSlimeMold();
}

// Update UI elements
function updateUI() {
    nutrientsValue.textContent = Math.floor(gameState.nutrients);
    distanceValue.textContent = Math.floor(gameState.distance);
    populationValue.textContent = gameState.population.toFixed(1);
    
    const location = gameState.locations[gameState.currentLocationIndex];
    currentLocationEl.textContent = location.name;
    locationDescriptionEl.textContent = location.description;
}

// Show random slime fact
function showRandomSlimeFact() {
    const randomIndex = Math.floor(Math.random() * gameState.slimeFacts.length);
    slimeFactEl.textContent = gameState.slimeFacts[randomIndex];
}

// Change nutrients
function changeNutrients(amount) {
    gameState.nutrients += amount;
    
    if (gameState.nutrients < 0) {
        gameState.nutrients = 0;
    }
    
    updateUI();
}

// Change distance
function changeDistance(amount) {
    const oldDistance = gameState.distance;
    gameState.distance += amount;
    
    if (gameState.distance < 0) {
        gameState.distance = 0;
    }
    
    // Check for reaching new locations
    gameState.locations.forEach((location, index) => {
        if (oldDistance < location.distance && gameState.distance >= location.distance) {
            gameState.currentLocationIndex = index;
            location.visited = true;
            location.visitable = true;
            
            // Update current location display
            logEvent(`You've reached ${location.name}!`);
            currentLocationEl.textContent = location.name;
            locationDescriptionEl.textContent = location.description;
            
            // Special event for reaching a new location
            if (Math.random() > 0.3) {
                triggerRandomEvent();
            }
        }
    });
    
    updateUI();
}

// Change population
function changePopulation(amount) {
    gameState.population += amount;
    
    if (gameState.population < 0) {
        gameState.population = 0;
    }
    
    updateUI();
}

// Log event to the event log
function logEvent(message) {
    const eventElement = document.createElement('p');
    eventElement.textContent = `Day ${gameState.day}: ${message}`;
    eventMessagesEl.prepend(eventElement);
    
    // Limit log size
    if (eventMessagesEl.children.length > 10) {
        eventMessagesEl.removeChild(eventMessagesEl.lastChild);
    }
}

// Set up event listeners
function setupEventListeners() {
    // Button actions
    forageBtn.addEventListener('click', forage);
    exploreBtn.addEventListener('click', explore);
    restBtn.addEventListener('click', rest);
    splitBtn.addEventListener('click', split);
    
    // Start game button
    startGameBtn.addEventListener('click', () => {
        gameModal.style.display = 'none';
        initGame();
    });
    
    // Window resize handler
    window.addEventListener('resize', () => {
        if (gameState.canvas) {
            gameState.canvas.width = gameState.canvas.parentElement.clientWidth;
            gameState.canvas.height = gameState.canvas.parentElement.clientHeight;
            draw();
        }
    });
}

// Start the game when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Show the welcome modal
    gameModal.style.display = 'block';
});
