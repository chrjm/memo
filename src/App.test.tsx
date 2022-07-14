import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "core-js/actual/structured-clone";

import App from "./App";

describe("App component", () => {
  test("should display welcome instructions text on first load", () => {
    render(<App />);
    expect(screen.getByText("👋 Welcome to Memo!")).toBeInTheDocument();
  });

  test('in "test" state, should display quiz instructions', () => {
    render(<App />);
    userEvent.click(screen.getByText("GO!"));
    expect(screen.getByText("✏️ Quiz time!")).toBeInTheDocument();
  });

  test('in "review" state, should display review instructions', () => {
    render(<App />);
    userEvent.click(screen.getByText("GO!"));
    userEvent.click(screen.getByText("Grade >>"));
    expect(screen.getByText("📝 Results are in!")).toBeInTheDocument();
  });
});
