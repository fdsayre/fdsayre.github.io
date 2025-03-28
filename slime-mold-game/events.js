/**
 * events.js - Event system
 * 
 * This file contains the event system for random encounters
 */

import { 
    changeNutrients, 
    changeDistance, 
    changePopulation 
} from './game-state.js';

import { uiManager } from './ui-manager.js';

// Game events array
let events = [];

// Setup events - Called during game initialization
export function setupEvents() {
    // Define all the game events
    events = [
        {
            title: "Fallen Log!",
            description: "You've discovered a decaying log full of nutrients and moisture!",
            choices: [
                {
                    text: "Absorb nutrients (+30 nutrients)",
                    effect: () => { 
                        changeNutrients(30);
                        uiManager.logEvent("You absorbed nutrients from the fallen log. +30 nutrients");
                    }
                },
                {
                    text: "Explore inside the log (chance for more rewards)",
                    effect: () => {
                        if (Math.random() > 0.5) {
                            changeNutrients(50);
                            uiManager.logEvent("You found a nutrient-rich pocket inside the log! +50 nutrients");
                        } else {
                            changeNutrients(-10);
                            uiManager.logEvent("You encountered a predatory beetle inside! -10 nutrients");
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
                        uiManager.logEvent("The detour was successful but cost you some energy. -5 nutrients");
                    }
                },
                {
                    text: "Push through the dry patch quickly",
                    effect: () => {
                        const success = Math.random() > 0.7;
                        if (success) {
                            changeDistance(5);
                            uiManager.logEvent("You managed to cross the dry patch quickly! +5 km");
                        } else {
                            changeNutrients(-30);
                            uiManager.logEvent("The dry conditions severely dehydrated your colony! -30 nutrients");
                        }
                    }
                },
                {
                    text: "Wait for rain",
                    effect: () => {
                        if (Math.random() > 0.6) {
                            changeNutrients(20);
                            uiManager.logEvent("It rained! The moisture revitalized your colony. +20 nutrients");
                        } else {
                            uiManager.logEvent("You waited, but no rain came. You lost a day of travel.");
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
                            uiManager.logEvent("You successfully crossed the highway under cover of darkness! +10 km");
                        } else {
                            changeNutrients(-20);
                            changePopulation(-0.5);
                            uiManager.logEvent("A vehicle passed by, damaging part of your colony! -20 nutrients, -0.5 population");
                        }
                    }
                },
                {
                    text: "Use a culvert or drainage pipe under the road",
                    effect: () => {
                        changeDistance(5);
                        if (Math.random() > 0.7) {
                            changeNutrients(10);
                            uiManager.logEvent("The culvert was damp and contained additional nutrients! +5 km, +10 nutrients");
                        } else {
                            uiManager.logEvent("You safely crossed through the culvert. +5 km");
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
                        uiManager.logEvent("The forest floor provided steady nutrients and progress. +15 nutrients, +5 km");
                    }
                },
                {
                    text: "Climb up trees for a better view (risky)",
                    effect: () => {
                        if (Math.random() > 0.5) {
                            changeDistance(15);
                            changePopulation(0.5);
                            uiManager.logEvent("From the higher vantage point, you found an optimal path! +15 km, +0.5 population");
                        } else {
                            changeNutrients(-25);
                            uiManager.logEvent("The tree bark was too dry! You lost moisture and nutrients. -25 nutrients");
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
                        uiManager.logEvent("The rain provides welcome moisture to your colony. +25 nutrients");
                    }
                },
                {
                    text: "Use the increased mobility to move faster",
                    effect: () => {
                        changeNutrients(10);
                        changeDistance(10);
                        uiManager.logEvent("You glide efficiently through the wet environment! +10 nutrients, +10 km");
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
                            uiManager.logEvent("The bacteria provided excellent nutrients! +35 nutrients");
                        } else {
                            changeNutrients(-15);
                            uiManager.logEvent("The bacteria were harmful to your colony! -15 nutrients");
                        }
                    }
                },
                {
                    text: "Avoid the bacteria and find another route",
                    effect: () => {
                        changeDistance(-5);
                        uiManager.logEvent("You safely avoided the bacteria but had to backtrack. -5 km");
                    }
                }
            ]
        },
        {
            title: "Mushroom Forest",
            description: "You've found a patch of mushrooms - distant relatives of your slime mold ancestors!",
            choices: [
                {
                    text: "Absorb nutrients from the mycelium network",
                    effect: () => {
                        if (Math.random() > 0.4) {
                            changeNutrients(40);
                            uiManager.logEvent("The fungi welcome you! You absorb nutrients from their network. +40 nutrients");
                        } else {
                            changeNutrients(-10);
                            uiManager.logEvent("The fungi defend themselves with chemicals! -10 nutrients");
                        }
                    }
                },
                {
                    text: "Follow the mycelium paths for guidance",
                    effect: () => {
                        changeDistance(15);
                        uiManager.logEvent("The mycelium network leads you along efficient paths! +15 km");
                    }
                }
            ]
        },
        {
            title: "Animal Encounter",
            description: "A curious animal has discovered your colony!",
            choices: [
                {
                    text: "Release spores as a distraction",
                    effect: () => {
                        changePopulation(-0.2);
                        changeDistance(8);
                        uiManager.logEvent("Your spore distraction worked! The animal loses interest. -0.2 population, +8 km");
                    }
                },
                {
                    text: "Remain still and hope it leaves",
                    effect: () => {
                        if (Math.random() > 0.5) {
                            uiManager.logEvent("The animal loses interest and wanders away.");
                        } else {
                            changeNutrients(-20);
                            uiManager.logEvent("The animal disturbs your colony before leaving! -20 nutrients");
                        }
                    }
                },
                {
                    text: "Try to hitch a ride",
                    effect: () => {
                        if (Math.random() > 0.7) {
                            changeDistance(30);
                            uiManager.logEvent("Success! The animal carries you much further along your journey! +30 km");
                        } else {
                            changePopulation(-0.5);
                            uiManager.logEvent("The animal brushes you off! Part of your colony is lost. -0.5 population");
                        }
                    }
                }
            ]
        }
    ];
    
    console.log('Events system set up with', events.length, 'events');
    return true;
}

// Get a random event
export function getRandomEvent() {
    if (events.length === 0) {
        setupEvents(); // Make sure events are set up
    }
    
    const randomIndex = Math.floor(Math.random() * events.length);
    return events[randomIndex];
}

// Make events available globally for debugging
window.gameEvents = { 
    events,
    getRandomEvent
};
