import { Form, FormControl, InputGroup, Button } from "react-bootstrap";
import { useState } from "react";

/* eslint-disable react/prop-types */
export const SendMessageForm = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage("");
      }}
    >
      <InputGroup>
        <FormControl
          placeholder="message..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <Button variant="primary" type="submit" disabled={!message}>
          Send
        </Button>
      </InputGroup>
    </Form>
  );
};
