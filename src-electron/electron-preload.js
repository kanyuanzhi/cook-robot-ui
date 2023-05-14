/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 */

import { contextBridge, ipcRenderer } from "electron";
import { BrowserWindow } from "@electron/remote";

// contextBridge.exposeInMainWorld("ipcRenderer", {
//   send: ipcRenderer.send,
//   invoke: ipcRenderer.invoke,
//   server: (callback) => ipcRenderer.on("server", callback),
// });

contextBridge.exposeInMainWorld("myWindowAPI", {
  minimize() {
    BrowserWindow.getFocusedWindow()
      .minimize();
  },

  isFullscreen() {
    const win = BrowserWindow.getFocusedWindow();
    return win.isFullScreen()
  },

  toggle() {
    const win = BrowserWindow.getFocusedWindow();
    const isFullscreen = win.isFullScreen();
    win.setFullScreen(!isFullscreen);
  },

  close() {
    BrowserWindow.getFocusedWindow()
      .close();
  }
});
