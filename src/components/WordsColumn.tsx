function WordsColumn({ name, words }: { name: string; words: string[] }) {
  return (
    <div className="words-column">
      <div className="words-column-name">{name}</div>
      <div className="words">
        {words.map((word: string) => {
          return (
            <div className="word" key={word}>
              {word}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WordsColumn;
