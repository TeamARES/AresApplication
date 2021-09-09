const {app, BrowserWindow, ipcMain} = require('electron')
const pty = require("node-pty");
const os = require("os");
const path = require("path");
var shell = os.platform() === "win32" ? "powershell.exe" : "bash";

var width = 1440;
var height = 824;
var width_sidebar = 254;
var height_prop_terminal = 224;
var width_video = 700

let mainWindow;
let propulsion_speed;
let prop_terminal;
let video_window;
let sidebar;
let arm_speed;
let arm_terminal;

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
        height: height - height_prop_terminal, 
        width: (width - width_sidebar) - width_video, 
        show: false,
        frame: false,
        x: width_sidebar + width_video,
        y: 0,
        webPreferences: {
			contextIsolation: false,
      		enableRemoteModule: true,
            nodeIntegration: true
        }
    });
    propulsion_speed.loadURL(`file://${__dirname}/Frontend\ Files/speedometer/index.html`);
    propulsion_speed.on("closed", function() {
        propulsion_speed = null;
    });
}
function create_Terminal_propulsion(){
    prop_terminal = new BrowserWindow({
        height: height_prop_terminal, 
        width: (width - width_sidebar) - width_video, 
        show: false,
        frame: false,
        x: width_sidebar + width_video,
        y: height - height_prop_terminal + 25,
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
		height: height, 
		width: width_video, 
        frame: false,
        x: width_sidebar,
        y: 0,
		webPreferences: {
			nodeIntegration: true
		}
	});
	video_window.loadURL(`file://${__dirname}/Frontend\ Files/video_stream/index.html`);
	video_window.on("closed", function() {
		video_window = null;
	});
}

function create_Terminal_arm(){
    arm_terminal = new BrowserWindow({
        height: height_prop_terminal, 
        width: (width - width_sidebar) - width_video, 
        show: false,
        frame: false,
        x: width_sidebar + width_video,
        y: height - height_prop_terminal + 25,
        webPreferences: {
			contextIsolation: false,
      		enableRemoteModule: true,
            nodeIntegration: true
        }
    });
    
    arm_terminal.loadURL(`file://${__dirname}/arm_terminal.html`);
    arm_terminal.on("closed", function() {
        arm_terminal = null;
    });

    var ptyProcess = pty.spawn(shell, [], {
        name: "xterm-color",
        cols: 80,
        rows: 30,
        cwd: process.env.HOME,
        env: process.env
    });

    ptyProcess.on('data', function(data) {
        arm_terminal.webContents.send("terminal.incomingData", data);
    });
    ptyProcess.write("python3 /Users/harshgupta/Desktop/Ares/Application/arm.py");
    ipcMain.on("terminal.keystroke", (event, key) => {
        ptyProcess.write(key);
    });
}

function create_arm_speed_window(){
    arm_speed = new BrowserWindow({
        height: height - height_prop_terminal, 
        width: (width - width_sidebar) - width_video, 
        show: false,
        frame: false,
        x: width_sidebar + width_video,
        y: 0,
        webPreferences: {
			contextIsolation: false,
      		enableRemoteModule: true,
            nodeIntegration: true
        }
    });
    arm_speed.loadURL(`file://${__dirname}/Frontend\ Files/arm_motors/index.html`);
    arm_speed.on("closed", function() {
        arm_speed = null;
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

    ipcMain.on('open-arm', function(){

        if (arm_speed == null) 
            create_arm_speed_window();
        arm_speed.show();

        if (arm_terminal == null)
            create_Terminal_arm();
        arm_terminal.show();
        
        if (video_window == null)
            createVideoWindow()
        video_window.show();
    });
});