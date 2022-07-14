import { render, screen } from "@testing-library/react";
import "core-js/actual/structured-clone";

import WordsColumn from "./WordsList";

import { GameStateContext } from "../contexts/GameStateContext";
import { TranslationsContext } from "../contexts/TranslationsContext";

import { generateShuffledOrders } from "../helpers/generateShuffledOrders";

import { translationsData } from "../data/translationsData";

describe("WordsList component", () => {
  test('in "learn" state, lists 12 English words in their unshuffled order"', () => {
    const shuffledOrders: { [key: string]: number[] } = generateShuffledOrders(
      Object.keys(translationsData).length
    );

    render(
      <GameStateContext.Provider
        value={{ gameState: "learn", setGameState: () => {} }}
      >
        <TranslationsContext.Provider
          value={{ translations: translationsData, setTranslations: () => {} }}
        >
          <WordsColumn
            language="english"
            shuffledOrder={shuffledOrders["english"]}
            selectWord={() => {}}
            firstSelectedWord={""}
          ></WordsColumn>
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );

    const firstWord: string = Object.keys(translationsData)[0];
    const parentElement: HTMLDivElement | null = screen
      .getByText(firstWord)
      .closest(".words");

    Object.keys(translationsData).forEach((englishWord, index) => {
      expect(parentElement?.children.item(index)).toHaveTextContent(
        englishWord
      );
    });
  });

  test('in "learn" state, lists 12 French words in their unshuffled order"', () => {
    const shuffledOrders: { [key: string]: number[] } = generateShuffledOrders(
      Object.keys(translationsData).length
    );

    render(
      <GameStateContext.Provider
        value={{ gameState: "learn", setGameState: () => {} }}
      >
        <TranslationsContext.Provider
          value={{ translations: translationsData, setTranslations: () => {} }}
        >
          <WordsColumn
            language="french"
            shuffledOrder={shuffledOrders["french"]}
            selectWord={() => {}}
            firstSelectedWord={""}
          ></WordsColumn>
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );

    const firstWord: string = Object.values(translationsData)[0].answer;
    const parentElement: HTMLDivElement | null = screen
      .getByText(firstWord)
      .closest(".words");

    Object.values(translationsData).forEach((frenchWords, index) => {
      expect(parentElement?.children.item(index)).toHaveTextContent(
        frenchWords.answer
      );
    });
  });

  test('in "test" state, lists 12 English words in their SHUFFLED order"', () => {
    const shuffledOrders: { [key: string]: number[] } = generateShuffledOrders(
      Object.keys(translationsData).length
    );

    render(
      <GameStateContext.Provider
        value={{ gameState: "test", setGameState: () => {} }}
      >
        <TranslationsContext.Provider
          value={{ translations: translationsData, setTranslations: () => {} }}
        >
          <WordsColumn
            language="english"
            shuffledOrder={shuffledOrders["english"]}
            selectWord={() => {}}
            firstSelectedWord={""}
          ></WordsColumn>
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );

    const parentElement: HTMLDivElement | null =
      document.querySelector(".words");

    shuffledOrders["english"].forEach((shuffledIndex, index) => {
      const expectedWord: string = Object.keys(translationsData)[shuffledIndex];
      expect(parentElement?.children.item(index)).toHaveTextContent(
        expectedWord
      );
    });
  });

  test('in "test" state, lists 12 French words in their SHUFFLED order"', () => {
    const shuffledOrders: { [key: string]: number[] } = generateShuffledOrders(
      Object.keys(translationsData).length
    );

    render(
      <GameStateContext.Provider
        value={{ gameState: "test", setGameState: () => {} }}
      >
        <TranslationsContext.Provider
          value={{ translations: translationsData, setTranslations: () => {} }}
        >
          <WordsColumn
            language="french"
            shuffledOrder={shuffledOrders["french"]}
            selectWord={() => {}}
            firstSelectedWord={""}
          ></WordsColumn>
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );

    const parentElement: HTMLDivElement | null =
      document.querySelector(".words");

    shuffledOrders["french"].forEach((shuffledIndex, index) => {
      const expectedWord: string =
        Object.values(translationsData)[shuffledIndex].answer;
      expect(parentElement?.children.item(index)).toHaveTextContent(
        expectedWord
      );
    });
  });
});
