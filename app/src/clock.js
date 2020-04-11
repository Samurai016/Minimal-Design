import clock from "clock";
import { preferences } from "user-settings";
import { zeroPad, format } from "../../common/utils";
import document from "document";
import { KEY_WEEKDAY_FORMAT, KEY_DATE_FORMAT } from '../../common/constants';

export default class Clock {
  static instance = new Clock();

  constructor() {
    this.txtHours = document.getElementById("hours");
    this.txtMinutes = document.getElementById("minutes");
    this.txtWeekday = document.getElementById("weekday");
    this.txtDate = document.getElementById("date");
  }

  init(fileStore) {
    clock.granularity = "minutes";
    // Update the clock / date every tick
    clock.ontick = (evt) => {
      this.refresh(evt.date, fileStore);
    }
  }
  
  refresh(today, fileStore) {
    let hours = today.getHours();
    hours = zeroPad((preferences.clockDisplay === "12h") ? hours % 12 || 12 : hours);
    let mins = zeroPad(today.getMinutes());

    // Print the clock
    this.txtHours.text = hours;
    this.txtMinutes.text = mins;

    //Print the date
    const dateFormat = fileStore.getValue(KEY_DATE_FORMAT);
    const weekdayFormat = fileStore.getValue(KEY_WEEKDAY_FORMAT);
    this.txtWeekday.text = format(today, weekdayFormat).toUpperCase();
    this.txtDate.text = format(today, dateFormat).toUpperCase();
  }

  static run(fileStore) {
    Clock.instance.init(fileStore);
  }

}