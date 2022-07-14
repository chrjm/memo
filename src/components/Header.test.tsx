import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "core-js/actual/structured-clone";

import Header from "./Header";

import { GameStateContext } from "../contexts/GameStateContext";
import { TranslationsContext } from "../contexts/TranslationsContext";

describe("Header component", () => {
  test('has "Memo" in heading tag', () => {
    render(<Header />);
    expect(screen.getByRole("heading")).toHaveTextContent("Memo");
  });

  test('in "learn" state, has a button with the text "GO!"', () => {
    render(
      <GameStateContext.Provider
        value={{ gameState: "learn", setGameState: () => {} }}
      >
        <Header />
      </GameStateContext.Provider>
    );
    expect(screen.getByRole("button")).toHaveTextContent("GO!");
  });

  test('in "test" state, has a button with the text "Grade >>"', () => {
    render(
      <GameStateContext.Provider
        value={{ gameState: "test", setGameState: () => {} }}
      >
        <Header />
      </GameStateContext.Provider>
    );
    expect(screen.getByRole("button")).toHaveTextContent("Grade >>");
  });

  test('in "review" state, has a button with the text "<< Restart"', () => {
    render(
      <GameStateContext.Provider
        value={{ gameState: "review", setGameState: () => {} }}
      >
        <Header />
      </GameStateContext.Provider>
    );
    expect(screen.getByRole("button")).toHaveTextContent("<< Restart");
  });

  test('in "learn" state, clicking the control button calls game state setter', () => {
    const mockSetGameState: Function = jest.fn();
    render(
      <GameStateContext.Provider
        value={{ gameState: "learn", setGameState: () => mockSetGameState() }}
      >
        <Header />
      </GameStateContext.Provider>
    );

    userEvent.click(screen.getByText("GO!"));
    expect(mockSetGameState).toHaveBeenCalledTimes(1);
  });

  test('in "test" state, clicking the control button calls game state setter', () => {
    const mockSetGameState: Function = jest.fn();
    render(
      <GameStateContext.Provider
        value={{ gameState: "test", setGameState: () => mockSetGameState() }}
      >
        <Header />
      </GameStateContext.Provider>
    );

    userEvent.click(screen.getByText("Grade >>"));
    expect(mockSetGameState).toHaveBeenCalledTimes(1);
  });

  test('in "review" state, clicking the control button calls game state setter', () => {
    const mockSetGameState: Function = jest.fn();
    render(
      <GameStateContext.Provider
        value={{ gameState: "review", setGameState: () => mockSetGameState() }}
      >
        <TranslationsContext.Provider
          value={{ translations: {}, setTranslations: () => {} }}
        >
          <Header />
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );

    userEvent.click(screen.getByText("<< Restart"));
    expect(mockSetGameState).toHaveBeenCalledTimes(1);
  });

  test("calls translations reset function when restarting the game", () => {
    const mockSetTranslations: Function = jest.fn();
    render(
      <GameStateContext.Provider
        value={{ gameState: "review", setGameState: () => {} }}
      >
        <TranslationsContext.Provider
          value={{
            translations: {},
            setTranslations: () => mockSetTranslations(),
          }}
        >
          <Header />
        </TranslationsContext.Provider>
      </GameStateContext.Provider>
    );

    userEvent.click(screen.getByText("<< Restart"));
    expect(mockSetTranslations).toHaveBeenCalledTimes(1);
  });
});
