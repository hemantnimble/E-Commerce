'use client'
import {  useSession } from 'next-auth/react';
import axios from 'axios';

const fetchUserData = async () => {
    const session = await useSession();
    async function handleApi() {

        if (session) {
            try {
                const response = await axios.post('/api/cart/add', {
                    user: session.data?.user?.id, // Pass the session user data
                });

                console.log('Server response:', response.data);
            } catch (error) {
                console.error('Error sending session data:', error);
            }
        }
    }
    return (
        <>
            <button onClick={handleApi}>kjkjk</button>
        </>
    );
};


export default fetchUserData;