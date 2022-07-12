import { useState, useContext } from "react";

import WordsColumn from "./WordsColumn";

import { GameStateContext } from "../contexts/GameStateContext";
import { TranslationsContext } from "../contexts/TranslationsContext";

import { generateShuffledOrder } from "../helpers/generateShuffledOrder";

/**
 * Generate a shuffled order to traverse each language's word list.
 * Each word list has a different order so that the pairs are mixed.
 *
 * @param numberOfPairs The number of pairs, e.g. {hello: "bonjour"} is one pair.
 * @returns An array of integers representing an order to traverse each word list.
 */
function generateShuffledOrders(numberOfPairs: number): {
  [key: string]: number[];
} {
  return {
    english: generateShuffledOrder(numberOfPairs),
    french: generateShuffledOrder(numberOfPairs),
  };
}

function WordColumns() {
  const { gameState } = useContext(GameStateContext);
  const { translations, setTranslations } = useContext(TranslationsContext);

  const [firstSelectedWord, setFirstSelectedWord] = useState<string>("");
  const [shuffledOrders] = useState<{
    [key: string]: number[];
  }>(generateShuffledOrders(Object.keys(translations).length));

  /**
   * Select a word from each language to be joined as a pair.
   * First, ensure that the second word the used has selected is
   * from the word list of the opposite language as the first.
   * If the pair is valid, update the translations state to reflect
   * the pairing.
   *
   * @param selectedWord A string representing the selected word.
   */
  function selectWordPair(selectedWord: string): void {
    if (Object.keys(translations).includes(firstSelectedWord)) {
      if (!Object.keys(translations).includes(selectedWord)) {
        setTranslations({
          ...translations,
          [firstSelectedWord]: {
            ...translations[firstSelectedWord],
            userAnswer: selectedWord,
          },
        });
        setFirstSelectedWord("");
      }
    } else {
      if (Object.keys(translations).includes(selectedWord)) {
        setTranslations({
          ...translations,
          [selectedWord]: {
            ...translations[selectedWord],
            userAnswer: firstSelectedWord,
          },
        });
        setFirstSelectedWord("");
      }
    }
  }

  /**
   * Handle the user selecting words from either language.
   * If no word is already selected, select the word as the first in a pair.
   * The subsequently selected word will then be paired with the first word.
   *
   * @param selectedWord A string representing the selected word.
   */
  function selectWord(selectedWord: string): void {
    if (gameState === "test") {
      if (firstSelectedWord === "") {
        setFirstSelectedWord(selectedWord);
      } else {
        selectWordPair(selectedWord);
      }
    }
  }

  return (
    <div className="word-columns">
      <WordsColumn
        language="english"
        shuffledOrder={shuffledOrders["english"]}
        selectWord={selectWord}
        firstSelectedWord={firstSelectedWord}
      ></WordsColumn>
      <WordsColumn
        language="french"
        shuffledOrder={shuffledOrders["french"]}
        selectWord={selectWord}
        firstSelectedWord={firstSelectedWord}
      ></WordsColumn>
    </div>
  );
}

export default WordColumns;
