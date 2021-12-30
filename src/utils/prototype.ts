export {};

Array.prototype.specifor = function (times, func) {
  const list = [];
  for (let i = 0; i < times; i++) {
    list.push(func(this[i], i, this));
  }
  return list;
};

Array.prototype.rangeMap = function (start, end, func) {
  const list = [];
  for (let i = start; i <= end; i++) {
    list.push(func(this[i - 1], i, this));
  }
  return list;
};
