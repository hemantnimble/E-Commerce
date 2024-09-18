"use client"

import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import GoogleSignin from './GoogleSignin';
import { UserIcon, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import ResetPassword from './ResetPass';

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const loginwithc = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address.");
            setLoading(false);
            return;
        }

        const login = await signIn("credentials", {
            email,
            password,
            name,
            redirect: false
        });

        if (login?.error === null) {
            toast.success("Logged in successfully");
            router.replace("/");
        } else if (login?.error) {
            toast.error("Invalid Credentials");
        }

        setLoading(false);
    }

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };
   
    return (
        <>
            <Toaster />
            <form className="signin-form">
                <div className="flex-column">
                    <label>Name </label>
                    <div className="inputForm">
                        <UserIcon />
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={loading}
                            required
                            type="text"
                            className="input"
                            placeholder="Enter your name"
                        />
                    </div>
                </div>
                <div className="flex-column">
                    <label>Email </label>
                    <div className="inputForm">
                        <svg height={20} viewBox="0 0 32 32" width={20} xmlns="http://www.w3.org/2000/svg"><g id="Layer_3" data-name="Layer 3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" /></g></svg>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            required
                            autoComplete="email"
                            type="email"
                            className="input"
                            placeholder="Enter your Email"
                        />
                    </div>
                </div>
                <div className="flex-column">
                    <label>Password </label>
                    <div className="inputForm">
                        <svg height={20} viewBox="-64 0 512 512" width={20} xmlns="http://www.w3.org/2000/svg"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" /><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" /></svg>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            type={showPassword ? "text" : "password"}
                            required
                            autoComplete="current-password"
                            className="input"
                            placeholder="Enter your Password"
                        />
                        {showPassword ? (
                            <Eye className='mr-3' onClick={togglePasswordVisibility} />
                        ) : (
                            <EyeOff className='mr-3' onClick={togglePasswordVisibility} />
                        )}
                    </div>
                </div>
                <div className="flex-row">
                    <ResetPassword email={email}></ResetPassword>
                </div>
                <button onClick={loginwithc} className="button-submit">Sign In</button>
                <p className="p line">Or With</p>
            </form>
            <GoogleSignin />

        </>
    );
}
