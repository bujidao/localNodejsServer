/*
 * @Author       : Alex Ceng
 * @Date         : 2021-03-06 21:52:07
 * @LastEditors  : Alex Ceng
 * @LastEditTime : 2021-03-06 22:52:28
 * @Description  : ws服务
 */
const WebSocket = require('ws');

function noop() {}

function heartbeat() {
  this.isAlive = true;
}

/**
 * 请打开根目录ws目录， 直接运行ws.html进行WebSocket测试
 * @route 请打开根目录ws目录， 直接运行ws.html进行WebSocket测试
 * @group WebSocket测试
 */
const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', function connection(ws) {
  ws.isAlive = true;
  ws.send(`Connct success, Heart Beat success`);
  ws.on('pong', heartbeat);
  ws.on('message', function incoming(message) {
    ws.send(`Wss Received: ${message}`);
  })
});

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping(noop);
  });
}, 3000);

wss.on('close', function close() {
  clearInterval(interval);
  console.log('duankau')
});