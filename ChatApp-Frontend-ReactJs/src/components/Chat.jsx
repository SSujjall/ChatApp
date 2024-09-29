/* eslint-disable react/prop-types */
import { Button } from "react-bootstrap";
import { MessageContainer } from "./MessageContainer";
import { SendMessageForm } from "./SendMessageForm";
import { ConnectedUsers } from "./ConnectedUsers";

export const Chat = ({ messages, sendMessage, closeConnection, users }) => {
  return (
    <>
      <div className="leave-room">
        <Button variant="danger" onClick={closeConnection}>
          {" "}
          Leave Room{" "}
        </Button>
      </div>

      <ConnectedUsers users={users} />

      <div className="chat">
        <MessageContainer messages={messages} />
        <SendMessageForm sendMessage={sendMessage} />
      </div>
    </>
  );
};
