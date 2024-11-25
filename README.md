# Letters in the Sky Game
This project is an interactive constellation guessing game built using the [p5.js](https://p5js.org/) library. Players must guess letter
slowly being revealed in yellow stars amidst the white stars as the player drags their mouse across the sky.

## Features

- **Interactive Gameplay**: Players click on the canvas to guess constellations and receive immediate feedback.
- **Dynamic Scoring**: The game calculates scores based on correct guesses, attempts, and amount of stars required to guess correctly.
- **Multiple Screens**: Includes a home screen, instructions, and settings for a user-friendly experience.
- **Visual Effects**: Engaging graphics with animated stars and clear letter shapes.
- **Smooth Star Movement**: Stars move smoothly towards their target positions using linear interpolation (lerp), creating a visually appealing effect.
- **Sound Effects**: Background music and sound effects enhance gameplay, providing auditory feedback for actions.

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/JefeThePug/LetterConstellations.git
   ```
2. Ensure you have the necessary libraries:
   - [p5.js](https://p5js.org/)
3. Place your assets (images and sound files) in the `/assets` directory:
   - Constellation images (`_bg.jpg`, `a.jpg`, `b.jpg`, ..., `z.jpg`)
   - Title image (`_title.jpg`)
   - Instruction image (`_instruc.jpg`)
   - Sound files for background music and effects (`bgm.mp3`, `guess.mp3`, `sfChime.mp3`)
   - Fonts for text display (`_ABCBULLE.TTF`, `_ABCPRINT.TTF`)
4. Open `index.html` in a browser to play.

## How to Play

1. **Starting the Game**:
   - Click the "PLAY" button on the home screen to start the game.
   - View the instructions by clicking "INSTRUCTIONS".
   - Clicking the gear symbol will open an options window to disable the music for a quieter experience. 

2. **Making Guesses**:
   - Click on the canvas to drop stars and make your guesses.
   - A list of letters will appear; click on the letters to guess the constellation.

3. **Scoring**:
   - Correct guesses will yield a score based on your performance.
   - The game tracks wrong attempts and provides feedback.

4. **Resetting**:
   - After a round, click the "AGAIN" button to reset and play again.

## Project Structure

- **Game Logic**:
  - `Letter`: Represents clickable letters for guessing.
  - `Star`: Represents stars that players can drop on the canvas.
  - `Message`: Displays feedback messages to the player.
- **Event Handling**:
  - Mouse clicks trigger guessing actions and game state changes.
- **Graphics and Assets**:
  - All visuals are dynamically rendered using p5.js.
  - Audio feedback enhances player engagement through sound effects.

## Future Improvements

- **Leaderboard**: Implement a high-score system to encourage competitive play.
- **Mobile Compatibility**: Optimize the game for touch devices and smaller screens.
- **Advanced Features**: Introduce timed rounds or levels with increasing difficulty.

## Acknowledgments

- Built with [p5.js](https://p5js.org/) for interactive graphics and sound.
  
## License

This project is licensed under the [MIT License](LICENSE).
