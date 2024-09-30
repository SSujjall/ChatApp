/* eslint-disable react/prop-types */
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Lobby = ({ joinRoom }) => {
  const [user, setUser] = useState();
  const [room, setRoom] = useState();

  return (
    <Form
      className="lobby w-6/12 min-w-[200px] max-w-[400px] mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        joinRoom(user, room);
      }}
    >
      <Form.Group>
        <Form.Control
          placeholder="Name"
          onChange={(e) => setUser(e.target.value)}
          className="text-center"
        />

        <Form.Control
          placeholder="Room"
          onChange={(e) => setRoom(e.target.value)}
          className="text-center mt-2 mb-2"
        />
      </Form.Group>
      <Button
        className="w-100"
        variant="success"
        type="submit"
        disabled={!user || !room}
      >
        Join
      </Button>
    </Form>
  );
};

export default Lobby;
