export const encodeImg = (file: File) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
};
export function sortByDate<T extends { date: string }[]>(type: 'asc' | 'desc', data: T): T {
  for (let i = 0; i < data.length - 1; i++) {
    for (let j = 1; j < data.length - i; j++) {
      const curtArray = data[j].date.split('/');
      const curt = {
        year: Number(curtArray[0]),
        month: Number(curtArray[1]),
        day: Number(curtArray[1]),
      };
      const prevArray = data[j - 1].date.split('/');
      const prev = {
        year: Number(prevArray[0]),
        month: Number(prevArray[1]),
        day: Number(prevArray[1]),
      };
      if (
        type === 'desc'
          ? prev.year < curt.year ||
            (prev.year === curt.year && prev.month < curt.month) ||
            (prev.year === curt.year && prev.month === curt.month && prev.day < curt.day)
          : prev.year > curt.year ||
            (prev.year === curt.year && prev.month > curt.month) ||
            (prev.year === curt.year && prev.month === curt.month && prev.day > curt.day)
      ) {
        const tmp: T[0] = data[j];
        data[j] = data[j - 1];
        data[j - 1] = tmp;
      }
    }
  }
  return data;
}
