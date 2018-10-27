import { settingsStorage } from "settings";
import { SETTING_IFTTTKEY } from "../common/globals.js";

export function TriggerAPI(apiKey) {
  this.ikey = JSON.parse(settingsStorage.getItem(SETTING_IFTTTKEY))["name"];
  //this.debug = "";
}

TriggerAPI.prototype.fire = function(trigger) {
  let self = this;
  return new Promise(function(resolve, reject) {
    let url = "https://maker.ifttt.com/trigger/";
    url += trigger;
    url += "/with/key/"
    url += self.ikey;
    //console.log(url);
    //self.debug = url;
    fetch(url).then(response => response.status)
              .then(status => resolve(status))
              .catch(error => reject(error));
  });
}
