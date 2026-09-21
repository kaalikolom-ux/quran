const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBengaliNumber(num: number | string): string {
  if (num === null || num === undefined) return '';
  return String(num).replace(/[0-9]/g, (w) => bnDigits[parseInt(w, 10)]);
}

export function fromBengaliNumber(str: string): string {
  if (!str) return '';
  let res = str;
  for (let i = 0; i < 10; i++) {
    res = res.replaceAll(bnDigits[i], String(i));
  }
  return res;
}
