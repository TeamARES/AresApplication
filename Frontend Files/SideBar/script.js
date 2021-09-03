const ipc = require('electron').ipcRenderer
let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let prop_button1 = document.querySelector('#button_prop1')
let prop_button2 = document.querySelector('#button_prop2')
let home_button1 = document.querySelector('#home_button1')
let home_button2 = document.querySelector('#home_button2')

prop_button1.addEventListener('click', function() {
    ipc.send('open-propulsion')
});

prop_button2.addEventListener('click', function() {
  ipc.send('open-propulsion')
});

home_button1.addEventListener('click', function() {
  ipc.send('return_main')
});

home_button2.addEventListener('click', function() {
  ipc.send('return_main')
});


closeBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("open");
  menuBtnChange();//calling the function(optional)
});

// following are the code to change sidebar button(optional)
function menuBtnChange() {
 if(sidebar.classList.contains("open")){
   closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
 }else {
   closeBtn.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
 }
}
