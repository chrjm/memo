import { useContext } from "react";

import { TranslationsContext } from "../contexts/TranslationsContext";

/**
 * Dynamically build a string of HTML classes for a result-pair element.
 *
 * @param frenchWords Contains the user's answer as well as the actual answer,
 *                    and is used to compare the two.
 * @returns A string of HTML classes separated with spaces.
 */
function determineResultPairClasses(frenchWords: {
  [key: string]: string;
}): string {
  const mainClass: string = "result-pair";
  const correctnessClass: string =
    frenchWords.userAnswer === frenchWords.answer
      ? "result-pair-correct"
      : "result-pair-incorrect";
  return [mainClass, correctnessClass].join(" ");
}

function Results() {
  const { translations } = useContext(TranslationsContext);

  const numPairs = Object.keys(translations).length;
  const numCorrectPairs: number = Object.values(translations)
    .filter((frenchWords) => frenchWords.userAnswer === frenchWords.answer)
    .reduce((a, b) => a + 1, 0);

  const countString: string = `${numCorrectPairs}/${numPairs}`;
  const percentageCorrect: number = (numCorrectPairs / numPairs) * 100;

  return (
    <div className="results-component">
      Results:
      <div className="results-count">{countString}</div>
      <div className="results-percentage">{percentageCorrect.toFixed(0)}%</div>
      <div className="results">
        <div className="result-pair result-pair-header">
          <div className="result-word">English Word</div>
          <div className="result-word">Your Answer</div>
          <div className="result-word">Correct Answer</div>
        </div>
        {Object.entries(translations).map(([englishWord, frenchWords]) => {
          return (
            <div
              className={determineResultPairClasses(frenchWords)}
              key={englishWord}
            >
              <div className="result-word result-english">{englishWord}</div>
              <div className="result-word result-french">
                {frenchWords.userAnswer}
              </div>
              <div className="result-word result-answer">
                {frenchWords.answer}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Results;
