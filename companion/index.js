import { me } from "companion";
import * as messaging from "messaging";
import { settingsStorage } from "settings";

import { TriggerAPI } from "./ifttt.js"
import { TRIGGER_COUNT, SETTING_TRIGGERS, SETTING_IFTTTKEY, is_set } from "../common/globals.js";

function sendClient(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    //console.log("sending " + JSON.stringify(data));
    messaging.peerSocket.send(data);
  }
}

function updateSetting(key) {
  let s = JSON.parse(settingsStorage.getItem(key));
  if (s != "") {
    s = s.map((opt) => { return opt["name"]; });
    sendClient({ key: key, value: s });
  }
}

function is_set (setting) {
  //console.log(setting + ": " + settingsStorage.getItem(setting));
  let s = JSON.parse(settingsStorage.getItem(setting));
  if (s.length >= 1) {
    return s.some((i) => { return i["name"]; });
  } else {
    return JSON.parse(settingsStorage.getItem(setting))["name"];
  }
}

settingsStorage.onchange = function(evt) {
  if (evt.key == SETTING_TRIGGERS) {
    updateSetting(evt.key);
  }
}

messaging.peerSocket.onopen = function() {
  let triggerAPI = new TriggerAPI();
  
  if (!is_set(SETTING_IFTTTKEY)) {
    sendClient({ key: "error", value: "IFTTT API Key not configured" });
  } else if (!is_set(SETTING_TRIGGERS)) {
    sendClient({ key: "error", value: "No triggers defined" });
  } else {
    updateSetting(SETTING_TRIGGERS);
  }
}

messaging.peerSocket.onmessage = function(evt) {
  let triggerAPI = new TriggerAPI();

  triggerAPI.fire(evt.data).then(function(status) {
    //console.log("status was " + status);
    sendClient({result: {trigger: evt.data, status: status}});
  }).catch(function (e) {
    console.log(e);
  });
}