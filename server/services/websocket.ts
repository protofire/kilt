import { Server } from 'http';
import { WebSocket } from "ws";

let connection: WebSocket;

const websocket = () => {
  const init = (server: Server) => {
    const websocketServer = new WebSocket.Server({
      noServer: true,
      path: "/websockets"
    });

    server.on("upgrade", (request, socket, head) => {
      websocketServer.handleUpgrade(request, socket, head, (websocket) => {
        websocketServer.emit("connection", websocket, request);
      });
    });

    websocketServer.on(
      "connection",
      (websocketConnection) => {
        console.log(`[server]: WebSocket Server connected`);
        connection = websocketConnection.on("message", (message) => {
          const parsedMessage = JSON.parse(message.toString());
          console.log(parsedMessage);
        });
      }
    );
  }

 return { init, connection }
}

export { websocket };