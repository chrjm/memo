import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "core-js/actual/structured-clone";

import WordColumns from "./WordColumns";

import { GameStateContext } from "../contexts/GameStateContext";
import { TranslationsContext } from "../contexts/TranslationsContext";

import { Translations } from "../types/Translations";

import { translationsData } from "../data/translationsData";

describe("WordColumns component", () => {
  test('has a column with the label "english"', () => {
    render(
      <GameStateContext.Provider
        value={{ gameState: "learn", setGameState: () => {} }}
      >
        <TranslationsContext.Provider
          value={{ translations: translationsData, setTranslations: () => {} }}
        >
          <WordColumns />
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );

    expect(screen.getByText("english")).toBeInTheDocument();
  });

  test('has a column with the label "french"', () => {
    render(
      <GameStateContext.Provider
        value={{ gameState: "learn", setGameState: () => {} }}
      >
        <TranslationsContext.Provider
          value={{ translations: translationsData, setTranslations: () => {} }}
        >
          <WordColumns />
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );

    expect(screen.getByText("french")).toBeInTheDocument();
  });

  test('in "learn" state, lists all 12 English words"', () => {
    render(
      <GameStateContext.Provider
        value={{ gameState: "learn", setGameState: () => {} }}
      >
        <TranslationsContext.Provider
          value={{ translations: translationsData, setTranslations: () => {} }}
        >
          <WordColumns />
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );

    for (const englishWord of Object.keys(translationsData)) {
      expect(screen.getByText(englishWord)).toBeInTheDocument();
    }
  });

  test('in "learn" state, lists all 12 French words"', () => {
    render(
      <GameStateContext.Provider
        value={{ gameState: "learn", setGameState: () => {} }}
      >
        <TranslationsContext.Provider
          value={{ translations: translationsData, setTranslations: () => {} }}
        >
          <WordColumns />
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );

    for (const frenchWords of Object.values(translationsData)) {
      expect(screen.getByText(frenchWords.answer)).toBeInTheDocument();
    }
  });

  test('in "learn" state, lists 12 English words in their unshuffled order"', () => {
    render(
      <GameStateContext.Provider
        value={{ gameState: "learn", setGameState: () => {} }}
      >
        <TranslationsContext.Provider
          value={{ translations: translationsData, setTranslations: () => {} }}
        >
          <WordColumns />
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
    render(
      <GameStateContext.Provider
        value={{ gameState: "learn", setGameState: () => {} }}
      >
        <TranslationsContext.Provider
          value={{ translations: translationsData, setTranslations: () => {} }}
        >
          <WordColumns />
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

  test('in "test" state, lists all 12 English words"', () => {
    render(
      <GameStateContext.Provider
        value={{ gameState: "test", setGameState: () => {} }}
      >
        <TranslationsContext.Provider
          value={{ translations: translationsData, setTranslations: () => {} }}
        >
          <WordColumns />
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );

    for (const englishWord of Object.keys(translationsData)) {
      expect(screen.getByText(englishWord)).toBeInTheDocument();
    }
  });

  test('in "test" state, lists all 12 French words"', () => {
    render(
      <GameStateContext.Provider
        value={{ gameState: "learn", setGameState: () => {} }}
      >
        <TranslationsContext.Provider
          value={{ translations: translationsData, setTranslations: () => {} }}
        >
          <WordColumns />
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );

    for (const frenchWords of Object.values(translationsData)) {
      expect(screen.getByText(frenchWords.answer)).toBeInTheDocument();
    }
  });

  test('in "learn" state, clicking a word of each language does not call translations setter"', () => {
    const mockSetTranslations: Function = jest.fn();
    render(
      <GameStateContext.Provider
        value={{ gameState: "learn", setGameState: () => {} }}
      >
        <TranslationsContext.Provider
          value={{
            translations: translationsData,
            setTranslations: () => mockSetTranslations(),
          }}
        >
          <WordColumns />
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );

    userEvent.click(screen.getByText("forest"));
    userEvent.click(screen.getByText("dossier"));
    expect(mockSetTranslations).toHaveBeenCalledTimes(0);
  });

  test('in "test" state, clicking two English words does not call translations setter"', () => {
    const mockSetTranslations: Function = jest.fn();
    render(
      <GameStateContext.Provider
        value={{ gameState: "test", setGameState: () => {} }}
      >
        <TranslationsContext.Provider
          value={{
            translations: translationsData,
            setTranslations: () => mockSetTranslations(),
          }}
        >
          <WordColumns />
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );

    userEvent.click(screen.getByText("forest"));
    userEvent.click(screen.getByText("desk"));
    expect(mockSetTranslations).toHaveBeenCalledTimes(0);
  });

  test('in "test" state, clicking two French words does not call translations setter"', () => {
    const mockSetTranslations: Function = jest.fn();
    render(
      <GameStateContext.Provider
        value={{ gameState: "test", setGameState: () => {} }}
      >
        <TranslationsContext.Provider
          value={{
            translations: translationsData,
            setTranslations: () => mockSetTranslations(),
          }}
        >
          <WordColumns />
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );

    userEvent.click(screen.getByText("chameau"));
    userEvent.click(screen.getByText("faim"));
    expect(mockSetTranslations).toHaveBeenCalledTimes(0);
  });

  test('in "test" state, clicking an English word, followed by a French word, calls translations setter "', () => {
    const mockSetTranslations: Function = jest.fn();
    render(
      <GameStateContext.Provider
        value={{ gameState: "test", setGameState: () => {} }}
      >
        <TranslationsContext.Provider
          value={{
            translations: translationsData,
            setTranslations: () => mockSetTranslations(),
          }}
        >
          <WordColumns />
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );

    userEvent.click(screen.getByText("forest"));
    userEvent.click(screen.getByText("dossier"));
    expect(mockSetTranslations).toHaveBeenCalledTimes(1);
  });

  test('in "test" state, clicking a French word, followed by an English word, calls translations setter "', () => {
    const mockSetTranslations: Function = jest.fn();
    render(
      <GameStateContext.Provider
        value={{ gameState: "test", setGameState: () => {} }}
      >
        <TranslationsContext.Provider
          value={{
            translations: translationsData,
            setTranslations: () => mockSetTranslations(),
          }}
        >
          <WordColumns />
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );

    userEvent.click(screen.getByText("dossier"));
    userEvent.click(screen.getByText("forest"));
    expect(mockSetTranslations).toHaveBeenCalledTimes(1);
  });

  test('does not list English words that have been paired by the user"', () => {
    const mockedTranslations: Translations = structuredClone(translationsData);
    mockedTranslations["desk"]["userAnswer"] = "bureau";

    const mockSetTranslations: Function = jest.fn();
    render(
      <GameStateContext.Provider
        value={{ gameState: "test", setGameState: () => {} }}
      >
        <TranslationsContext.Provider
          value={{
            translations: mockedTranslations,
            setTranslations: () => mockSetTranslations(),
          }}
        >
          <WordColumns />
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );
    expect(screen.queryByText("desk")).not.toBeInTheDocument();
  });

  test('does not list French words that have been paired by the user"', () => {
    const mockedTranslations: Translations = structuredClone(translationsData);
    mockedTranslations["desk"]["userAnswer"] = "bureau";

    const mockSetTranslations: Function = jest.fn();
    render(
      <GameStateContext.Provider
        value={{ gameState: "test", setGameState: () => {} }}
      >
        <TranslationsContext.Provider
          value={{
            translations: mockedTranslations,
            setTranslations: () => mockSetTranslations(),
          }}
        >
          <WordColumns />
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );
    expect(screen.queryByText("bureau")).not.toBeInTheDocument();
  });
});
