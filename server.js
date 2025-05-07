import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 8080 });
let viewers = [];

wss.on('connection', (ws) => {
    console.log('New connection');

    ws.on('message', (message, isBinary) => {
        // Broadcast to all viewers
        viewers.forEach(viewer => {
            if (viewer.readyState === WebSocket.OPEN) {
                viewer.send(message, { binary: isBinary });
            }
        });
    });

    // Treat every new connection as viewer
    viewers.push(ws);

    ws.on('close', () => {
        viewers = viewers.filter(v => v !== ws);
    });
});
