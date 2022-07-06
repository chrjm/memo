import React, { FC } from "react";
import "./App.css";

import WordsColumn from "./components/WordsColumn";

import { translations } from "./translations";

const App: FC = () => {
  return (
    <div className="App">
      <h1>Memo</h1>
      <button>GO!</button>
      <div className="word-columns">
        <WordsColumn
          name="English Words"
          words={Object.keys(translations)}
        ></WordsColumn>
        <WordsColumn
          name="French Words"
          words={Object.values(translations)}
        ></WordsColumn>
      </div>
    </div>
  );
};

export default App;
