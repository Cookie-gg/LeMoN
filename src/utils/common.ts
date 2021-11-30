export const encodeImg: (file: File) => Promise<string | ArrayBuffer | null> = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
};

export const encodeEmoji: (emoji: string) => string = (emoji) => {
  let comp: number;
  if (emoji.length === 1) {
    comp = emoji.charCodeAt(0);
  }
  comp = (emoji.charCodeAt(0) - 0xd800) * 0x400 + (emoji.charCodeAt(1) - 0xdc00) + 0x10000;
  if (comp < 0) {
    comp = emoji.charCodeAt(0);
  }
  return comp.toString(16);
};

export const displayDate = (date: Date, split = '/', compare = true) => {
  if (compare) {
    const now = new Date();
    if (
      now.getFullYear().toString() === date.getFullYear().toString() &&
      now.getMonth().toString() === date.getMonth().toString()
    ) {
      return `${now.getDate() - date.getMonth()} days ago`;
    } else
      return `${date.getFullYear()}${split}${`0${date.getMonth() - 1}`.slice(-2)}${split}${`0${date.getDate()}`.slice(
        -2,
      )}`;
  } else
    return `${date.getFullYear()}${split}${`0${date.getMonth() - 1}`.slice(-2)}${split}${`0${date.getDate()}`.slice(
      -2,
    )}`;
};

export const specifor: <T>(times: number, func: (index: number) => T) => T[] = (times, func) => {
  const list = [];
  for (let i = 0; i < times; i++) {
    list.push(func(i));
  }
  return list;
};

export const EmojiValidation =
  /^(?:(?!(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff]))[^`~!+,!@#$%^&*();\/|<>"0-9=[\]{}_☺]){1,255}$/;
