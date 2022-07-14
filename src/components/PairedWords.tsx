import { useContext } from "react";

import { TranslationsContext } from "../contexts/TranslationsContext";

function PairedWords() {
  const { translations } = useContext(TranslationsContext);

  return (
    <div className="paired-words">
      {Object.entries(translations)
        .filter(([englishWord, frenchWords]) => frenchWords.userAnswer !== "")
        .map(([englishWord, frenchWords]) => {
          return (
            <div className="paired-words-pair" key={englishWord}>
              <div className="word word-learn word-english word-pair-word">
                {englishWord}
              </div>
              <div className="word word-learn word-french word-pair-word">
                {frenchWords.userAnswer}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default PairedWords;
