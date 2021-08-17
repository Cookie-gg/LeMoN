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

