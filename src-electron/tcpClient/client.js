// import {ipcMain} from "electron";

const net = require("net")


class TCPClient {
  constructor() {
    this.client = null
    this.addr = ""
    this.port = 9999
    this.status = 0 // 0未连接，1连接中，2已连接
  }

  init(addr, port) {
    this.addr = addr
    this.port = port
    const connTimer = setInterval(() => {
      this.client = net.connect({host: this.addr, port: this.port}, () => {
        clearInterval(connTimer)
        this.status = 2
        console.log("connect to TCP server successfully")
        this.client.write("123123213")
      }).on("error", err => {
        this.status = 1
        console.log("connecting......")
      }).on('data', (chunck) => {
        try {
          console.log(chunck)
          // this.onReceiveData(chunck);
          process.parentPort.postMessage(chunck)
        } catch (e) {
          console.log('onDataError', e.message); // eslint-disable-line no-console
        }
      })
    }, 1000)
  }

  send(data) {
    if (this.status === 0) {
      this.init();
    }

    if (this.status === 1){
      console.log("please send later, client is connecting......")
      return
    }

    if (this.status === 2 && data && data.length > 0) {
      this.client.write(data);
    }
  }
}

const tcpClient = new TCPClient()

process.parentPort.on("message", (e) => {
  // process.parentPort.postMessage("213wwrwerew")
  const msg = e.data
  try {
    switch (msg.type) {
      case "INIT_CLIENT": {
        tcpClient.init(msg.payload.addr, msg.payload.port)
        break
      }
      case "SEND_DATA": {
        tcpClient.send(msg.payload);
        break;
      }
    }
  } catch (e) {
    console.log(e)
  }
})

// export default tcpClient
