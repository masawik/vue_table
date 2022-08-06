export const range = (from: number, to: number): Array<number> =>
  new Array(to - from)
    .fill(null)
    .map((_, index) => from + index);
