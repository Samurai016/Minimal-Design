import document from 'document';
import {
  KEY_COLOR,
  KEY_DISPLAY_ELEMENT_FLAG,
  KEY_DISPLAY_ELEMENT,
  DISPLAY_ELEMENT_BATTERY,
  DISPLAY_ELEMENT_HEART,
} from '../../common/constants';
import HeartRate from './heartrate';
import Battery from './battery';
import FileStore from './fileStore';

export default class UI {
  static instance = new UI();

  constructor() {
    this.fileStore = FileStore.instance;
    this.colorConfigurableElements = document.getElementsByClassName('colored');
  }

  updateColor(color) {
    this.colorConfigurableElements.forEach((element) => {
      element.style.fill = color;
    });
  }

  restore() {
    const color = this.fileStore.getValue(KEY_COLOR);
    this.updateColor(color);
    this.setState(KEY_DISPLAY_ELEMENT, this.fileStore.getValue(KEY_DISPLAY_ELEMENT) || DISPLAY_ELEMENT_BATTERY);
    this.setState(KEY_DISPLAY_ELEMENT_FLAG, this.fileStore.getValue(KEY_DISPLAY_ELEMENT_FLAG) || true);    
  }

  setState(key, data, save) {    
    if (key==KEY_DISPLAY_ELEMENT_FLAG) {
      if (save) {
        this.fileStore.setValue(KEY_DISPLAY_ELEMENT_FLAG, data);
      }
      if (data==false) {
        Battery.instance.hide();
        HeartRate.instance.stop();
      } else {
        this.setState(KEY_DISPLAY_ELEMENT, this.fileStore.getValue(KEY_DISPLAY_ELEMENT) || DISPLAY_ELEMENT_BATTERY);
      }
    } else {
       try {
          data = data.values[0].value;
        } catch (e) {}

        if (save) {
          this.fileStore.setValue(KEY_DISPLAY_ELEMENT, {"values":[{"value":data}]});
        }
        if (this.fileStore.getValue(KEY_DISPLAY_ELEMENT_FLAG)==true) {
          switch (data) {
            case DISPLAY_ELEMENT_HEART:
              HeartRate.instance.start();
              Battery.instance.hide();
              break;
            default:
              Battery.run();
              HeartRate.instance.stop();
              break;
          }
        } 
    }
  }
}