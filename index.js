const electron = require('electron');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let addWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/main.html`);

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

function createAddWindow() {
    addWindow = new BrowserWindow({
        height: 200,
        width: 300,
        title: 'Add New ToDo',
        parent: mainWindow
    });
};

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Todo',
                click() { createAddWindow(); }
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