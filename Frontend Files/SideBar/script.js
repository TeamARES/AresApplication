const ipc = require('electron').ipcRenderer
let home_button = document.querySelector('#home_button')
let prop_button = document.querySelector('#button_prop')
let arm_button = document.querySelector('#arm_button')
let science_button = document.querySelector('#science_button')
let sensor_button = document.querySelector('#sensor_button')
let control_button = document.querySelector('#control_button')

home_button.addEventListener('click', function() {
  ipc.send('return_main')
  home_button.style.background = "#019E66"
  prop_button.style.background = "rgba(22, 22, 22, 1)"
  arm_button.style.background = "rgba(22, 22, 22, 1)"
  science_button.style.background = "rgba(22, 22, 22, 1)"
  control_button.style.background = "rgba(22, 22, 22, 1)"
  sensor_button.style.background = "rgba(22, 22, 22, 1)"
});

prop_button.addEventListener('click', function() {
  ipc.send('open-propulsion')
  prop_button.style.background = "#019E66"
  home_button.style.background = "rgba(22, 22, 22, 1)"
  arm_button.style.background = "rgba(22, 22, 22, 1)"
  science_button.style.background = "rgba(22, 22, 22, 1)"
  control_button.style.background = "rgba(22, 22, 22, 1)"
  sensor_button.style.background = "rgba(22, 22, 22, 1)"
});

arm_button.addEventListener('click', function() {
  ipc.send('open-arm')
  arm_button.style.background = "#019E66"
  prop_button.style.background = "rgba(22, 22, 22, 1)"
  home_button.style.background = "rgba(22, 22, 22, 1)"
  science_button.style.background = "rgba(22, 22, 22, 1)"
  control_button.style.background = "rgba(22, 22, 22, 1)"
  sensor_button.style.background = "rgba(22, 22, 22, 1)"
});

science_button.addEventListener('click', function() {
  ipc.send('open-science')
  science_button.style.background = "#019E66"
  prop_button.style.background = "rgba(22, 22, 22, 1)"
  home_button.style.background = "rgba(22, 22, 22, 1)"
  arm_button.style.background = "rgba(22, 22, 22, 1)"
  control_button.style.background = "rgba(22, 22, 22, 1)"
  sensor_button.style.background = "rgba(22, 22, 22, 1)"
});

sensor_button.addEventListener('click', function() {
  ipc.send('open-sensor')
  sensor_button.style.background = "#019E66"
  prop_button.style.background = "rgba(22, 22, 22, 1)"
  home_button.style.background = "rgba(22, 22, 22, 1)"
  arm_button.style.background = "rgba(22, 22, 22, 1)"
  control_button.style.background = "rgba(22, 22, 22, 1)"
  science_button.style.background = "rgba(22, 22, 22, 1)"
});
control_button.addEventListener('click', function() {
  ipc.send('open-control')
  control_button.style.background = "#019E66"
  prop_button.style.background = "rgba(22, 22, 22, 1)"
  home_button.style.background = "rgba(22, 22, 22, 1)"
  arm_button.style.background = "rgba(22, 22, 22, 1)"
  sensor_button.style.background = "rgba(22, 22, 22, 1)"
  science_button.style.background = "rgba(22, 22, 22, 1)"
});
