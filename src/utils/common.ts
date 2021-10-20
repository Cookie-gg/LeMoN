import { Maybe } from 'graphql/jsutils/Maybe';

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

export function displayDate(date: Date, split = '/', compare = true): string {
  if (compare) {
    const now = new Date();
    if (
      now.getFullYear().toString() === date.getFullYear().toString() &&
      now.getMonth().toString() === date.getMonth().toString()
    ) {
      return `${now.getDate() - date.getMonth()} days ago`;
    } else
      return `${date.getFullYear()}${split}${displayDigit(String(date.getMonth() + 1))}${split}${displayDigit(
        String(date.getDate()),
      )}`;
  } else
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

export function section<T>(data: { text: T; section: string; icon?: Maybe<string> | undefined }[]): {
  [sectionName: string]: { text: T; icon?: string | null };
} {
  const titles: { [sectionName: string]: { text: T; icon?: string | null } } = {};
  data.forEach((title) => {
    titles[title.section] = {
      icon: title.icon,
      text: title.text,
    };
  });
  return titles;
}

export function list(data: { name: string; list: { title: string }[] }[]): { [sectionName: string]: string[] } {
  const lists: { [sectionName: string]: string[] } = {};
  data.forEach((obj) => {
    lists[obj.name] = obj.list.map((list) => list.title);
  });
  return lists;
}

export function editorPaste(text: string, wrapNodeName = 'DIV') {
  const selection = getSelection();
  const focusElement = selection ? selection.focusNode : null;
  if (focusElement !== null && selection !== null) {
    if (focusElement.nodeName === wrapNodeName) {
      console.log(text);
      (focusElement as HTMLDivElement).insertAdjacentHTML('afterbegin', text);
    } else {
      const parent = focusElement.parentNode as HTMLDivElement;
      const before = parent.innerText.slice(0, selection.anchorOffset);
      const after = parent.innerText.slice(selection.anchorOffset);
      parent.innerHTML = `${before}${text}${after}`;
      // console.log(selection.getRangeAt(0).getBoundingClientRect());
      // const range = document.createRange();
      // range.setStart(parent, text.length);
      // range.collapse(true);
      // selection.removeAllRanges();
      // selection.addRange(range);
    }
    // const range = document.createRange();
    // editorRange.setStart(node, 0);
    // editorRange.collapse(true);
  }
}
