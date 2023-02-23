import { utilityProcess, ipcMain } from "electron";
import { fork } from "child_process";

const tcpProcess = utilityProcess.fork("./src-electron/tcpClient/client.js");
// const tcpProcess = fork("./src-electron/tcpClient/client.js")

const INIT_CLIENT = "INIT_CLIENT";
const SEND_DATA = "SEND_DATA";

class TcpClientHandler {
  constructor(mainWindow) {
    this.mainWindow = mainWindow;

    tcpProcess.on("message", (res) => {
      this.mainWindow.webContents.send("server", res);
    });

    process.on("exit", () => {
      tcpProcess.kill("SIGINT");
      process.exit(0);
    });
  }

  setupClient(addr, port) {
    tcpProcess.postMessage({ type: INIT_CLIENT, payload: { addr, port } });
  }

  sendData(data) {
    tcpProcess.postMessage({ type: SEND_DATA, payload: data });
  }
}

export default TcpClientHandler;
