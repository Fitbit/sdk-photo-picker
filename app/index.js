import { me } from "appbit";
import clock from "clock";
import { display } from "display";
import document from "document";
import * as fs from "fs";
import { inbox } from "file-transfer";
import { preferences } from "user-settings";

import * as util from "../common/utils";

const SETTINGS_FILE = "settings.cbor";
const SETTINGS_TYPE = "cbor";

const labelTime = document.getElementById("labelTime");
const labelTimeShadow = document.getElementById("labelTimeShadow");
const imageBackground = document.getElementById("imageBackground");

let mySettings;
loadSettings();
me.onunload = saveSettings;

clock.granularity = "minutes";

clock.ontick = evt => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    hours = hours % 12 || 12;
  } else {
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  let timeString = `${hours}:${mins}`;
  labelTime.text = timeString;
  labelTimeShadow.text = timeString;
};

inbox.onnewfile = () => {
  let fileName;
  do {
    fileName = inbox.nextFile();
    if (fileName) {
      if (mySettings.bg && mySettings.bg !== "") {
        fs.unlinkSync(mySettings.bg);
      }
      mySettings.bg = `/private/data/${fileName}`;
      applySettings();
    }
  } while (fileName);
};

function loadSettings() {
  try {
    mySettings = fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  } catch (ex) {
    mySettings = {};
  }
  applySettings();
}

function saveSettings() {
  fs.writeFileSync(SETTINGS_FILE, mySettings, SETTINGS_TYPE);
}

function applySettings() {
  if (mySettings.bg) {
    imageBackground.image = mySettings.bg;
  }
  display.on = true;
}
