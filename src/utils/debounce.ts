export function debounce(func: Function, delay = 500) {
  let timer: NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
