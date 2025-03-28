/**
 * locations.js - Location data
 * 
 * This file contains the location data for the journey from Kamloops to Vancouver
 */

// Define locations along the route
export const locations = [
    {
        name: "Kamloops",
        distance: 0,
        description: "A city in the Thompson Valley where rivers meet. Grasslands and forests surround it.",
        terrain: "valley/forest",
        moisture: 30,
        nutrientAvailability: 40,
        obstacles: ["urban areas", "grasslands"],
        visitable: true,
        visited: true
    },
    {
        name: "Savona",
        distance: 40,
        description: "A small community at the western end of Kamloops Lake surrounded by forest.",
        terrain: "lakeside/forest",
        moisture: 50,
        nutrientAvailability: 45,
        obstacles: ["highway traffic"],
        visitable: false,
        visited: false
    },
    {
        name: "Cache Creek",
        distance: 80,
        description: "A village at the junction of Highways 1 and 97. Semi-arid grassland conditions.",
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
        description: "A town situated on the Fraser River. Surrounded by pine forests and mountains.",
        terrain: "river valley/forest",
        moisture: 40,
        nutrientAvailability: 50,
        obstacles: ["steep terrain", "temperature fluctuations"],
        visitable: false,
        visited: false
    },
    {
        name: "Pemberton",
        distance: 200,
        description: "A village in a valley north of Whistler. Agriculture and forests coexist here.",
        terrain: "valley/agricultural/forest",
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
        description: "Coastal mountain town where mountains meet the sea. Dense temperate rainforest.",
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
        description: "Coastal city with mild, wet climate. Urban areas interspersed with coastal forests.",
        terrain: "coastal/urban/forest",
        moisture: 90,
        nutrientAvailability: 65,
        obstacles: ["urban density", "pollution"],
        visitable: false,
        visited: false
    }
];

// Make locations available globally for debugging
window.gameLocations = locations;
