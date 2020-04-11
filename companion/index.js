import * as messaging from "messaging";
import { settingsStorage } from "settings";
import { DEFAULT_MODEL, 
         KEY_DISPLAY_ELEMENT,
         KEY_WEEKDAY_FORMAT,
         KEY_DATE_FORMAT } from "../common/constants";

// Message socket opens
messaging.peerSocket.onopen = () => {
  restoreSettings();
};

// Message socket closes
messaging.peerSocket.onclose = () => {
  //
};

// A user changes settings
settingsStorage.onchange = evt => {
  let data = {
    key: evt.key,
    newValue: evt.newValue
  };
  sendVal(data);
};

// Restore any previously saved settings and send to the device
function restoreSettings() {
  for (let index = 0; index < settingsStorage.length; index++) {
    let key = settingsStorage.key(index);
    if (key) {
      let data = {
        key: key,
        newValue: settingsStorage.getItem(key)
      };
      sendVal(data);
    }
  }
  Object.keys(DEFAULT_MODEL).forEach(function(key) {
    if (!settingsStorage.getItem(key)) {
     settingsStorage.setItem(key, formatDefaultValue(key)); 
    }
  });  
}

// Send data to device using Messaging API
function sendVal(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
}

function formatDefaultValue(key) {
  switch (key) {
    case KEY_DISPLAY_ELEMENT:
      return JSON.stringify({"values":{"value":DEFAULT_MODEL[key]},"selected":[0]});
    case KEY_WEEKDAY_FORMAT: 
    case KEY_DATE_FORMAT: 
      return JSON.stringify({"name":DEFAULT_MODEL[key]});
    default:
      return DEFAULT_MODEL[key];
  }
}