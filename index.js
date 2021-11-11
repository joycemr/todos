const electron = require('electron');


const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    mainWindow.loadURL(`file://${__dirname}/main.html`);

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

function createAddWindow() {
    addWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        height: 200,
        width: 300,
        title: 'Add New ToDo',
        parent: mainWindow
    });
    addWindow.loadURL(`file://${__dirname}/add.html`);
    addWindow.on('closed', () => addWindow = null);
};

function clearTodos() {
    mainWindow.webContents.send('todo:clear');
};

ipcMain.on('todo:add', (event, todo) => {
    mainWindow.webContents.send('todo:add', todo);
    addWindow.close();
})

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Todo',
                click() { createAddWindow(); }
            },
            {
                label: 'Clear Todos',
                click() { clearTodos(); }
            }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            { label: 'Edit Todo' },
            { role: 'copy' },
            { role: 'paste' }
        ]
    }
];

if (process.platform === 'darwin') {
    menuTemplate.unshift({
        label: app.name,
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          { role: 'quit' }
        ]
    });
}

if (process.env.NODE_ENV !== 'production') {
    menuTemplate.push({
        label: 'Debug',
        submenu: [
            {
                role: 'reload'
            },
            {
                label: 'Toogle Developer Tools',
                accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });
}