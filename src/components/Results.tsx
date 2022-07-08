function Results({
  numCorrectPairs,
  currentWords,
  pairedWords,
  gradePercentage,
  translations,
}: {
  numCorrectPairs: number;
  currentWords: { [key: string]: string[] };
  pairedWords: { [key: string]: string };
  gradePercentage: number;
  translations: { [key: string]: string };
}) {
  return (
    <div className="results-component">
      Results:
      <div className="results-count">
        {numCorrectPairs}/{currentWords.english.length}
      </div>
      <div className="results-percentage">{gradePercentage.toFixed(0)}%</div>
      <div className="results">
        <div className="result-pair result-pair-header">
          <div className="result-word">English Word</div>
          <div className="result-word">Your Answer</div>
          <div className="result-word">Correct Answer</div>
        </div>
        {Object.entries(pairedWords).map(([englishWord, frenchWordChoice]) => {
          return (
            <div
              className={
                "result-pair" +
                " " +
                (frenchWordChoice === translations[englishWord]
                  ? "result-pair-correct"
                  : "result-pair-incorrect")
              }
            >
              <div className="result-word result-english">{englishWord}</div>
              <div className="result-word result-french">
                {frenchWordChoice}
              </div>
              <div className="result-word result-answer">
                {translations[englishWord]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Results;
