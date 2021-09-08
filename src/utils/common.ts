export const encodeImg = (file: File) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
};

export function sortByDate<T extends { releaseDate: Date }[]>(type: 'asc' | 'desc', data: T): T {
  for (let i = 0; i < data.length - 1; i++) {
    for (let j = 1; j < data.length - i; j++) {
      const prev = data[j - 1].releaseDate;
      const curt = data[j].releaseDate;
      if (
        type === 'desc'
          ? prev.getFullYear() < curt.getFullYear() ||
            (prev.getFullYear() === curt.getFullYear() && prev.getMonth() < curt.getMonth()) ||
            (prev.getFullYear() === curt.getFullYear() &&
              prev.getMonth() === curt.getMonth() &&
              prev.getDate() < curt.getDate())
          : prev.getFullYear() > curt.getFullYear() ||
            (prev.getFullYear() === curt.getFullYear() && prev.getMonth() > curt.getMonth()) ||
            (prev.getFullYear() === curt.getFullYear() &&
              prev.getMonth() === curt.getMonth() &&
              prev.getDate() > curt.getDate())
      ) {
        const tmp: T[0] = data[j];
        data[j] = data[j - 1];
        data[j - 1] = tmp;
      }
    }
  }
  return data;
}

export function displayDate(date: Date, split = '/'): string {
  return `${date.getFullYear()}${split}${displayDigit(String(date.getMonth() + 1))}${split}${displayDigit(
    String(date.getDate()),
  )}`;
}

export function specifor<T>(times: number, func: (index: number) => T): T[] {
  const list = [];
  for (let i = 0; i < times; i++) {
    list.push(func(i));
  }
  return list;
}

export function displayDigit(str: string, digit = 1) {
  let preposition = '';
  for (let i = 0; i < digit; i++) {
    preposition += '0';
  }
  return (preposition + str).slice(-1 + -1 * digit);
}

export function compare<T>(prev: T, next: T) {
  return JSON.stringify(prev) === JSON.stringify(next);
}

export function section<T>(data: { section: string; text: T }[]): { [sectionName: string]: T } {
  const titles: { [sectionName: string]: T } = {};
  data.forEach((title) => (titles[title.section] = title.text));
  return titles;
}
