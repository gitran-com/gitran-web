export function formatJson(json: { [prop: string]: any }) {
  const format = (json: { [prop: string]: any }) => {
    Object.keys(json).forEach(key => {
      const newKey = underlineToCamel(key);
      if (isObj(json[key])) {
        json[newKey] = formatJson(json[key]);
      } else if (isArr(json[key])) {
        const newArr = [...json[key]];
        newArr.map(item => (isObj(item) ? formatJson(item) : item));
        json[newKey] = newArr;
      } else {
        json[newKey] = json[key];
      }
      if (key !== newKey) {
        delete json[key];
      }
    });
  };
  format(json);
  return json;
}
function underlineToCamel(str: string): string {
  return str.split("_").reduce((prev, cur) => prev + cur[0].toUpperCase() + cur.substr(1));
}
const isObj = (x: any) => Object.prototype.toString.call(x) === "[object Object]";
const isArr = (x: any) => Object.prototype.toString.call(x) === "[object Array]";
