import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Lobby from "./components/Lobby";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useState } from "react";
import { Chat } from "./components/Chat";

function App() {
  const [connection, setConnecton] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const joinRoom = async (Username, ChatRoom) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7245/chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      connection.on("ReceiveMessage", (user, message) => {
        setMessages((messages) => [...messages, { user, message }]);
      });

      connection.onclose(() => {
        setConnecton();
        setMessages([]);
        setUsers([]);
      });

      await connection.start();
      await connection.invoke("JoinRoom", { Username, ChatRoom });
      setConnecton(connection);
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  };

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center text-center">
      <div className="w-5/12 min-w-[200px] max-w-[400px]">
        <h2 className="text-6xl font-bold">Chat Room</h2>
        <hr className="mt-3 mb-3" />
        {!connection ? (
          <Lobby joinRoom={joinRoom} />
        ) : (
          <Chat
            messages={messages}
            sendMessage={sendMessage}
            closeConnection={closeConnection}
            users={users}
          />
        )}
      </div>
    </div>
  );
}

export default App;
