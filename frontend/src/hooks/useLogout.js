import { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

function useLogout() {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext()

    const logout = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/auth/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },

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

    return { loading, logout }
}

export default useLogout;
