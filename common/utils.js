import { datefeather } from './datefeather.min'

// Add zero in front of numbers < 10
const _repeat = (s,n) => {
  var str = "";
  for (var i=0;i<n;i++) str+=s;
  return str;
};
export const zeroPad = (n, zeros) => n<10 ? _repeat("0",zeros||1)+n : n.toString();
export const capitalize = (string)  => string.charAt(0).toUpperCase() + string.slice(1);
export const format = (date, format) => datefeather(date, format);