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

Simply open the `index.html` file in a modern browser with ES modules support.

## Game Structure

- `index.html`: Main game interface
- `style.css`: Game styling
- `main.js`: Core game initialization
- `game-state.js`: Game state management
- `renderer.js`: Canvas rendering functions
- `actions.js`: Game action functions
- `events.js`: Random event system
- `ui-manager.js`: UI updates and event handling
- `data/`: Directory containing game data
  - `locations.js`: Location data from Kamloops to Vancouver
  - `slime-facts.js`: Educational facts about slime molds and BC geography

## Educational Value

This game teaches players about:

1. **Slime Mold Behavior**: How these fascinating organisms move, feed, and adapt
2. **BC Geography**: The varied terrain and climate between Kamloops and Vancouver
3. **Resource Management**: Strategic decision-making with limited resources
4. **Adaptability**: Responding to changing environmental conditions

## Development Prompts

This game was created through a series of prompts to Claude:

1. **Initial Game Concept**: Create a game called "Slime Mold on the Run!" about a slime mold traveling from Kamloops to Vancouver using JavaScript, HTML, and CSS.

2. **Core Implementation**: Develop the core game mechanics, including:
   - Canvas-based visualization
   - Resource management (nutrients and population)
   - Geographic progression from Kamloops to Vancouver
   - Random events and decision-making

3. **Code Organization**: Break up the project into smaller, modular files for better maintainability.

4. **Bug Fixes and Improvements**:
   - Fix UI stats not updating properly
   - Address jittery visual elements in the rendering
   - Make the visual representation more accurate to BC's forested landscape

5. **Final Polishing**:
   - Implement event-based notification system for state changes
   - Add time-based animations for smoother rendering
   - Improve geographic accuracy
   - Create a more educational experience

## Credits

Created as an educational and entertaining game to showcase the fascinating world of slime molds and British Columbia's diverse geography.

Enjoy your journey from Kamloops to Vancouver!
