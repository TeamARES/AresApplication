const ipc = require('electron').ipcRenderer
button = document.getElementById('button')
button.addEventListener('click', function() {
    ipc.send('open-propulsion')
})