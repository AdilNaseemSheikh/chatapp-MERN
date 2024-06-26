import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversations";

function Message({ msg }) {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation((state) => state);
  const isMe = msg.senderId === authUser.user._id;
  const formattedTime = extractTime(msg.createdAt);

  return (
    <div className={`chat ${isMe ? "chat-start" : "chat-end"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={
              isMe ? authUser.user.profilePic : selectedConversation.profilePic
            }
          />
        </div>
      </div>
      <div
        className={`chat-bubble text-white pb-2 ${isMe ? "" : "bg-blue-500"}`}
      >
        {msg.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
}

export default Message;
