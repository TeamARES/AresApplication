const { app, BrowserWindow, ipcMain, screen } = require('electron')
const pty = require("node-pty");
const os = require("os");
const path = require("path");
var shell = os.platform() === "win32" ? "powershell.exe" : "bash";

try {
    require('electron-reloader')(module)
} catch (_) {

}


var width, height, width_sidebar, height_terminal, width_video;
let mainWindow;
let propulsion_speed;
let prop_terminal;
let video_window;
let sidebar;
let arm_speed;
let arm_terminal;
let science_motors
let video_window_science
let control
let sensor
let dummy_window


function createDummyWindow() {
    dummy_window = new BrowserWindow({
        frame: true,
        webPreferences: {
            devTools: true,
            contextIsolation: false,
            enableRemoteModule: true,
            nodeIntegration: true
        }
    });
    dummy_window.loadURL(`file://${__dirname}/dummy.html`);
    dummy_window.on("closed", function () {
        dummy_window = null;
    });
}

function createMainWindow() {
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
    mainWindow.on("closed", function () {
        mainWindow = null;
    });
}
function createSideBar() {
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
    sidebar.on("closed", function () {
        sidebar = null;
    });
}

function create_propulsion_speed_window() {
    propulsion_speed = new BrowserWindow({
        height: height - height_terminal,
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
    propulsion_speed.on("closed", function () {
        propulsion_speed = null;
    });
}
function create_Terminal_propulsion() {
    prop_terminal = new BrowserWindow({
        height: height_terminal,
        width: (width - width_sidebar) - width_video,
        show: false,
        frame: false,
        x: width_sidebar + width_video,
        y: height - height_terminal + 25,
        webPreferences: {
            contextIsolation: false,
            enableRemoteModule: true,
            nodeIntegration: true
        }
    });

    prop_terminal.loadURL(`file://${__dirname}/propulsion_terminal.html`);
    prop_terminal.on("closed", function () {
        prop_terminal = null;
    });

    var ptyProcess = pty.spawn(shell, [], {
        name: "xterm-color",
        cols: 80,
        rows: 30,
        cwd: process.env.HOME,
        env: process.env
    });

    ptyProcess.on('data', function (data) {
        prop_terminal.webContents.send("terminal.incomingData", data);
    });
    ptyProcess.write("python3 propulsion.py");
    ipcMain.on("terminal.keystroke", (event, key) => {
        ptyProcess.write(key);
    });
}
function createVideoWindow() {
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
    video_window.on("closed", function () {
        video_window = null;
    });
}

function create_Terminal_arm() {
    arm_terminal = new BrowserWindow({
        height: height_terminal,
        width: (width - width_sidebar) - width_video,
        show: false,
        frame: false,
        x: width_sidebar + width_video,
        y: height - height_terminal + 25,
        webPreferences: {
            contextIsolation: false,
            enableRemoteModule: true,
            nodeIntegration: true
        }
    });

    arm_terminal.loadURL(`file://${__dirname}/arm_terminal.html`);
    arm_terminal.on("closed", function () {
        arm_terminal = null;
    });

    var ptyProcess = pty.spawn(shell, [], {
        name: "xterm-color",
        cols: 80,
        rows: 30,
        cwd: process.env.HOME,
        env: process.env
    });

    ptyProcess.on('data', function (data) {
        arm_terminal.webContents.send("terminal.incomingData", data);
    });
    ptyProcess.write("python3 /Users/harshgupta/Desktop/Ares/Application/arm.py");
    ipcMain.on("terminal.keystroke", (event, key) => {
        ptyProcess.write(key);
    });
}

function create_arm_speed_window() {
    arm_speed = new BrowserWindow({
        height: height - height_terminal,
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
    arm_speed.on("closed", function () {
        arm_speed = null;
    });
}

function create_science_motor_window() {
    science_motors = new BrowserWindow({
        height: height,
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
    science_motors.loadURL(`file://${__dirname}/Frontend\ Files/science_motors/index.html`);
    science_motors.on("closed", function () {
        science_motors = null;
    });
}

function createVideoWindow_science() {
    video_window_science = new BrowserWindow({
        height: height,
        width: width_video,
        frame: false,
        x: width_sidebar,
        y: 0,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    video_window_science.loadURL(`file://${__dirname}/Frontend\ Files/video_stream_science/index.html`);
    video_window_science.on("closed", function () {
        video_window_science = null;
    });
}

function create_control_window() {
    control = new BrowserWindow({
        height: height,
        width: width - width_sidebar,
        frame: false,
        x: width_sidebar,
        y: 0,
        show: false,
        webPreferences: {
            contextIsolation: false,
            enableRemoteModule: true,
            nodeIntegration: true
        }
    });
    control.loadURL(`file://${__dirname}/Frontend\ Files/Control/index.html`);
    control.on("closed", function () {
        control = null;
    });
};

function create_sensor_window() {
    sensor = new BrowserWindow({
        height: height,
        width: width - width_sidebar,
        frame: false,
        x: width_sidebar,
        y: 0,
        webPreferences: {
            contextIsolation: false,
            enableRemoteModule: true,
            nodeIntegration: true
        }
    });
    sensor.loadURL(`file://${__dirname}/Frontend\ Files/Sensors/index.html`);
    sensor.on("closed", function () {
        sensor = null;
    });
}

app.on("ready", function () {
    createDummyWindow()
    dummy_window.maximize();
    width = screen.getPrimaryDisplay().workAreaSize.width;
    height = screen.getPrimaryDisplay().workAreaSize.height;
    width_sidebar = parseInt((17 * width) / 100);
    height_terminal = parseInt((34 * height) / 100);
    width_video = parseInt((50 * width) / 100);
    console.log("width: " + width + " height: " + height + " width_sidebar: " + width_sidebar + " height_terminal: " + height_terminal + " width_video: " + width_video);
    createMainWindow();
    createSideBar();
    dummy_window.close();
    sidebar.setAlwaysOnTop(true);
    ipcMain.on('open-propulsion', function () {

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

    ipcMain.on('return_main', function () {
        if (mainWindow == null)
            createMainWindow();
        mainWindow.show()

        if (sidebar == null)
            createSideBar()
        sidebar.show()
    });

    ipcMain.on('open-arm', function () {

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

    ipcMain.on('open-science', function () {
        if (science_motors == null)
            create_science_motor_window();
        science_motors.show();

        if (video_window_science == null)
            createVideoWindow_science()
        video_window_science.show();
    });

    ipcMain.on('open-control', function () {

        if (control == null)
            create_control_window()
        control.show();
    });

    ipcMain.on('open-sensor', function () {

        if (sensor == null)
            create_sensor_window()
        sensor.show();
    });
});