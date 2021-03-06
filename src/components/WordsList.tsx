import { useContext } from "react";

import { GameStateContext } from "../contexts/GameStateContext";
import { TranslationsContext } from "../contexts/TranslationsContext";

import englishFlag from "../static/images/flag_english.svg";
import frenchFlag from "../static/images/flag_french.svg";

function WordsColumn({
  language,
  shuffledOrder,
  selectWord,
  firstSelectedWord,
}: {
  language: string;
  shuffledOrder: number[];
  selectWord: Function;
  firstSelectedWord: string;
}) {
  const { gameState } = useContext(GameStateContext);
  const { translations } = useContext(TranslationsContext);

  /**
   * Dynamically build a string of HTML classes for a word element.
   *
   * @param word A string representing the word itself.
   * @returns A string of HTML classes separated with spaces.
   */
  function determineWordClasses(word: string): string {
    const wordClasses: string[] = ["word", `word-${language}`];

    if (gameState === "learn") {
      wordClasses.push("word-learn");
    } else {
      wordClasses.push("animate__animated", "animate__fadeInUp");

      if (firstSelectedWord === word) {
        wordClasses.push("word-selected");
      } else {
        if (firstSelectedWord !== "") {
          if (language === "english") {
            if (Object.keys(translations).includes(firstSelectedWord)) {
              wordClasses.push("word-disabled");
            } else {
              wordClasses.push("word-clickable");
            }
          } else {
            if (!Object.keys(translations).includes(firstSelectedWord)) {
              wordClasses.push("word-disabled");
            } else {
              wordClasses.push("word-clickable");
            }
          }
        } else {
          wordClasses.push("word-clickable");
        }
      }
    }
    return wordClasses.join(" ");
  }

  /**
   * Determine how long an element should wait before animating.
   * This is used to have each word of a list animate sequentially.
   *
   * @param index The position in a list.
   * @returns A string representing the computed animationDelay value in ms.
   */
  function determineAnimationDelay(index: number): string {
    return `${index * 100}ms`;
  }

  /**
   * Generate an English word list to be rendered.
   * Only words that have not been paired should be rendered.
   *
   * @param wordOrder An integer array representing a word order.
   * @returns An string array representing a word list to be rendered.
   */
  function generateEnglishWordList(wordOrder: number[]): string[] {
    const unpairedEnglishWords: string[] = Object.entries(translations)
      .filter(([englishWord, frenchWords]) => frenchWords.userAnswer === "")
      .map(([englishWord, frenchWords]) => englishWord);

    const shuffledEnglishWords: string[] = [];
    for (const orderIndex of wordOrder) {
      if (
        unpairedEnglishWords.includes(Object.keys(translations)[orderIndex])
      ) {
        shuffledEnglishWords.push(Object.keys(translations)[orderIndex]);
      }
    }

    return shuffledEnglishWords;
  }

  /**
   * Generate a French word list to be rendered.
   * Only words that have not been paired should be rendered.
   *
   * @param wordOrder An integer array representing a word order.
   * @returns An string array representing a word list to be rendered.
   */
  function generateFrenchWordList(wordOrder: number[]): string[] {
    const pairedFrenchWords: string[] = [];
    for (const frenchWords of Object.values(translations)) {
      if (frenchWords.userAnswer !== "") {
        pairedFrenchWords.push(frenchWords.userAnswer);
      }
    }

    const shuffledFrenchWords = [];
    for (const orderIndex of wordOrder) {
      if (
        !pairedFrenchWords.includes(
          Object.values(translations)[orderIndex].answer
        )
      ) {
        shuffledFrenchWords.push(
          Object.values(translations)[orderIndex].answer
        );
      }
    }

    return shuffledFrenchWords;
  }

  /**
   * Generate a word list to be rendered. If the user is in the learning stage
   * of the game, the word list should be in its original order so that the
   * word pairs are presented in the correct order. If the user is in the
   * testing stage of the game, the word list should be in its shuffled order.
   *
   * Additionally, only words that have not been paired should be rendered.
   *
   * @returns An string array representing a word list to be rendered.
   */
  function generateWordList(): string[] {
    const numberOfPairs: number = Object.keys(translations).length;
    const wordOrder: number[] =
      gameState === "learn"
        ? Array.from(Array(numberOfPairs).keys())
        : shuffledOrder;

    return language === "english"
      ? generateEnglishWordList(wordOrder)
      : generateFrenchWordList(wordOrder);
  }

  const flagImage: string = language === "english" ? englishFlag : frenchFlag;

  const languageToColumnName: { [key: string]: string } = {
    english: "English Words",
    french: "French Words",
  };

  return (
    <div className="words-column">
      <div className="words-column-flag-and-name">
        <img
          className="words-column-flag"
          src={flagImage}
          alt={`${language} flag`}
        />
        <div className="words-column-name">
          {languageToColumnName[language]}
        </div>
      </div>

      <div className="words">
        {generateWordList().map((word: string, index) => {
          return (
            <div
              className={determineWordClasses(word)}
              key={word}
              onClick={() => selectWord(word)}
              style={{ animationDelay: determineAnimationDelay(index) }}
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
