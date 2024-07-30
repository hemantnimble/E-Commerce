'use client'
import {  useSession } from 'next-auth/react';
import axios from 'axios';

const fetchUserData =  () => {
    const session =  useSession();
    async function handleApi() {

        if (session) {
            try {
                const response =  axios.get('/api/cart/get');

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