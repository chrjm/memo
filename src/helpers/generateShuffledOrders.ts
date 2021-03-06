/**
 * Generate and shuffle an integer array representing an order of indexes to
 * traverse an array in a shuffled manner.
 *
 * For example, if the provided length is 3:
 * An integer array will be generated with a length of 3: [0, 1, 2].
 * This array will then be sorted randomly. An example shuffle may result in:
 * [2, 0, 1]. This shuffled integer array will then be returned.
 *
 * The sorting method here is an implementation of the Durstenfeld variation of the
 * unbiased Fisher–Yates shuffle:
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
 *
 * @length An integer representing the length of the array to be traversed.
 * @returns An integer array representing an order of indexes.
 */
function generateShuffledOrder(length: number): number[] {
  const array = Array.from(Array(length).keys());
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Generate shuffled orders to traverse each language's word list.
 * Each word list has a different order so that the pairs are mixed.
 *
 * @param numberOfPairs The number of pairs, e.g. {hello: "bonjour"} is one pair.
 * @returns An object containing a shuffled order for "english" and "french" keys.
 */
export function generateShuffledOrders(numberOfPairs: number): {
  [key: string]: number[];
} {
  return {
    english: generateShuffledOrder(numberOfPairs),
    french: generateShuffledOrder(numberOfPairs),
  };
}
