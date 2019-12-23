import {dayjs} from './libs.js';

// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function editColor(elements, color) {
  for (var i=0; i<elements.length; i++) {
    elements[i].style.fill = color;
  }
}

export function format(date, format, lang) {
  return dayjs(date).locale(lang).format(format);
}

export function getLanguage(locale) {
  return locale.language.indexOf('zh') !== -1 ? 'zh-cn' : locale.language.substring(0,2);
}


