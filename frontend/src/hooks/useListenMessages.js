import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/useConversations';
import notification from '../assets/sounds/notification.mp3'

function useListenMessages() {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation(state => state)

    useEffect(() => {
        socket?.on('newMessage', (newMessage) => {
            newMessage.shouldShake = true;
            const sound = new Audio(notification);
            sound.play();
            setMessages([...messages, newMessage])
        })

        return () => {
            socket.off('newMessage')
        }
    }, [setMessages, messages, socket])
}

export default useListenMessages;
