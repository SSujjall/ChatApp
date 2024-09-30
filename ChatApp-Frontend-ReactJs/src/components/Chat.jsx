/* eslint-disable react/prop-types */
import { Button } from "react-bootstrap";
import { MessageContainer } from "./MessageContainer";
import { SendMessageForm } from "./SendMessageForm";
import { ConnectedUsers } from "./ConnectedUsers";

export const Chat = ({
  messages,
  sendMessage,
  closeConnection,
  users,
  currentUser,
}) => {
  return (
    <div className="flex flex-row border overflow-hidden rounded-xl shadow-xl min-h-[360px]">
      <div className="pl-2 pb-2 border-r-2  p-2 flex flex-col min-w-[200px] max-w-[200px] bg-gradient-to-tr from-zinc-200 to-slate-100">
        <ConnectedUsers users={users} />

        <Button variant="danger" className="mt-2" onClick={closeConnection}>
          {" "}
          Leave Room{" "}
        </Button>
      </div>

      <div className="w-full flex items-end bg-slate-50">
        <div className="chat w-full p-2">
          <MessageContainer messages={messages} currentUser={currentUser} />
          <SendMessageForm sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
};
