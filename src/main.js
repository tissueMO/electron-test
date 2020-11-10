const { app, Menu, BrowserWindow, dialog } = require('electron');
let mainWindow = null;


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    // MacOS以外はすべてのウィンドウが閉じられた時点でアプリケーションを終了するお約束
    app.quit();
  }
});

app.on('ready', function () {
  // 初期画面のロード
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  // メニューバー
  const menu = Menu.buildFromTemplate([
    {
      label: 'メインメニュー',
      submenu: [
        {
          label: 'エラーアラート',
          click () {
            dialog.showErrorBox(
              'エラーメッセージ',
              'メッセージボックスに含めるメッセージがここに表示されます。',
            );
          },
        },
        {
          label: 'Yes/No/Cancel情報アラート',
          async click () {
            const { response } = await dialog.showMessageBox(
              mainWindow,
              {
                type: 'info',
                title: 'MessageBox',
                buttons: ['Yes', 'No', 'Cancel'],
                message: 'メッセージボックスのテストです。',
                detail: 'メッセージボックスに含める詳細メッセージがここに表示されています。',
              }
            );
            console.log(`Closed MessageBox by [${response}]`);
          },
        },
        {
          type: 'separator',
        },
        {
          label: '無効化されたアイテム',
          enabled: false,
        },
        {
          label: 'チェック可能なアイテム',
          type: 'checkbox',
          checked: true,
        },
      ],
    },
    {
      label: '開発者ツール',
      click () {
        mainWindow.webContents.openDevTools();
      },
    }
  ]);
  Menu.setApplicationMenu(menu);
});
