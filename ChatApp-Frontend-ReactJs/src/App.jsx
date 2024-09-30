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
  const [currentUser, setCurrentUser] = useState("");

  const joinRoom = async (Username, ChatRoom) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7245/chat", {withCredentials: false})
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
      setCurrentUser(Username);
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
    <div className="flex h-screen items-center justify-center">
      <div className="w-11/12 min-w-[500px] max-w-[900px]">
        <img src="/Logo.png" className="h-20 mx-auto" />
        <hr className="mt-3 mb-3 w-6/12 mx-auto min-w-[200px] max-w-[400px]" />
        {!connection ? (
          <Lobby joinRoom={joinRoom} />
        ) : (
          <Chat
            messages={messages}
            sendMessage={sendMessage}
            closeConnection={closeConnection}
            users={users}
            currentUser={currentUser}
          />
        )}
      </div>
    </div>
  );
}

export default App;
