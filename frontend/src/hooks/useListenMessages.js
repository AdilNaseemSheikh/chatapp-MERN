import { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

function useSendMessage() {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext()

    const send = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({}),
                credentials: "include",
            })

            const data = await res.json()
            if (data.status !== 'success') {
                throw new Error(data.message || 'Something went wrong')
            }
            localStorage.removeItem('chat-user');
            setAuthUser(null)
        } catch (error) {
            toast.error()
        } finally {
            setLoading(false)
        }
    }

    return { loading, send }
}

export default useSendMessage;
