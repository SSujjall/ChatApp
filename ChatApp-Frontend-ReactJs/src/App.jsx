import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Lobby from "./components/Lobby";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useState } from "react";

function App() {
  const [connection, setConnecton] = useState();
  const [messages, setMessages] = useState([]);

  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7245/chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (user, message) => {
        setMessages((messages) => [...messages, { user, message }]);
      });

      await connection.start();
      await connection.invoke("JoinRoom", { user, room });
      setConnecton(connection);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex h-screen items-center justify-center text-center">
      <div className="w-5/12">
        <h2 className="text-6xl font-bold">Chat Room</h2>
        <hr className="mt-3 mb-3" />
        <Lobby joinRoom={joinRoom} />
      </div>
    </div>
  );
}

export default App;
