import { TRIGGER_COUNT, SETTING_TRIGGERS } from "../common/globals.js";
import document from "document";
import * as messaging from "messaging";

export function TriggerUI() {
  this.triggerList = document.getElementById("triggerList");
  this.statusText = document.getElementById("status");
  this.triggers = [];

  this.tiles = [];
  for (let i = 0; i < TRIGGER_COUNT; i++) {
    let tile = document.getElementById(`trigger-${i}`);
    if (tile) {
      tile.onclick = function(e) {
        tile.getElementById("result").text = "sending...";
        messaging.peerSocket.send(tile.getElementById("trigger-title").text);
      }
      this.tiles.push(tile);
    }
  }
}

TriggerUI.prototype.updateTriggers = function(triggers) {
  this.triggers = triggers;
}

TriggerUI.prototype.updateUI = function(state, data) {
  if (state === "loaded") {
    this.triggerList.style.display = "inline";
    this.statusText.text = "";
    let result = undefined;
    if (data) {
      result = data["result"] || undefined;
    }
    this.updateTriggerList(result);
  } else {
    this.triggerList.style.display = "none";
    this.statusText.text = data || state;
  }
}

TriggerUI.prototype.updateTriggerList = function(result) {
  for (let i = 0; i < TRIGGER_COUNT; i++) {
    let tile = this.tiles[i];
    if (!tile) {
      continue;
    }

    if (!this.triggers[i]) {
      tile.style.display = "none";
      continue;
    }

    tile.style.display = "inline";
    tile.getElementById("trigger-title").text = this.triggers[i];
    
    if (result && result["trigger"] === this.triggers[i]) {
      if (result["status"] == 200) {
        tile.getElementById("result").text = new Date().toLocaleString();
      } else if (result["status"] == 401) {
        tile.getElementById("result").text = "Error 401. Check key!"
      } else {
        tile.getElementById("result").text = "Error " + result["status"];
      }
    } else {
      tile.getElementById("result").text = "";
    }
  }
}