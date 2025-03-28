/**
 * renderer.js - Canvas rendering for the game
 * 
 * This file handles drawing the game state to the canvas
 */

import { gameState, getCurrentLocation } from './game-state.js';

// Fixed positions for landscape elements (to prevent jittering)
const fixedElements = {
    trees: [],
    buildings: [],
    mountains: {
        firstPeak: 0,
        secondPeak: 0
    },
    initialized: false
};

// Set up the renderer
export function setupRenderer() {
    // Initialize fixed positions for landscape elements
    initializeFixedElements();
    console.log('Renderer set up');
    return true;
}

// Initialize fixed elements positions
function initializeFixedElements() {
    const { canvas } = gameState;
    
    if (!canvas || fixedElements.initialized) return;
    
    // Trees - pre-generate positions (more trees for BC's landscape)
    const numTrees = 45; // More trees for the BC landscape
    for (let i = 0; i < numTrees; i++) {
        fixedElements.trees.push({
            x: Math.random() * canvas.width,
            y: canvas.height * 0.6 - 10,
            height: 20 + Math.random() * 30,
            type: Math.random() > 0.3 ? 'pine' : 'deciduous' // Mix of tree types
        });
    }
    
    // Buildings - pre-generate positions (fewer buildings)
    const numBuildings = 3; // Fewer buildings, only for urban areas
    for (let i = 0; i < numBuildings; i++) {
        fixedElements.buildings.push({
            x: canvas.width * 0.2 + i * canvas.width * 0.3,
            height: 40 + Math.random() * 60,
            width: 30 + Math.random() * 20
        });
    }
    
    // Mountains
    fixedElements.mountains.firstPeak = canvas.width * 0.3;
    fixedElements.mountains.secondPeak = canvas.width * 0.7;
    
    fixedElements.initialized = true;
}

// Main draw function - calls all the rendering functions
export function draw() {
    const { ctx, canvas } = gameState;
    
    if (!ctx || !canvas) return;
    
    // Re-initialize if needed (e.g., after window resize)
    if (!fixedElements.initialized) {
        initializeFixedElements();
    }
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background - terrain based on current location
    drawTerrain();
    
    // Draw progress bar
    drawProgressBar();
    
    // Draw slime mold
    drawSlimeMold();
}

// Draw terrain based on current location
function drawTerrain() {
    const { ctx, canvas } = gameState;
    const location = getCurrentLocation();
    
    // Sky gradient
    const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.6);
    skyGradient.addColorStop(0, "#87CEEB");
    skyGradient.addColorStop(1, "#E0F7FA");
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height * 0.6);
    
    // Ground based on terrain type
    let groundColor;
    switch (location.terrain) {
        case "urban/valley":
            groundColor = "#A9BE70"; // More greenish for valley
            break;
        case "lakeside":
            groundColor = "#8FBC8F";
            break;
        case "arid/valley":
            groundColor = "#D2B48C";
            break;
        case "river valley":
            groundColor = "#A9BE70"; // More greenish for valley
            break;
        case "valley/agricultural":
            groundColor = "#9ACD32";
            break;
        case "mountain/forest":
            groundColor = "#228B22";
            break;
        case "coastal/temperate rainforest":
            groundColor = "#2E8B57";
            break;
        case "coastal/urban":
            groundColor = "#4682B4";
            break;
        default:
            groundColor = "#8FBC8F";
    }
    
    // Draw ground
    ctx.fillStyle = groundColor;
    ctx.fillRect(0, canvas.height * 0.6, canvas.width, canvas.height * 0.4);
    
    // Draw terrain features
    // Always draw some trees (BC is known for forests)
    drawForest(location.terrain.includes("forest") || location.terrain.includes("rainforest") ? 1.0 : 0.6);
    
    // Other terrain features
    if (location.terrain.includes("mountain")) {
        drawMountains();
    }
    
    if (location.terrain.includes("lakeside") || location.terrain.includes("river")) {
        drawWater();
    }
    
    // Only draw urban features in urban areas, and fewer of them
    if (location.terrain.includes("urban")) {
        drawUrbanFeatures();
    }
}

// Draw urban features
function drawUrbanFeatures() {
    const { ctx, canvas } = gameState;
    
    // Draw buildings - using fixed positions to prevent jittering
    for (let i = 0; i < fixedElements.buildings.length; i++) {
        const building = fixedElements.buildings[i];
        
        ctx.fillStyle = "#555";
        ctx.fillRect(building.x, canvas.height * 0.6 - building.height, building.width, building.height);
        
        // Windows
        ctx.fillStyle = "#FFF";
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 4; k++) {
                ctx.fillRect(
                    building.x + 5 + j * 10, 
                    canvas.height * 0.6 - building.height + 10 + k * 15, 
                    5, 
                    8
                );
            }
        }
    }
    
    // Draw road
    ctx.fillStyle = "#333";
    ctx.fillRect(0, canvas.height * 0.7, canvas.width, 15); // Thinner road
    
    // Road markings
    ctx.fillStyle = "#FFF";
    for (let i = 0; i < canvas.width; i += 30) {
        ctx.fillRect(i, canvas.height * 0.7 + 7, 15, 2);
    }
}

