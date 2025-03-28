// Rendering functions for the game

// Draw terrain based on current location
export function drawTerrain(gameState) {
    const { ctx, canvas, currentLocationIndex, locations } = gameState;
    const location = locations[currentLocationIndex];
    
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
            groundColor = "#C0C0C0";
            break;
        case "lakeside":
            groundColor = "#8FBC8F";
            break;
        case "arid/valley":
            groundColor = "#D2B48C";
            break;
        case "river valley":
            groundColor = "#A9A9A9";
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
    if (location.terrain.includes("urban")) {
        drawUrbanFeatures(gameState);
    }
    
    if (location.terrain.includes("mountain")) {
        drawMountains(gameState);
    }
    
    if (location.terrain.includes("forest") || location.terrain.includes("rainforest")) {
        drawForest(gameState);
    }
    
    if (location.terrain.includes("lakeside") || location.terrain.includes("river")) {
        drawWater(gameState);
    }
}

// Draw urban features
export function drawUrbanFeatures(gameState) {
    const { ctx, canvas } = gameState;
    
    // Draw buildings
    for (let i = 0; i < 5; i++) {
        const x = canvas.width * 0.1 + i * canvas.width * 0.18;
        const height = 40 + Math.random() * 60;
        const width = 30 + Math.random() * 20;
        
        ctx.fillStyle = "#555";
        ctx.fillRect(x, canvas.height * 0.6 - height, width, height);
        
        // Windows
        ctx.fillStyle = "#FFF";
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 4; k++) {
                ctx.fillRect(x + 5 + j * 10, canvas.height * 0.6 - height + 10 + k * 15, 5, 8);
            }
        }
    }
    
    // Draw road
    ctx.fillStyle = "#333";
    ctx.fillRect(0, canvas.height * 0.7, canvas.width, 20);
    
    // Road markings
    ctx.fillStyle = "#FFF";
    for (let i = 0; i < canvas.width; i += 30) {
        ctx.fillRect(i, canvas.height * 0.7 + 10, 15, 2);
    }
}

// Draw mountains
export function drawMountains(gameState) {
    const { ctx, canvas } = gameState;
    
    ctx.fillStyle = "#6B8E23";
    
    // First mountain
    ctx.beginPath();
    ctx.moveTo(0, canvas.height * 0.6);
    ctx.lineTo(canvas.width * 0.3, canvas.height * 0.3);
    ctx.lineTo(canvas.width * 0.5, canvas.height * 0.6);
    ctx.closePath();
    ctx.fill();
    
    // Second mountain
    ctx.fillStyle = "#556B2F";
    ctx.beginPath();
    ctx.moveTo(canvas.width * 0.4, canvas.height * 0.6);
    ctx.lineTo(canvas.width * 0.7, canvas.height * 0.25);
    ctx.lineTo(canvas.width, canvas.height * 0.6);
    ctx.closePath();
    ctx.fill();
    
    // Snow caps
    ctx.fillStyle = "#FFF";
    ctx.beginPath();
    ctx.moveTo(canvas.width * 0.25, canvas.height * 0.35);
    ctx.lineTo(canvas.width * 0.3, canvas.height * 0.3);
    ctx.lineTo(canvas.width * 0.35, canvas.height * 0.35);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(canvas.width * 0.65, canvas.height * 0.3);
    ctx.lineTo(canvas.width * 0.7, canvas.height * 0.25);
    ctx.lineTo(canvas.width * 0.75, canvas.height * 0.3);
    ctx.closePath();
    ctx.fill();
}

// Draw forest
export function drawForest(gameState) {
    const { ctx, canvas } = gameState;
    
    // Draw trees
    for (let i = 0; i < 15; i++) {
        const x = Math.random() * canvas.width;
        const y = canvas.height * 0.6 - 10;
        const height = 20 + Math.random() * 30;
        
        // Tree trunk
        ctx.fillStyle = "#8B4513";
        ctx.fillRect(x - 2, y - height * 0.2, 4, height * 0.3);
        
        // Tree foliage
        ctx.fillStyle = "#006400";
        ctx.beginPath();
        ctx.moveTo(x, y - height);
        ctx.lineTo(x - 10, y - height * 0.5);
        ctx.lineTo(x + 10, y - height * 0.5);
        ctx.closePath();
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(x, y - height * 0.7);
        ctx.lineTo(x - 12, y - height * 0.2);
        ctx.lineTo(x + 12, y - height * 0.2);
        ctx.closePath();
        ctx.fill();
    }
}

