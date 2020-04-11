import document from "document";
import { HeartRateSensor } from "heart-rate";
import { display } from "display";
import { BodyPresenceSensor } from "body-presence";
import { me as appbit } from "appbit";

export default class HeartRate {
  static instance = new HeartRate();
  
  constructor() {
    this.hrm = new HeartRateSensor();
    
    this.txtHeartRate = document.getElementById('heartrate');
    this.imgHeartRate = document.getElementById('heartrate-icon');
    
    this.txtHeartRate.text = "--";
    
    if (BodyPresenceSensor) {
      this.body = new BodyPresenceSensor();
      this.body.onreading = () => {
          this.body.present ? this.hrm.start() : this.hrm.stop();
      };
      this.body.start();
    }
  }
  
  show() {
    this.txtHeartRate.style.display = "inline";
    this.imgHeartRate.style.display = "inline";
  }
  
  hide() {
    this.txtHeartRate.style.display = "none";
    this.imgHeartRate.style.display = "none";
  }
  
  start() {
    if (appbit.permissions.granted("access_heart_rate")) {
      this.show();
      this.hrm.start();

      this.hrm.onreading = () => {
        console.log(this.hrm.heartRate);
        this.txtHeartRate.text = this.hrm.heartRate;
      }
      // Automatically stop the sensor when the screen is off to conserve battery
      display.onchange = () => {
        if (display.on) {
          this.body.start();
          this.hrm.start();
        } else {
          this.hrm.stop();
          this.body.stop();
        }
      };
    }
  }
  
  stop() {
    this.hrm.stop();
    this.body.stop();
    this.hide();
  }
}