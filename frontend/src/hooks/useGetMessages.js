import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import useConversation from '../zustand/useConversations';

function useGetMessages() {
    const [loading, setLoading] = useState(false);

    const { selectedConversation, messages, setMessages } = useConversation(state => state);

    useEffect(() => {
        const getMessages = async () => {
            try {
                setLoading(true)
                const res = await fetch(`http://localhost:8000/api/messages/${selectedConversation._id}`, {
                    method: 'GET',
                    credentials: "include"
                })

                const data = await res.json()
                if (data.status !== 'success') {
                    throw new Error(data.message || 'Something went wrong')
                }
                setMessages(data.messages)
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }

        if (selectedConversation?._id) getMessages()
    }, [selectedConversation?._id, setMessages])

    return { loading, messages }
}

export default useGetMessages;
