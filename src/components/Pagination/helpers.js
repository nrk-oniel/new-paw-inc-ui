// Referensi: https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
export function paginationList(curr, max) {
  const delta = 2;
  const left = curr - delta;
  const right = curr + delta + 1;

  const range = [];
  [...Array(max)].forEach((_, idx) => {
    const page = idx + 1;
    if (page === 1 || page === max || (page >= left && page < right)) {
      range.push(page);
    }
  });

  let tmp;
  const rangeWithDots = [];
  range.forEach((page) => {
    if (tmp) {
      if (page - tmp === 2) {
        rangeWithDots.push(tmp + 1);
      } else if (page - tmp !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(page);
    tmp = page;
  });

  return rangeWithDots;
}
