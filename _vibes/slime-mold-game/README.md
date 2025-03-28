# Slime Mold on the Run!

A fun and educational game where you play as a slime mold colony trying to make its way from Kamloops, BC to Vancouver.

## About the Game

In this game, you control a colony of *Physarum polycephalum* (a yellow slime mold) as it journeys through the diverse terrain and climate of British Columbia. The game combines real slime mold behavior with geographic facts about the route from Kamloops to Vancouver.

## Game Features

- **Beautiful Canvas-Based Graphics**: Dynamic terrain rendering based on your location
- **Resource Management**: Balance nutrients and population as you travel
- **Strategic Choices**: Decide when to forage, explore, rest, or split your colony
- **Random Events**: Encounter various challenges and opportunities along your journey
- **Educational Content**: Learn real facts about slime molds and BC geography

## How to Play

1. **Forage for Food**: Consume some nutrients to search for more in your current location
2. **Explore**: Move forward at the cost of nutrients
3. **Rest & Recover**: Regain nutrients and potentially grow your population
4. **Split Colony**: Send part of your colony ahead for faster travel

## Running the Game

You can run the game using the included simple Node.js server:

```bash
# Navigate to the game directory
cd slime-mold-game

# Start the server
node server.js

# Open your browser and go to http://localhost:3000
```

Alternatively, you can open the `index.html` file directly in a modern browser with ES modules support.

## Game Structure

- `index.html`: Main game interface
- `style.css`: Game styling
- `game.js`: Core game mechanics and initialization
- `rendering.js`: Canvas rendering functions
- `actions.js`: Game action functions
- `gameData/`: Directory containing game data
  - `locations.js`: Location data from Kamloops to Vancouver
  - `events.js`: Random events that can occur during gameplay
  - `slimeFacts.js`: Educational facts about slime molds and BC geography

## Educational Value

This game teaches players about:

1. **Slime Mold Behavior**: How these fascinating organisms move, feed, and adapt
2. **BC Geography**: The varied terrain and climate between Kamloops and Vancouver
3. **Resource Management**: Strategic decision-making with limited resources
4. **Adaptability**: Responding to changing environmental conditions

## Credits

Created as an educational and entertaining game to showcase the fascinating world of slime molds and British Columbia's diverse geography.

Enjoy your journey from Kamloops to Vancouver!
