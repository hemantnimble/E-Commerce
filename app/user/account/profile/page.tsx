'use client'
import { useSession } from "next-auth/react";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import ResetPassword from "@/components/ResetPass";

export default function Profile() {
    const session = useSession();
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(e: any) {
        e.preventDefault();
        try {
            const response = await axios.post('/api/user/updatepassword', { oldPass, newPass });

        } catch (error) {
            console.error("Error updating password:", error);
            alert("Failed to update password. Please try again.");
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const handleSendOtp = async () => {
        try {
            const response = await axios.post('/api/user/sendotp');
            alert("OTP sent successfully")
        } catch {
            alert("Failed to send otp");
        }
    };

    return (
        <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
            <Link className="flex gap-1 items-center mt-5 hover:gap-2 transition-all text-gray-600" href='/user/account'>
                <ArrowLeftCircle></ArrowLeftCircle>
                <p className="text-xl">go back</p>
            </Link>
            <div className="pt-3 ">
                <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
                    {session && (
                        <>
                            <div className="">
                                <h1 className="py-2 text-2xl font-semibold">Account settings</h1>
                            </div>
                            <hr className="mt-4 mb-8" />
                            <p className="py-2 text-xl font-semibold">Email Address</p>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-gray-600">Your email address is <strong>{session.data?.user?.email}</strong></p>
                                <button className="inline-flex text-sm font-semibold text-blue-600 underline decoration-2">Change</button>
                                <p>Name: <strong>{session.data?.user?.name}</strong></p>
                                <img src={`${session.data?.user?.image}`} alt="User Profile" />
                            </div>
                        </>
                    )}
                    <hr className="mt-4 mb-8" />
                    <p className="py-2 text-xl font-semibold">Password</p>
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-center">
                            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                                <label htmlFor="old-password">
                                    <span className="text-sm text-gray-500">Current Password</span>
                                    <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                        <input
                                            onChange={(e) => setOldPass(e.target.value)}
                                            type={showPassword ? "text" : "password"}
                                            id="old-password"
                                            className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                                            placeholder="***********"
                                        />
                                    </div>
                                </label>
                                <label htmlFor="new-password">
                                    <span className="text-sm text-gray-500">New Password</span>
                                    <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                        <input
                                            onChange={(e) => setNewPass(e.target.value)}
                                            type={showPassword ? "text" : "password"}
                                            id="new-password"
                                            className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                                            placeholder="***********"
                                        />
                                    </div>
                                </label>
                            </div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mt-5 ml-2 h-6 w-6 cursor-pointer text-sm font-semibold text-gray-600 underline decoration-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                                onClick={togglePasswordVisibility}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                />
                            </svg>
                        </div>

                        <button type="submit" className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">Save Password</button>
                        <hr className="mt-4 mb-8" />

                    </form>
                    <p className="mt-2 pb-6 flex">
                        Cant remember your current password?
                        {/* <button onClick={handleSendOtp} className="text-sm font-semibold text-blue-600 underline decoration-2">Recover Account</button> */}
                        <ResetPassword></ResetPassword>
                    </p>

                    

                </div>
            </div>

        </div>
    );
};

