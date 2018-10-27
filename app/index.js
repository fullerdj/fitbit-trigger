import * as messaging from "messaging";
import { TriggerUI } from "./ui.js";
import { SETTING_TRIGGERS, SETTING_IFTTTKEY } from "../common/globals.js";

let ui = new TriggerUI();

ui.updateUI("loaded");

messaging.peerSocket.onopen = function() {
}

messaging.peerSocket.onmessage = function(evt) {
  if (evt.data && evt.data["key"] == "error") {
    ui.updateUI("error", evt.data["value"]);
    return;
  }
  
  if (evt.data && evt.data["key"] == SETTING_TRIGGERS) {
      ui.updateTriggers(evt.data["value"]);
  }
  ui.updateUI("loaded", evt.data);
}

messaging.peerSocket.onerror = function(err) {
  ui.updateUI("error");
}
