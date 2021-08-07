const {app, BrowserWindow} = require('electron')

let win;
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

function createWindow() {
  win = new BrowserWindow({width: 1500, height: 900, backgroundColor: '#fff'})
  win.loadURL(`file://${__dirname}/dist/fap-electron/index.html`)
  win.webContents.openDevTools()
}

app.on('ready', createWindow)

// quitting the app when no windows are open on macOS
app.on('window-all-closed', function () {
  app.quit()
})

app.on('activate', function () {
  if (win === null)
    createWindow()
})

app.on('close', function () {
  win = null
})