// Draw mountains
function drawMountains() {
    const { ctx, canvas } = gameState;
    
    // Use fixed mountain peaks to prevent jittering
    const firstPeak = fixedElements.mountains.firstPeak;
    const secondPeak = fixedElements.mountains.secondPeak;
    
    // First mountain
    ctx.fillStyle = "#6B8E23";
    ctx.beginPath();
    ctx.moveTo(0, canvas.height * 0.6);
    ctx.lineTo(firstPeak, canvas.height * 0.3);
    ctx.lineTo(canvas.width * 0.5, canvas.height * 0.6);
    ctx.closePath();
    ctx.fill();
    
    // Second mountain
    ctx.fillStyle = "#556B2F";
    ctx.beginPath();
    ctx.moveTo(canvas.width * 0.4, canvas.height * 0.6);
    ctx.lineTo(secondPeak, canvas.height * 0.25);
    ctx.lineTo(canvas.width, canvas.height * 0.6);
    ctx.closePath();
    ctx.fill();
    
    // Snow caps
    ctx.fillStyle = "#FFF";
    ctx.beginPath();
    ctx.moveTo(firstPeak - 15, canvas.height * 0.35);
    ctx.lineTo(firstPeak, canvas.height * 0.3);
    ctx.lineTo(firstPeak + 15, canvas.height * 0.35);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(secondPeak - 15, canvas.height * 0.3);
    ctx.lineTo(secondPeak, canvas.height * 0.25);
    ctx.lineTo(secondPeak + 15, canvas.height * 0.3);
    ctx.closePath();
    ctx.fill();
}

// Draw forest
function drawForest(density = 1.0) {
    const { ctx, canvas } = gameState;
    
    // Draw trees - using fixed positions to prevent jittering
    // Only draw a subset based on terrain type density
    const numTreesToShow = Math.floor(fixedElements.trees.length * density);
    
    for (let i = 0; i < numTreesToShow; i++) {
        const tree = fixedElements.trees[i];
        
        if (tree.type === 'pine') {
            drawPineTree(ctx, tree.x, tree.y, tree.height);
        } else {
            drawDeciduousTree(ctx, tree.x, tree.y, tree.height);
        }
    }
}

// Draw a pine tree
function drawPineTree(ctx, x, y, height) {
    // Tree trunk
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(x - 2, y - height * 0.2, 4, height * 0.3);
    
    // Tree foliage - pine tree style (triangular)
    ctx.fillStyle = "#006400";
    
    // Draw multiple triangle layers
    for (let i = 0; i < 3; i++) {
        const layerHeight = height * (0.7 - i * 0.15);
        const layerWidth = height * (0.3 - i * 0.05);
        const layerY = y - height * 0.2 - layerHeight * (i+1)/3;
        
        ctx.beginPath();
        ctx.moveTo(x, layerY - layerHeight);
        ctx.lineTo(x - layerWidth, layerY);
        ctx.lineTo(x + layerWidth, layerY);
        ctx.closePath();
        ctx.fill();
    }
}

