export function customDelay(milisec: number, text: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(text);
    }, milisec);
  });
}
