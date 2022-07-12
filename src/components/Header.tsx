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
   * Note: When the state changes from review back to learn, the translations data is
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
        setGameState("learn");
        break;
    }
  }

  // Map game states to the appropriate text to be displayed on the control button.
  const gameStateToControlButtonText: { [key: string]: string } = {
    learn: "GO!",
    test: "Grade",
    review: "Restart",
  };

  return (
    <header className={gameState}>
      <h1>Memo</h1>
      <button onClick={handleControlButton}>
        {gameStateToControlButtonText[gameState]}
      </button>
    </header>
  );
}

export default Header;
