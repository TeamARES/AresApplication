const ipc = require('electron').ipcRenderer
let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let prop_button1 = document.querySelector('#button_prop1')
let prop_button2 = document.querySelector('#button_prop2')
let prop_button3 = document.querySelector('#button_prop3')
let home_button1 = document.querySelector('#home_button1')
let home_button2 = document.querySelector('#home_button2')
let arm_button1 = document.querySelector('#arm_button1')
let arm_button2 = document.querySelector('#arm_button2')
let arm_button3 = document.querySelector('#arm_button3')


prop_button1.addEventListener('click', function() {
    ipc.send('open-propulsion')
});

prop_button2.addEventListener('click', function() {
  ipc.send('open-propulsion')
});

prop_button3.addEventListener('click', function() {
  ipc.send('open-propulsion')
});

home_button1.addEventListener('click', function() {
  ipc.send('return_main')
});

home_button2.addEventListener('click', function() {
  ipc.send('return_main')
});

arm_button1.addEventListener('click', function() {
  ipc.send('open-arm')
});

arm_button2.addEventListener('click', function() {
  ipc.send('open-arm')
});

arm_button3.addEventListener('click', function() {
  ipc.send('open-arm')
});

closeBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("open");
  menuBtnChange();//calling the function(optional)
});
