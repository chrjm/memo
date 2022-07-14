import { useContext } from "react";

import { TranslationsContext } from "../contexts/TranslationsContext";

import correctIcon from "../static/images/correct_icon.svg";
import incorrectIcon from "../static/images/incorrect_icon.svg";

/**
 * Dynamically build a string of HTML classes for a user answer element.
 *
 * @param isCorrect Represents whether this user answer is correct.
 * @returns A string of HTML classes separated with spaces.
 */
function determineUserAnswerClasses(isCorrect: boolean): string {
  const mainClass: string = "result-word result-french";
  const correctnessClass: string = isCorrect ? "" : "result-word-incorrect";
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
      <div className="results-datapoints">
        <div
          className="results-datapoint animate__animated animate__fadeInUp"
          style={{ animationDelay: "0ms" }}
        >
          <div className="results-datapoint-value results-count">
            {countString}
          </div>
          <div className="results-datapoint-label">Correct Pairs</div>
        </div>
        <div
          className="results-datapoint animate__animated animate__fadeInUp"
          style={{ animationDelay: "100ms" }}
        >
          <div className="results-datapoint-value results-percentage">
            {percentageCorrect.toFixed(0)}%
          </div>
          <div className="results-datapoint-label">Percentage Score</div>
        </div>
      </div>
      <div className="results">
        <div className="result-pair result-pair-header">
          <div className="result-word">English Word</div>
          <div className="result-word">Correct Answer</div>
          <div className="result-word">Your Answer</div>
          <div className="result-icon-wrapper"></div>
        </div>
        {Object.entries(translations).map(([englishWord, frenchWords]) => {
          const isCorrect: boolean =
            frenchWords.answer === frenchWords.userAnswer;
          return (
            <div className="result-pair" key={englishWord}>
              <div className="result-word result-english">{englishWord}</div>
              <div className="result-word result-answer">
                {frenchWords.answer}
              </div>
              <div className={determineUserAnswerClasses(isCorrect)}>
                {frenchWords.userAnswer}
              </div>
              <div className="result-icon-wrapper">
                <img
                  className="result-icon"
                  src={isCorrect ? correctIcon : incorrectIcon}
                  alt={isCorrect ? "A green checkmark" : "A red cross"}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Results;
