import { readFileSync, writeFileSync } from "fs";
import { DEFAULT_MODEL } from '../../common/constants'

const FILENAME = "minimaldesign.cbor";
const FILETYPE = "cbor";

export default class FileStore {
  static instance = new FileStore();

  constructor() {
    try {
      this.model = readFileSync(FILENAME, FILETYPE);
    } catch (e) {
      console.error(
        "FileStore encountered error on load, using default state.",
        e
      );
      this.model = DEFAULT_MODEL;
      this.saveModel();
    }
  }

  getValue(key) {
    if (this.model[key] === undefined) {
      return DEFAULT_MODEL[key];
    } else {
      return this.model[key];
    }
  }

  setValue(key, value) {
    this.model[key] = value;
    this.saveModel();
  }

  saveModel() {
    try {
      writeFileSync(FILENAME, this.model, FILETYPE);
    } catch (e) {
      console.error("FileStore encountered an error when saving:", e);
    }
  }
}