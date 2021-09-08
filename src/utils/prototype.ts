export {};

Array.prototype.specifor = function (times, func) {
  const list = [];
  for (let i = 0; i < times; i++) {
    list.push(func(this[i], i, this));
  }
  return list;
};

Array.prototype.exSpecifor = function (times, func) {
  const list = [];
  for (let i = times; i < this.length; i++) {
    list.push(func(this[i], i, this));
  }
  return list;
};

Array.prototype.sortObj = function <U>(key: string, type: 'asc' | 'desc' = 'desc', length?: boolean) {
  return this.slice().sort((a, b) => {
    const a_target = length ? (a[key] as []).length : (a[key] as U);
    const b_target = length ? (b[key] as []).length : (b[key] as U);
    if (a_target < b_target) return type === 'asc' ? 1 : -1;
    if (a_target > b_target) return type === 'asc' ? -1 : 1;
    return 0;
  });
};

Array.prototype.rangeMap = function (start, end, func) {
  const list = [];
  for (let i = start; i <= end; i++) {
    list.push(func(this[i - 1], i, this));
  }
  return list;
};
