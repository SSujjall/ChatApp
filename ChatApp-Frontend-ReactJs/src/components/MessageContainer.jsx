import { useEffect, useRef } from "react";

/* eslint-disable react/prop-types */
export const MessageContainer = ({ messages, currentUser }) => {
  const messageRef = useRef();

  useEffect(() => {
    if (messageRef && messageRef.current) {
      const { scrollHeight, clientHeight } = messageRef.current;

      messageRef.current.scrollTo({
        left: 0,
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div ref={messageRef} className="max-h-[300px] overflow-auto">
      {messages.map((m, index) => (
        <div
          key={index}
          className={`mb-1 flex flex-col ${
            m.user === currentUser ? "items-end" : "items-start"
          }`}
        >
          <div>
            <div
              className={`inline-block border rounded-2xl px-2 py-1 ${
                m.user === currentUser
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {m.message}
            </div>
          </div>

          <div className="text-xs text-gray-400 -mt-1 pl-1">
            <i>from {m.user}</i>
          </div>
        </div>
      ))}
    </div>
  );
};
