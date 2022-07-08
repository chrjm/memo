import { FC, useState, useMemo } from "react";
import "./App.css";

import WordsColumn from "./components/WordsColumn";

import { GameStateContext } from "./contexts/GameStateContext";

import { shuffleArray } from "./helpers/shuffleArray";
import { translations } from "./translations";

const App: FC = () => {
  const [gameState, setGameState] = useState<string>("learn");
  const [currentWords, setCurrentWords] = useState<{ [key: string]: string[] }>(
    { english: Object.keys(translations), french: Object.values(translations) }
  );
  const [firstSelectedWord, setFirstSelectedWord] = useState<string>("");
  const [pairedWords, setPairedWords] = useState<{ [key: string]: string }>(
    Object.fromEntries(Object.keys(translations).map((key) => [key, ""]))
  );
  const [numCorrectPairs, setNumCorrectPairs] = useState<number>(0);
  const [gradePercentage, setGradePercentage] = useState<number>(0);
  const [correctWords, setCorrectWords] = useState<string[]>([]);

  const gameStateMemo = useMemo(() => {
    return { gameState, setGameState };
  }, [gameState]);

  function selectWord(selectedWord: string): void {
    if (gameState === "test") {
      if (firstSelectedWord === "") {
        setFirstSelectedWord(selectedWord);
      } else {
        if (currentWords.english.includes(firstSelectedWord)) {
          if (currentWords.french.includes(selectedWord)) {
            setPairedWords({
              ...pairedWords,
              [firstSelectedWord]: selectedWord,
            });
            setFirstSelectedWord("");
          }
        } else {
          if (currentWords.english.includes(selectedWord)) {
            setPairedWords({
              ...pairedWords,
              [selectedWord]: firstSelectedWord,
            });
            setFirstSelectedWord("");
          }
        }
      }
    }
  }

  function handleControlButton(): void {
    if (gameState === "learn") {
      setCurrentWords({
        english: shuffleArray(currentWords.english),
        french: shuffleArray(currentWords.french),
      });
      setGameState("test");
    } else if (gameState === "test") {
      setGameState("review");
      let numCorrectPairsResult: number = 0;
      const foundCorrectWords: string[] = [];
      for (const [englishWord, frenchWord] of Object.entries(pairedWords)) {
        if (frenchWord === translations[englishWord]) {
          numCorrectPairsResult += 1;
          foundCorrectWords.push(englishWord);
          foundCorrectWords.push(frenchWord);
        }
      }
      setCorrectWords([...correctWords, ...foundCorrectWords]);
      setNumCorrectPairs(numCorrectPairsResult);
      setGradePercentage(
        (numCorrectPairsResult / currentWords.english.length) * 100
      );
    } else if (gameState === "review") {
      setGameState("learn");
    }
  }

  // Create a list of English words that have not been paired.
  const unpairedEnglishWords: string[] = [];
  for (const word of currentWords.english) {
    if (pairedWords[word].length === 0) {
      unpairedEnglishWords.push(word);
    }
  }

  // Create a list of French words that have not been paired.
  const unpairedFrenchWords: string[] = [];
  for (const word of currentWords.french) {
    if (!Object.values(pairedWords).includes(word)) {
      unpairedFrenchWords.push(word);
    }
  }

  return (
    <GameStateContext.Provider value={gameStateMemo}>
      <div className="App">
        <header className={gameState}>
          <h1>Memo</h1>
          <button onClick={handleControlButton}>
            {gameState === "learn" ? "GO!" : "GRADE"}
          </button>
        </header>
        {gameState === "review" && (
          <div className="results">
            Results:
            <div className="results-count">
              {numCorrectPairs}/{currentWords.english.length}
            </div>
            <div className="results-percentage">
              {gradePercentage.toFixed(0)}%
            </div>
          </div>
        )}
        <div className="word-columns">
          <WordsColumn
            columnName={"English Words"}
            words={unpairedEnglishWords}
            selectWord={selectWord}
            firstSelectedWord={firstSelectedWord}
            pairedWords={pairedWords}
            correctWords={correctWords}
          ></WordsColumn>
          <WordsColumn
            columnName={"French Words"}
            words={unpairedFrenchWords}
            selectWord={selectWord}
            firstSelectedWord={firstSelectedWord}
            pairedWords={pairedWords}
            correctWords={correctWords}
          ></WordsColumn>
        </div>
        <div className="paired-words">
          {Object.entries(pairedWords)
            .filter(([englishWord, frenchWord]) => frenchWord.length > 0)
            .map(([englishWord, frenchWord]) => {
              return (
                <div className="paired-words-pair" key={englishWord}>
                  <div className="paired-words-pair-link"></div>
                  <div className="word">{englishWord}</div>
                  <div className="word">{frenchWord}</div>
                </div>
              );
            })}
        </div>
      </div>
    </GameStateContext.Provider>
  );
};

export default App;
