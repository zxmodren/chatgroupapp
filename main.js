const { app, BrowserWindow, ipcMain, Notification, Menu, Tray } = require('electron');
const path = require('path');
const { autoUpdater } = require("electron-updater");
const log = require('electron-log');
const isDev = !app.isPackaged;

const dockIcon = path.join(__dirname, 'assets', 'img', 'chat_logo.png');
const trayIcon = path.join(__dirname, 'assets', 'img', 'chat_tray_icon.png');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

function createSplashdWindow() {
    // Browser Window <- Renderer Process
    const win = new BrowserWindow({
        icon: dockIcon,
        width: 400,
        height: 200,
        backgroundColor: '#6e707e',
        frame: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: false,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
        }
    })

    win.loadFile('second.html')
    return win;
}

function createWindow() {
    const win = new BrowserWindow({
        icon: dockIcon,
        width: 1200,
        height: 800,
        show: false,
        webPreferences: {
            nodeIntegration: false,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadFile('index.html')
    isDev && win.webContents.openDevTools();
    return win;
}
if (isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })
}

// if (process.platform === 'win32') {
//     app.dock.setIcon(dockIcon);
// }

let tray = null;
app.whenReady()
.then(() => {
    const template = require('./src/js/utils/Menu').createTemplate(app);
    const menu = Menu.buildFromTemplate(template);
    const splash = createSplashdWindow();
    const mainApp = createWindow();

    Menu.setApplicationMenu(menu);
    tray = new Tray(trayIcon);
    tray.setContextMenu(menu);

    mainApp.once('ready-to-show', () => {
        // splash.destroy();
        // mainApp.show();
        
        setTimeout(() => {
            splash.destroy();
            mainApp.show();
            autoUpdater.checkForUpdates();
        }, 2000)
    });
});

ipcMain.on('notify', (_, message) => {
    new Notification({ title: 'Notification', body: message }).show();
})

app.on('window-all-closed', () => {
    app.quit()
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();

    }
})

autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (ev, info) => {
    sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (ev, info) => {
    sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (ev, err) => {
    sendStatusToWindow('Error in auto-updater.');
})
autoUpdater.on('download-progress', (ev, progressObj) => {
sendStatusToWindow('Download progress...');
})
autoUpdater.on('update-downloaded', (ev, info) => {
sendStatusToWindow('Update downloaded; will install in 5 seconds');
});

autoUpdater.on('update-downloaded', (ev, info) => {
    // Wait 5 seconds, then quit and install
    // In your application, you don't need to wait 5 seconds.
    // You could call autoUpdater.quitAndInstall(); immediately
    setTimeout(function() {
      autoUpdater.quitAndInstall();  
    }, 5000)
  })
  
