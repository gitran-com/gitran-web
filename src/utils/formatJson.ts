export function formatJson(json: { [prop: string]: any }) {
  const format = (json: { [prop: string]: any }) => {
    Object.keys(json).forEach(key => {
      const newKey = underlineToCamel(key);
      json[newKey] =
        Object.prototype.toString.call(json[key]) === "[object Object]" ? formatJson(json[key]) : json[key];
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
