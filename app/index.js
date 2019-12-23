import clock from "clock";
import document from "document";
import { preferences, locale } from "user-settings";
import * as messaging from "messaging";
import { battery } from "power";
import * as util from "../common/utils";
import * as simpleSettings from "../common/settings";

clock.granularity = "minutes";

// UI
const hourLabel = document.getElementById("hours");
const minuteLabel = document.getElementById("minutes");
const weekdayLabel = document.getElementById("weekday");
const dateLabel = document.getElementById("date");
const batteryLabel = document.getElementById("battery");
const batteryIcon = document.getElementById("bolt");
const coloredElements = document.getElementsByClassName("colored");

var weekdayFormat = 'dddd';
var dateFormat = 'DD MMMM';
var showBattery = 1;

//Settings
function settingsCallback(data) {
  if (!data) {
    return;
  }
  if (data.color) {
    util.editColor(coloredElements, data.color);
  }
  if (data.weekdayformat) {
    weekdayFormat = data.weekdayformat.name;
    setLabels(new Date());
  }
  if (data.dateformat) {
    dateFormat = data.dateformat.name;
    setLabels(new Date());
  }
  
  //Battery
  var op = data.showbattery == false ? 0 : 1;
  batteryLabel.style.opacity = op;
  batteryIcon.style.opacity = op;
  showBattery = op;
}
simpleSettings.initialize(settingsCallback);

// Orologio e data
function setLabels(data) {
  const lingua = util.getLanguage(locale);
  weekdayLabel.text = util.format(data, weekdayFormat, lingua).toUpperCase();
  dateLabel.text = util.format(data, dateFormat, lingua).toUpperCase();
}
clock.ontick = (evt) => {
  let today = evt.date;
  
  let hours = today.getHours();
  hours = util.zeroPad((preferences.clockDisplay === "12h") ? hours % 12 || 12 : hours);
  let mins = util.zeroPad(today.getMinutes());
  
  hourLabel.text = hours;
  minuteLabel.text = mins;
  setLabels(today)
}

// Batteria
function updateBattery() {
  batteryLabel.text = Math.floor(battery.chargeLevel);
}
if (showBattery == 1) {
  battery.onchange = function() {
    updateBattery();
  }
  updateBattery();
}