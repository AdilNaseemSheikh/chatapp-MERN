import { useState } from 'react'
import toast from 'react-hot-toast';
import useConversation from '../zustand/useConversations';

function useSendMessage() {
    const [loading, setLoading] = useState(false);
    const { selectedConversation, messages, setMessages } = useConversation(state => state);

    const send = async (message) => {
        try {
            setLoading(true)
            const res = await fetch(`http://localhost:8000/api/messages/send/${selectedConversation._id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message }),
                credentials: "include",
            })

            const data = await res.json()
            if (data.status !== 'success') {
                throw new Error(data.message || 'Something went wrong')
            }
            setMessages([...messages, data.message])

        } catch (error) {
            toast.error()
        } finally {
            setLoading(false)
        }
    }

    return { loading, send }
}

export default useSendMessage;
