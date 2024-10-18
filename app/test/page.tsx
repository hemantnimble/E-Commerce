'use client'
import React from 'react'

function page() {
    return (
        <section className='w-full flex gap-3 justify-center flex-wrap'>
            <div className='w-48 relative mb-10'>
                <div className=''>
                    <img className='rounded-t-lg' src="https://img.freepik.com/premium-photo/elegant-furniture-chair-design-stylish-room-setting-modern-interior-inspiration_947814-117101.jpg?w=740" alt="" />
                </div>
                <div className='flex justify-between px-2 py-2 bg-[#195c6d] rounded-lg absolute -bottom-[42px] w-48 text-white items-center'>
                    <span className='text-xs font-extralight'>
                        <h5>Product name</h5>
                        <p>$12122</p>
                    </span>
                    <button className='h-7 w-7 bg-white rounded-full p-[6px]'><svg xmlns="http://www.w3.org/2000/svg" className="text-black w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default page

































// import React, { useState } from 'react';

// export default function ContactForm() {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [message, setMessage] = useState('');

//     const sendToWhatsApp = (e: React.FormEvent) => {
//         e.preventDefault();

//         const phoneNumber = '+918999130727'; // Replace with your phone number

//         // Create the message to send
//         const text = `Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;

//         // WhatsApp URL with pre-filled message
//         const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${text}`;

//         // Open WhatsApp with the message
//         window.open(whatsappURL, '_blank');
//     };

//     return (
//         <form onSubmit={sendToWhatsApp}>
//             <div>
//                 <label>Name:</label>
//                 <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                 />
//             </div>
//             <div>
//                 <label>Email:</label>
//                 <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//             </div>
//             <div>
//                 <label>Message:</label>
//                 <textarea
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     required
//                 />
//             </div>
//             <button type="submit">Send to WhatsApp</button>
//         </form>
//     );
// }
