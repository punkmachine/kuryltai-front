export function getFormatCardNumber(number: string) {
  let formatted = '';

  for (let i = 0; i < number.length; i += 4) {
    formatted += number.substring(i, i + 4) + ' ';
  }

  return formatted.trim();
}
