const {app, BrowserWindow, ipcMain} = require('electron')
const pty = require("node-pty");
const os = require("os");
const path = require("path");
var shell = os.platform() === "win32" ? "powershell.exe" : "bash";

let mainWindow;
let propulsion_speed;
let prop_terminal;
let video_window;
let combined_prop_window;
function createMainWindow(){
    mainWindow = new BrowserWindow({
        height: 450, 
        width: 800, 
        webPreferences: {
            devTools: true,
			contextIsolation: false,
      		enableRemoteModule: true,
            nodeIntegration: true
        }
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.on("closed", function() {
        mainWindow = null;
    });
}
function create_propulsion_speed_window(){
    propulsion_speed = new BrowserWindow({
        height: 600, 
        width: 1200, 
        show: false,
        webPreferences: {
			contextIsolation: false,
      		enableRemoteModule: true,
            nodeIntegration: true
        }
    });
    propulsion_speed.loadURL(`file://${__dirname}/propulsion_speed.html`);
    propulsion_speed.on("closed", function() {
        propulsion_speed = null;
    });
}
function create_Terminal_propulsion(){
    prop_terminal = new BrowserWindow({
        height: 600, 
        width: 800, 
        show: false,
        webPreferences: {
			contextIsolation: false,
      		enableRemoteModule: true,
            nodeIntegration: true
        }
    });
    
    prop_terminal.loadURL(`file://${__dirname}/propulsion_terminal.html`);
    prop_terminal.on("closed", function() {
        prop_terminal = null;
    });

    var ptyProcess = pty.spawn(shell, [], {
        name: "xterm-color",
        cols: 80,
        rows: 30,
        cwd: process.env.HOME,
        env: process.env
    });

    ptyProcess.on('data', function(data) {
        prop_terminal.webContents.send("terminal.incomingData", data);
    });
    ptyProcess.write("python3 /Users/harshgupta/Desktop/Ares/Application/propulsion.py");
    ipcMain.on("terminal.keystroke", (event, key) => {
        ptyProcess.write(key);
    });
}
function createVideoWindow(){
	video_window = new BrowserWindow({
		height: 400, 
		width: 2000, 
		webPreferences: {
			nodeIntegration: true
		}
	});
	video_window.loadURL("http://192.168.29.24:8000/");
	video_window.on("closed", function() {
		video_window = null;
	});
}

app.on("ready", function() {
    createMainWindow();
    ipcMain.on('open-propulsion', function(){
        if (propulsion_speed == null) 
            create_propulsion_speed_window();
        propulsion_speed.show();

       if (prop_terminal == null)
            create_Terminal_propulsion();
        prop_terminal.show();
        
        if (video_window == null)
            createVideoWindow()
        video_window.show();
    });
    
    ipcMain.on('return_main', function() {
        if (mainWindow == null)
            createMainWindow();
        mainWindow.show()
    });
});