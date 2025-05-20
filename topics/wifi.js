// 1. run "npm i node-wifi" command

const wifi = require("node-wifi");

wifi.init({
  iface: null
});

wifi.scan((error, networks) => {
  if (error) {
    console.log(error);
  } else {
    console.log(networks);
  }
});