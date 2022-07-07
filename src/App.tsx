import { FC, useState } from "react";
import "./App.css";

import WordsColumn from "./components/WordsColumn";

import { shuffleArray } from "./helpers/shuffleArray";
import { translations } from "./translations";

const App: FC = () => {
  const [currentWords, setCurrentWords] = useState<{ [key: string]: string[] }>(
    {
      english: Object.keys(translations),
      french: Object.values(translations),
    }
  );

  return (
    <div className="App">
      <h1>Memo</h1>
      <button
        onClick={() => {
          setCurrentWords({
            english: shuffleArray(currentWords.english),
            french: shuffleArray(currentWords.french),
          });
        }}
      >
        GO!
      </button>
      <div className="word-columns">
        <WordsColumn
          name="English Words"
          words={currentWords.english}
        ></WordsColumn>
        <WordsColumn
          name="French Words"
          words={currentWords.french}
        ></WordsColumn>
      </div>
    </div>
  );
};

export default App;
