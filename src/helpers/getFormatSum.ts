export function getFormatSum(sum: number | string) {
  const value = typeof sum === 'number' ? sum : parseFloat(sum);

  return value.toLocaleString('ru-RU');
}