// Draw a deciduous tree
function drawDeciduousTree(ctx, x, y, height) {
    // Tree trunk
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(x - 2, y - height * 0.2, 4, height * 0.4);
    
    // Tree foliage - circular/oval canopy
    ctx.fillStyle = "#228B22";
    
    // Draw main canopy
    ctx.beginPath();
    ctx.arc(x, y - height * 0.5, height * 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Add some smaller foliage details
    ctx.beginPath();
    ctx.arc(x - height * 0.2, y - height * 0.6, height * 0.15, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(x + height * 0.2, y - height * 0.6, height * 0.15, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(x, y - height * 0.75, height * 0.15, 0, Math.PI * 2);
    ctx.fill();
}

// Draw water
function drawWater() {
    const { ctx, canvas } = gameState;
    
    // Water body
    ctx.fillStyle = "#4682B4";
    ctx.fillRect(0, canvas.height * 0.75, canvas.width, canvas.height * 0.25);
    
    // Water ripples
    ctx.strokeStyle = "#87CEEB";
    ctx.lineWidth = 1;
    
    // Use fixed time-based animation for smooth ripples
    const time = Date.now() * 0.001; // Convert to seconds
    
    for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        const y = canvas.height * 0.77 + i * 10;
        const amplitude = 2;
        const frequency = 0.02;
        
        ctx.moveTo(0, y);
        for (let x = 0; x < canvas.width; x += 5) {
            // Add time to make ripples animated but not jittery
            ctx.lineTo(x, y + Math.sin(x * frequency + time) * amplitude);
        }
        ctx.stroke();
    }
}

// Draw progress bar
function drawProgressBar() {
    const { ctx, canvas, distance } = gameState;
    const totalDistance = 350; // Total distance to Vancouver
    
    const barWidth = canvas.width - 40;
    const barHeight = 15;
    const barX = 20;
    const barY = 20;
    
    // Background bar
    ctx.fillStyle = "#ddd";
    ctx.fillRect(barX, barY, barWidth, barHeight);
    
    // Progress
    const progressWidth = (distance / totalDistance) * barWidth;
    ctx.fillStyle = "#4CAF50";
    ctx.fillRect(barX, barY, progressWidth, barHeight);
    
    // Border
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    ctx.strokeRect(barX, barY, barWidth, barHeight);
    
    // Label
    ctx.fillStyle = "#000";
    ctx.font = "12px Arial";
    ctx.fillText("Kamloops", barX, barY + barHeight + 15);
    ctx.fillText("Vancouver", barX + barWidth - 60, barY + barHeight + 15);
    
    // Current position marker
    ctx.fillStyle = "#FF5722";
    ctx.beginPath();
    ctx.arc(barX + progressWidth, barY + barHeight / 2, 5, 0, Math.PI * 2);
    ctx.fill();
}

// Draw slime mold
function drawSlimeMold() {
    const { ctx, slimeMold, population } = gameState;
    
    // Main body
    ctx.fillStyle = slimeMold.color;
    ctx.beginPath();
    ctx.arc(slimeMold.x, slimeMold.y, slimeMold.size * Math.sqrt(population), 0, Math.PI * 2);
    ctx.fill();
    
    // Use time-based animation for consistent pseudopodia movement
    const time = Date.now() * 0.001; // Convert to seconds
    
    // Pseudopodia (extensions)
    const numPseudopodia = 5 + Math.floor(population * 3);
    for (let i = 0; i < numPseudopodia; i++) {
        const angle = (i / numPseudopodia) * Math.PI * 2;
        
        // Use sine wave based on time for smooth pseudopodia animation
        const lengthVariation = Math.sin(time * 0.5 + i) * 0.3 + 0.7;
        const length = slimeMold.size * 0.7 * lengthVariation;
        
        const endX = slimeMold.x + Math.cos(angle) * (slimeMold.size * Math.sqrt(population) + length);
        const endY = slimeMold.y + Math.sin(angle) * (slimeMold.size * Math.sqrt(population) + length);
        
        // Thinner near the tip
        ctx.strokeStyle = slimeMold.color;
        ctx.lineWidth = 2 + Math.sin(time + i) * 1.5;
        ctx.beginPath();
        ctx.moveTo(
            slimeMold.x + Math.cos(angle) * slimeMold.size * Math.sqrt(population),
            slimeMold.y + Math.sin(angle) * slimeMold.size * Math.sqrt(population)
        );
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        // Small blob at the end
        ctx.beginPath();
        ctx.arc(endX, endY, 2 + Math.sin(time * 0.8 + i * 0.5) * 1.5, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Draw network veins for larger colonies
    if (population > 1.5) {
        drawNetworkVeins(time);
    }
}

// Draw network veins
function drawNetworkVeins(time) {
    const { ctx, slimeMold, population } = gameState;
    
    const numVeins = Math.floor(population * 5);
    const maxLength = slimeMold.size * 0.8 * population;
    
    ctx.strokeStyle = "#D4AF37"; // Slightly darker gold for veins
    
    // Use deterministic pattern based on population and time
    for (let i = 0; i < numVeins; i++) {
        const startAngle = (i / numVeins) * Math.PI * 2;
        const startX = slimeMold.x + Math.cos(startAngle) * (slimeMold.size * 0.5);
        const startY = slimeMold.y + Math.sin(startAngle) * (slimeMold.size * 0.5);
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        
        let currentX = startX;
        let currentY = startY;
        let currentLength = 0;
        const segments = 3 + (i % 3);
        
        for (let j = 0; j < segments && currentLength < maxLength; j++) {
            const segmentLength = (maxLength / segments) * (0.6 + Math.sin(time * 0.3 + i + j) * 0.2);
            const angle = startAngle + (Math.sin(time * 0.2 + i * 0.5 + j) * 0.3);
            
            currentX += Math.cos(angle) * segmentLength;
            currentY += Math.sin(angle) * segmentLength;
            currentLength += segmentLength;
            
            ctx.lineTo(currentX, currentY);
        }
        
        ctx.lineWidth = 1 + Math.sin(time * 0.5 + i) * 0.5;
        ctx.stroke();
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    if (gameState.canvas) {
        // Reset canvas dimensions
        gameState.canvas.width = gameState.canvas.parentElement.clientWidth;
        gameState.canvas.height = gameState.canvas.parentElement.clientHeight;
        
        // Re-initialize fixed elements with new canvas dimensions
        fixedElements.initialized = false;
        initializeFixedElements();
    }
});
