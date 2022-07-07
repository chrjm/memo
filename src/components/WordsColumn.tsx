import { useContext, useState } from "react";

import { GameStateContext } from "../contexts/GameStateContext";

function WordsColumn({
  name,
  words,
  selectWord,
  firstSelectedWord,
  pairedWords,
}: {
  name: string;
  words: string[];
  selectWord: Function;
  firstSelectedWord: string;
  pairedWords: { [key: string]: string };
}) {
  const { gameState, setGameState } = useContext(GameStateContext);

  function determineWordClasses(word: string): string {
    const wordClasses: string[] = ["word"];
    if (gameState === "test") wordClasses.push("word-clickable");
    if (firstSelectedWord === word) wordClasses.push("word-selected");

    for (const [englishWord, frenchWord] of Object.entries(pairedWords)) {
      if (frenchWord.length > 0) {
        if (word === englishWord || word === frenchWord)
          wordClasses.push("word-paired");
      }
    }

    return wordClasses.join(" ");
  }

  return (
    <div className="words-column">
      <div className="words-column-name">{name}</div>
      <div className="words">
        {words.map((word: string) => {
          return (
            <div
              className={determineWordClasses(word)}
              key={word}
              onClick={() => selectWord(word)}
            >
              {word}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WordsColumn;
