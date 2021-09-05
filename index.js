const {app, BrowserWindow, ipcMain} = require('electron')
const pty = require("node-pty");
const os = require("os");
const path = require("path");
var shell = os.platform() === "win32" ? "powershell.exe" : "bash";

var width = 1440;
var height = 824;
var width_sidebar = 254;
var height_prop_terminal = 450;

let mainWindow;
let propulsion_speed;
let prop_terminal;
let video_window;
let sidebar;
function createMainWindow(){
    mainWindow = new BrowserWindow({
        height: height, 
        width: width - width_sidebar, 
        frame: false,
        x: width_sidebar, 
        y: 0,
        webPreferences: {
            devTools: true,
			contextIsolation: false,
      		enableRemoteModule: true,
            nodeIntegration: true
        }
    });
    mainWindow.loadURL(`file://${__dirname}/Frontend\ Files/landing_page/index.html`);
    mainWindow.on("closed", function() {
        mainWindow = null;
    });
}
function createSideBar(){
    sidebar = new BrowserWindow({
        height: height, 
        width: width_sidebar, 
        x: 0, 
        y: 0,
        frame: false,
        webPreferences: {
            devTools: true,
			contextIsolation: false,
      		enableRemoteModule: true,
            nodeIntegration: true
        }
    });
    sidebar.loadURL(`file://${__dirname}/Frontend\ Files/SideBar/index.html`);
    sidebar.on("closed", function() {
        sidebar = null;
    });
}

function create_propulsion_speed_window(){
    propulsion_speed = new BrowserWindow({
        height: height_prop_terminal, 
        width: (width - width_sidebar) / 2, 
        show: false,
        frame: false,
        x: width_sidebar,
        y: height_prop_terminal,
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
        height: height_prop_terminal, 
        width: (width - width_sidebar) / 2, 
        show: false,
        frame: false,
        x: width_sidebar + (width - width_sidebar) / 2,
        y: height_prop_terminal,
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
		height: height - height_prop_terminal, 
		width: (width - width_sidebar), 
        frame: false,
        x: width_sidebar,
        y: 0,
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
    createSideBar();
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

        if (sidebar == null)
            createSideBar()
        sidebar.show()
    });
});