// Draw water
export function drawWater(gameState) {
    const { ctx, canvas } = gameState;
    
    // Water body
    ctx.fillStyle = "#4682B4";
    ctx.fillRect(0, canvas.height * 0.75, canvas.width, canvas.height * 0.25);
    
    // Water ripples
    ctx.strokeStyle = "#87CEEB";
    ctx.lineWidth = 1;
    
    for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        const y = canvas.height * 0.77 + i * 10;
        const amplitude = 2;
        const frequency = 0.02;
        
        ctx.moveTo(0, y);
        for (let x = 0; x < canvas.width; x += 5) {
            ctx.lineTo(x, y + Math.sin(x * frequency) * amplitude);
        }
        ctx.stroke();
    }
}

// Draw progress bar
export function drawProgressBar(gameState) {
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
export function drawSlimeMold(gameState) {
    const { ctx, slimeMold, population } = gameState;
    
    // Main body
    ctx.fillStyle = slimeMold.color;
    ctx.beginPath();
    ctx.arc(slimeMold.x, slimeMold.y, slimeMold.size * Math.sqrt(population), 0, Math.PI * 2);
    ctx.fill();
    
    // Pseudopodia (extensions)
    const numPseudopodia = 5 + Math.floor(population * 3);
    for (let i = 0; i < numPseudopodia; i++) {
        const angle = (i / numPseudopodia) * Math.PI * 2;
        const length = slimeMold.size * 0.7 * (0.7 + Math.random() * 0.6);
        const endX = slimeMold.x + Math.cos(angle) * (slimeMold.size * Math.sqrt(population) + length);
        const endY = slimeMold.y + Math.sin(angle) * (slimeMold.size * Math.sqrt(population) + length);
        
        // Thinner near the tip
        ctx.strokeStyle = slimeMold.color;
        ctx.lineWidth = 2 + Math.random() * 3;
        ctx.beginPath();
        ctx.moveTo(
            slimeMold.x + Math.cos(angle) * slimeMold.size * Math.sqrt(population),
            slimeMold.y + Math.sin(angle) * slimeMold.size * Math.sqrt(population)
        );
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        // Small blob at the end
        ctx.beginPath();
        ctx.arc(endX, endY, 2 + Math.random() * 3, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Draw network veins for larger colonies
    if (population > 1.5) {
        drawNetworkVeins(gameState);
    }
}

// Draw network veins
export function drawNetworkVeins(gameState) {
    const { ctx, slimeMold, population } = gameState;
    
    const numVeins = Math.floor(population * 5);
    const maxLength = slimeMold.size * 0.8 * population;
    
    ctx.strokeStyle = "#D4AF37"; // Slightly darker gold for veins
    
    for (let i = 0; i < numVeins; i++) {
        const startAngle = Math.random() * Math.PI * 2;
        const startX = slimeMold.x + Math.cos(startAngle) * (slimeMold.size * 0.5);
        const startY = slimeMold.y + Math.sin(startAngle) * (slimeMold.size * 0.5);
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        
        let currentX = startX;
        let currentY = startY;
        let currentLength = 0;
        const segments = 3 + Math.floor(Math.random() * 3);
        
        for (let j = 0; j < segments && currentLength < maxLength; j++) {
            const segmentLength = (maxLength / segments) * (0.5 + Math.random() * 0.8);
            const angle = startAngle + (Math.random() * 0.8 - 0.4);
            
            currentX += Math.cos(angle) * segmentLength;
            currentY += Math.sin(angle) * segmentLength;
            currentLength += segmentLength;
            
            ctx.lineTo(currentX, currentY);
        }
        
        ctx.lineWidth = 1 + Math.random();
        ctx.stroke();
    }
}
