export function getWordDeclension(num: number, words: [string, string, string]): string {
  if (num % 10 === 1 && num % 100 !== 11) {
    return words[0];
  } else if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)) {
    return words[1];
  } else {
    return words[2];
  }
}
