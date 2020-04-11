import document from "document";
import { battery } from "power";
import FileStore from "./fileStore";

export default class Battery {
  static instance = new Battery();

  constructor() {
    this.txtBattery = document.getElementById("battery");
    this.imgBattery = document.getElementById("battery-icon");
  }

  refresh() {
    let batteryChargeLevel = Math.floor(battery.chargeLevel);
    this.txtBattery.text = batteryChargeLevel;
  }

  hideIcon() {
    this.imgBattery.style.display = "none";
  }

  showIcon() {
    this.imgBattery.style.display = "inline";
  }

  hideText() {
    this.txtBattery.style.display = "none";
  }

  showText() {
    this.txtBattery.style.display = "inline";
  }
  
  hide() {
    this.hideIcon();
    this.hideText();
  }
  
  show() {
    this.showIcon();
    this.showText();
  }

  static run() {
    let batteryHandler = Battery.instance;
    
    batteryHandler.show();
    batteryHandler.refresh();
    
    battery.onchange = function() {
      batteryHandler.refresh();
    }
  }
}