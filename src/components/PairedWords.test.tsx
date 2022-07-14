import { render, screen } from "@testing-library/react";
import "core-js/actual/structured-clone";

import PairedWords from "./PairedWords";

import { GameStateContext } from "../contexts/GameStateContext";
import { TranslationsContext } from "../contexts/TranslationsContext";

import { Translations } from "../types/Translations";

import { translationsData } from "../data/translationsData";

describe("PairedWords component", () => {
  test("should not list unpaired words", () => {
    render(
      <GameStateContext.Provider
        value={{ gameState: "review", setGameState: () => () => {} }}
      >
        <TranslationsContext.Provider
          value={{ translations: translationsData, setTranslations: () => {} }}
        >
          <PairedWords />
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );
    expect(screen.queryByText("folder")).not.toBeInTheDocument();
  });

  test("should list all word pairs", () => {
    const mockedTranslations: Translations = structuredClone(translationsData);
    const mockEnglishWords: string[] = ["folder", "desk", "butter"];
    const mockFrenchWords: string[] = ["dossier", "calcaire", "bureau"];

    // Pair mock English words with mock French words.
    for (let i: number = 0; i < mockEnglishWords.length; i++) {
      mockedTranslations[mockEnglishWords[i]]["userAnswer"] =
        mockFrenchWords[i];
    }

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
          <PairedWords />
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );

    // Expect all English and French words to be in the docuemnt.
    for (let i: number = 0; i < mockEnglishWords.length; i++) {
      expect(screen.getByText(mockEnglishWords[i])).toBeInTheDocument();
      expect(screen.getByText(mockFrenchWords[i])).toBeInTheDocument();
    }
  });

  test("should group words belonging to the same pair", () => {
    const mockedTranslations: Translations = structuredClone(translationsData);
    const mockEnglishWords: string[] = ["folder", "desk", "butter"];
    const mockFrenchWords: string[] = ["dossier", "calcaire", "bureau"];

    // Pair mock English words with mock French words.
    for (let i: number = 0; i < mockEnglishWords.length; i++) {
      mockedTranslations[mockEnglishWords[i]]["userAnswer"] =
        mockFrenchWords[i];
    }

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
          <PairedWords />
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );

    const parentElement: HTMLDivElement | null =
      document.querySelector(".paired-words");

    // These indices refer to which child of a word pair element should be
    // expected to display the word from each language.
    const englishWordIndex: number = 0;
    const frenchWordIndex: number = 1;

    for (let i: number = 0; i < mockEnglishWords.length; i++) {
      const pairElement = parentElement?.children.item(i);
      const englishWordElement = pairElement?.children.item(englishWordIndex);
      expect(englishWordElement?.textContent).toBeTruthy();

      if (englishWordElement?.textContent) {
        const englishWord: string = englishWordElement?.textContent;
        const englishWordIndex: number = mockEnglishWords.indexOf(englishWord);
        const expectedFrenchWord: string = mockFrenchWords[englishWordIndex];
        const frenchWordElement = pairElement?.children.item(frenchWordIndex);
        expect(frenchWordElement).toHaveTextContent(expectedFrenchWord);
      }
    }
  });
});
