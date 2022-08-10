export const range = (from: number, to: number): Array<number> =>
  Array.from({ length: to - from })
    .map((_, index) => from + index);
