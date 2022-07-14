import { render, screen } from "@testing-library/react";
import "core-js/actual/structured-clone";

import Results from "./Results";

import { GameStateContext } from "../contexts/GameStateContext";
import { TranslationsContext } from "../contexts/TranslationsContext";

import { Translations } from "../types/Translations";

import { translationsData } from "../data/translationsData";

describe("Results component", () => {
  test('should award "0/12" when no words are paired', () => {
    render(
      <GameStateContext.Provider
        value={{ gameState: "review", setGameState: () => () => {} }}
      >
        <TranslationsContext.Provider
          value={{ translations: translationsData, setTranslations: () => {} }}
        >
          <Results />
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );
    expect(screen.getByText("0/12")).toBeInTheDocument();
  });

  test('should award "0%" when no words are paired', () => {
    render(
      <GameStateContext.Provider
        value={{ gameState: "review", setGameState: () => () => {} }}
      >
        <TranslationsContext.Provider
          value={{ translations: translationsData, setTranslations: () => {} }}
        >
          <Results />
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );
    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  test('should award "0/12" when all words are incorrect', () => {
    const mockedTranslations: Translations = structuredClone(translationsData);
    let previousAnswer: string =
      Object.values(mockedTranslations).slice(-1)[0].answer;
    Object.entries(mockedTranslations).forEach(
      ([englishWord, frenchWords], index) => {
        frenchWords.userAnswer = previousAnswer;
        previousAnswer = frenchWords.answer;
      }
    );

    render(
      <GameStateContext.Provider
        value={{ gameState: "review", setGameState: () => () => {} }}
      >
        <TranslationsContext.Provider
          value={{
            translations: mockedTranslations,
            setTranslations: () => {},
          }}
        >
          <Results />
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );
    expect(screen.getByText("0/12")).toBeInTheDocument();
  });

  test('should award "0%" when all words are incorrect', () => {
    const mockedTranslations: Translations = structuredClone(translationsData);

    /**
     * Set each English word's user answer to be the correct answer of the preceding
     * English word, wrapping around at the beginning to the final correct answer,
     * making all pairs incorrect.
     */
    let previousAnswer: string =
      Object.values(mockedTranslations).slice(-1)[0].answer;
    Object.values(mockedTranslations).forEach((frenchWords) => {
      frenchWords.userAnswer = previousAnswer;
      previousAnswer = frenchWords.answer;
    });

    render(
      <GameStateContext.Provider
        value={{ gameState: "review", setGameState: () => () => {} }}
      >
        <TranslationsContext.Provider
          value={{
            translations: mockedTranslations,
            setTranslations: () => {},
          }}
        >
          <Results />
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );
    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  test('should award "1/12" when one pair is correct', () => {
    const mockedTranslations: Translations = structuredClone(translationsData);
    mockedTranslations["folder"]["userAnswer"] = "dossier";

    render(
      <GameStateContext.Provider
        value={{ gameState: "review", setGameState: () => () => {} }}
      >
        <TranslationsContext.Provider
          value={{
            translations: mockedTranslations,
            setTranslations: () => {},
          }}
        >
          <Results />
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );
    expect(screen.getByText("1/12")).toBeInTheDocument();
  });

  test('should award "8%" when one pair is correct', () => {
    const mockedTranslations: Translations = structuredClone(translationsData);
    mockedTranslations["folder"]["userAnswer"] = "dossier";

    render(
      <GameStateContext.Provider
        value={{ gameState: "review", setGameState: () => () => {} }}
      >
        <TranslationsContext.Provider
          value={{
            translations: mockedTranslations,
            setTranslations: () => {},
          }}
        >
          <Results />
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );
    expect(screen.getByText("8%")).toBeInTheDocument();
  });

  test('should award "6/12" when 6 out of 12 pairs are correct', () => {
    const mockedTranslations: Translations = structuredClone(translationsData);
    const numPairsToSetAsCorrect: number = 6;

    // Set 6 pairs to be correct.
    Object.values(mockedTranslations).some((frenchWords, index) => {
      frenchWords["userAnswer"] = frenchWords["answer"];
      return index >= numPairsToSetAsCorrect - 1;
    });

    render(
      <GameStateContext.Provider
        value={{ gameState: "review", setGameState: () => () => {} }}
      >
        <TranslationsContext.Provider
          value={{
            translations: mockedTranslations,
            setTranslations: () => {},
          }}
        >
          <Results />
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );
    expect(screen.getByText("6/12")).toBeInTheDocument();
  });

  test('should award "50%" when 6 out of 12 pairs are correct', () => {
    const mockedTranslations: Translations = structuredClone(translationsData);
    const numPairsToSetAsCorrect: number = 6;

    // Set 6 pairs to be correct.
    Object.values(mockedTranslations).some((frenchWords, index) => {
      frenchWords["userAnswer"] = frenchWords["answer"];
      return index >= numPairsToSetAsCorrect - 1;
    });

    render(
      <GameStateContext.Provider
        value={{ gameState: "review", setGameState: () => () => {} }}
      >
        <TranslationsContext.Provider
          value={{
            translations: mockedTranslations,
            setTranslations: () => {},
          }}
        >
          <Results />
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );
    expect(screen.getByText("50%")).toBeInTheDocument();
  });

  test('should award "12/12" when all pairs are correct', () => {
    const mockedTranslations: Translations = structuredClone(translationsData);

    Object.values(mockedTranslations).forEach((frenchWords, index) => {
      frenchWords["userAnswer"] = frenchWords["answer"];
    });

    render(
      <GameStateContext.Provider
        value={{ gameState: "review", setGameState: () => () => {} }}
      >
        <TranslationsContext.Provider
          value={{
            translations: mockedTranslations,
            setTranslations: () => {},
          }}
        >
          <Results />
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );
    expect(screen.getByText("12/12")).toBeInTheDocument();
  });

  test('should award "100%" when all pairs are correct', () => {
    const mockedTranslations: Translations = structuredClone(translationsData);

    Object.values(mockedTranslations).forEach((frenchWords, index) => {
      frenchWords["userAnswer"] = frenchWords["answer"];
    });

    render(
      <GameStateContext.Provider
        value={{ gameState: "review", setGameState: () => () => {} }}
      >
        <TranslationsContext.Provider
          value={{
            translations: mockedTranslations,
            setTranslations: () => {},
          }}
        >
          <Results />
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  test("should list all pairs for review", () => {
    const mockedTranslations: Translations = structuredClone(translationsData);

    render(
      <GameStateContext.Provider
        value={{ gameState: "review", setGameState: () => () => {} }}
      >
        <TranslationsContext.Provider
          value={{
            translations: mockedTranslations,
            setTranslations: () => {},
          }}
        >
          <Results />
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );
    for (const [englishWord, frenchWords] of Object.entries(
      mockedTranslations
    )) {
      expect(screen.getByText(englishWord)).toBeInTheDocument();
      expect(screen.getByText(frenchWords.answer)).toBeInTheDocument();
    }
  });
});
