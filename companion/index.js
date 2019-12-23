import { settingsStorage } from "settings";
import * as messaging from "messaging";
import { me } from "companion";

let KEY_COLOR = "uiColor";

// Settings have been changed
settingsStorage.onchange = function(evt) {
  sendValue(evt.key, evt.newValue);
}

if (!settingsStorage.getItem("showbattery")) {
 settingsStorage.setItem("showbattery", true); 
}
if (!settingsStorage.getItem("color")) {
 settingsStorage.setItem("color", "#24FEC9"); 
}
if (!settingsStorage.getItem("weekdayformat")) {
 settingsStorage.setItem("weekdayformat", "dddd"); 
}
if (!settingsStorage.getItem("dateformat")) {
 settingsStorage.setItem("dateformat", "DD MMMM"); 
}

function sendValue(key, val) {
  if (val) {
    sendSettingData({
      key: key,
      value: JSON.parse(val)
    });
  }
}
function sendSettingData(data) {
  // If we have a MessageSocket, send the data to the device
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  } else {
    console.log("No peerSocket connection");
  }
}