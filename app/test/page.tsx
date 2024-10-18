'use client'
import React from 'react'

function page() {
    return (
        <div className="relative w-full max-w-lg">
        <img
          src="assets/sofa.jpeg" // Replace with your image path
          alt="Your Image"
          className="w-full h-auto"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full"></div>
      </div>
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
