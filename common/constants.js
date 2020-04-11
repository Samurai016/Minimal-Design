export const KEY_COLOR = "color";
export const KEY_DISPLAY_ELEMENT = "displayelement";
export const KEY_DISPLAY_ELEMENT_FLAG = "displayelementflag";
export const KEY_WEEKDAY_FORMAT = "weekdayformat";
export const KEY_DATE_FORMAT = "dateformat";

export const DISPLAY_ELEMENT_BATTERY = "battery";
export const DISPLAY_ELEMENT_HEART = "heartrate";

export const DEFAULT_MODEL = {
  [KEY_COLOR]: "#24FEC9",
  [KEY_DISPLAY_ELEMENT]: DISPLAY_ELEMENT_BATTERY,
  [KEY_DISPLAY_ELEMENT_FLAG]: true,
  [KEY_WEEKDAY_FORMAT]: "dddd",
  [KEY_DATE_FORMAT]: "DD MMMM",
};

// Note: don't reorder these as settings are saved based on array index.
// If this is needed you should migrate or at least rotate the settings key.
// See https://dev.fitbit.com/build/reference/settings-api/#select
export const DISPLAY_ELEMENTS = [
  DISPLAY_ELEMENT_BATTERY,
  DISPLAY_ELEMENT_HEART
];