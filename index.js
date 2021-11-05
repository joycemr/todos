const electron = require('electron');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/main.html`);

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            { label: 'New Todo' }
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