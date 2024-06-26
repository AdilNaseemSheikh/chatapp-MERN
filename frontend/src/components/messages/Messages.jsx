import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeleton/MessageSkeleton";
import Message from "./Message";

const Messages = () => {
  const { loading, messages } = useGetMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {loading && [1, 2, 3].map((el) => <MessageSkeleton key={el} />)}

      {!loading &&
        messages?.length > 0 &&
        messages.map((msg) => (
          <div key={msg._id} ref={lastMessageRef}>
            <Message msg={msg} />
          </div>
        ))}

      {!loading && !messages?.length && (
        <p className="text-center">Send a Message to start conversation</p>
      )}
    </div>
  );
};
export default Messages;
