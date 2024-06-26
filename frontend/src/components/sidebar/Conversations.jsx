import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emoji";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {loading && <span className="loading loading-spinner"></span>}
      {!loading &&
        conversations.length &&
        conversations.map((con, idx) => (
          <Conversation
            key={con._id}
            conversation={con}
            emoji={getRandomEmoji()}
            lastIndex={idx === conversations.length - 1}
          />
        ))}
    </div>
  );
};

export default Conversations;
