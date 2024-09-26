import { useState, FormEvent } from "react";

interface WaitingRoomProps {
  joinChatRoom: (data: { username: string; chatroom: string }) => void;
}

const WaitingRoom: React.FC<WaitingRoomProps> = ({ joinChatRoom }) => {
  const [username, setUsername] = useState<string>("");
  const [chatroom, setChatroom] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (username && chatroom) {
      joinChatRoom({ username, chatroom });
    } else {
      alert("Please enter both a username and a chatroom.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Join a Chat Room
        </h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="chatroom"
          >
            Chat Room
          </label>
          <input
            type="text"
            id="chatroom"
            value={chatroom}
            onChange={(e) => setChatroom(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter the chatroom name"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Join Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default WaitingRoom;
