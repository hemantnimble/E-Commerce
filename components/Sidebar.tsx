// components/Sidebar.tsx
import { signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';

interface SidebarProps {
    setActiveTab: (tab: string) => void;
    activeTab: string;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveTab, activeTab }) => {
    const session = useSession();
    
    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };
    const handleSignout = () => {
        signOut();
    };

    return (
        <div className="mx-4 max-w-[180px] overflow-hidden sm:mx-8 xl:mx-auto">
            <h1 className="border-b py-6 text-4xl font-semibold">
                {session && (
                    <p>{session?.data?.user?.name}</p>
                )}
            </h1>
            <div className="grid grid-cols-8 pt-3 pb-10 sm:grid-cols-10">
                <div className="relative my-4 w-56 sm:hidden">
                    <input className="peer hidden" type="checkbox" name="select-1" id="select-1" />
                    <label htmlFor="select-1" className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring">Accounts </label>
                    <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                    <ul className="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
                        <li className={`cursor-pointer px-3 py-2 text-sm ${activeTab === 'accounts' ? 'bg-blue-700 text-white' : 'text-slate-600 hover:bg-blue-700 hover:text-white'}`} onClick={() => handleTabClick('accounts')}>Accounts</li>
                        <li className={`cursor-pointer px-3 py-2 text-sm ${activeTab === 'team' ? 'bg-blue-700 text-white' : 'text-slate-600 hover:bg-blue-700 hover:text-white'}`} onClick={() => handleTabClick('team')}>Team</li>
                        <li className={`cursor-pointer px-3 py-2 text-sm ${activeTab === 'others' ? 'bg-blue-700 text-white' : 'text-slate-600 hover:bg-blue-700 hover:text-white'}`} onClick={() => handleTabClick('others')}>Others</li>
                    </ul>
                </div>
                <div className="col-span-2 hidden sm:block">
                    <ul>
                        <li
                            onClick={() => handleTabClick('profile')}
                            className={`mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold transition ${activeTab === 'profile' ? 'border-l-blue-700 text-blue-700' : 'border-transparent hover:border-l-blue-700 hover:text-blue-700'}`}
                        >
                            Profile
                        </li>
                        <li
                            onClick={() => handleTabClick('orders')}
                            className={`mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold transition ${activeTab === 'orders' ? 'border-l-blue-700 text-blue-700' : 'border-transparent hover:border-l-blue-700 hover:text-blue-700'}`}
                        >
                            Orders
                        </li>
                        <li
                            onClick={() => handleTabClick('notifications')}
                            className={`mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold transition ${activeTab === 'notifications' ? 'border-l-blue-700 text-blue-700' : 'border-transparent hover:border-l-blue-700 hover:text-blue-700'}`}
                        >
                            Notifications
                        </li>
                        <li
                            onClick={() => handleTabClick('integrations')}
                            className={`mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold transition ${activeTab === 'integrations' ? 'border-l-blue-700 text-blue-700' : 'border-transparent hover:border-l-blue-700 hover:text-blue-700'}`}
                        >
                            Integrations
                        </li>
                        <li
                            onClick={handleSignout}
                            className={`mt-5 cursor-pointer border-l-2 px-2 py-2 font-semibold transition ${activeTab === 'integrations' ? 'border-l-blue-700 text-blue-700' : 'border-transparent hover:border-l-blue-700 hover:text-blue-700'}`}
                        >
                            Sign Out 
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
