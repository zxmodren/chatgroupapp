const { app, BrowserWindow, ipcMain, Notification, Menu, Tray } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');
const isDev = !app.isPackaged;

const dockIcon = path.join(__dirname, 'assets', 'img', 'chat_logo.png');
const trayIcon = path.join(__dirname, 'assets', 'img', 'chat_tray_icon.png');

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
            }, 2000)
        });
        autoUpdater.checkForUpdatesAndNotify();

        autoUpdater.on('update-available', () => {
            new Notification({ title: 'Update Available', body: 'A new version of the app is available.' }).show();
        });

        autoUpdater.on('update-downloaded', () => {
            new Notification({ title: 'Update Downloaded', body: 'The update has been downloaded. Restart the app to apply the update.' }).show();
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