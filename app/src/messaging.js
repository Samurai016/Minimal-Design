import * as messaging from "messaging";
import { KEY_COLOR,
         KEY_DISPLAY_ELEMENT_FLAG,
         KEY_DISPLAY_ELEMENT,
         KEY_WEEKDAY_FORMAT,
         KEY_DATE_FORMAT } from "../../common/constants";
import FileStore from './fileStore';
import UI from "./ui";
import Battery from './battery';
import Clock from './clock';

export default class Messaging {
  static run() {
    const fileStore = FileStore.instance;
    const ui = UI.instance;
    const clock = Clock.instance;

    // Message socket opens
    messaging.peerSocket.onopen = () => {
      console.log("App Socket Open");
    };

    // Message socket closes
    messaging.peerSocket.onclose = () => {
      console.log("App Socket Closed");
    };

    messaging.peerSocket.onmessage = evt => {
      if (!evt.data.newValue) return;
      
      let data = evt.data.newValue;
      try {
        data = JSON.parse(evt.data.newValue);
        data = data.name ? data.name : data;
      } catch (e) {}

      fileStore.setValue(evt.data.key, data);

      switch (evt.data.key) {
        case KEY_COLOR: {
          ui.updateColor(data);
          break;
        }
        case KEY_DISPLAY_ELEMENT_FLAG: {
          ui.setState(KEY_DISPLAY_ELEMENT_FLAG, data, true);
          break;
        } 
        case KEY_DISPLAY_ELEMENT: {
          ui.setState(KEY_DISPLAY_ELEMENT, data, true);
          break;
        } 
        case KEY_WEEKDAY_FORMAT:
        case KEY_DATE_FORMAT: {
          clock.refresh(new Date(), fileStore);
          break;
        }
      }
    };
  }
}