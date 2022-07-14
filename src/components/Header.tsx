import { useContext } from "react";

import { GameStateContext } from "../contexts/GameStateContext";
import { TranslationsContext } from "../contexts/TranslationsContext";

import { translationsData } from "../data/translationsData";

function Header() {
  const { gameState, setGameState } = useContext(GameStateContext);
  const { setTranslations } = useContext(TranslationsContext);

  /**
   * Progress to the next game state. Possible game states are (in order):
   * "learn"  - The user sees the correct language pairs in order to memorise them.
   * "test"   - The user matches each word with a word from the other language.
   * "review" - The user receives information about the correctness of their pairing.
   *
   * Note: When the state changes from review back to test, the translations data is
   *       reset back to its initial state in order to reset the game for a new round.
   */
  function handleControlButton(): void {
    switch (gameState) {
      case "learn":
        setGameState("test");
        break;
      case "test":
        setGameState("review");
        break;
      case "review":
        setTranslations(structuredClone(translationsData));
        setGameState("test");
        break;
    }
  }

  // Map game states to the appropriate text to be displayed on the control button.
  const gameStateToControlButtonText: { [key: string]: string } = {
    learn: "GO!",
    test: "Grade >>",
    review: "<< Restart",
  };

  // Map game states to the appropriate instructions heading to display.
  const gameStateToInstructionsHeading: { [key: string]: string } = {
    learn: "👋 Welcome to Memo!",
    test: "✏️ Quiz time!",
    review: "📝 Results are in!",
  };

  // Map game states to the appropriate instructions to display.
  const gameStateToInstructionsBody: { [key: string]: string } = {
    learn:
      "Begin by memorising the translations below. When you're ready, click the GO! button above to test how many translations you can remember.",
    test: "Click on a word from each language to create a pair. Your pairs will be shown at the bottom of the page. Bonne chance / good luck!",
    review:
      "How did you do? If you'd like to try the quiz again, click the Restart button.",
  };

  return (
    <header className={gameState}>
      <div className="header-animation-hider"></div>
      <div className="header-inner">
        <h1>Memo</h1>
        <button onClick={handleControlButton}>
          {gameStateToControlButtonText[gameState]}
        </button>
      </div>
      <div className="instructions animate__animated animate__slideInDown">
        <div className="instructions-heading">
          {gameStateToInstructionsHeading[gameState]}
        </div>
        <p className="instructions-body">
          {gameStateToInstructionsBody[gameState]}
        </p>
      </div>
    </header>
  );
}

export default Header;
