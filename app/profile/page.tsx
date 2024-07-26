// pages/index.tsx
'use client'
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Profile from '@/components/Profile';
import Orders from '@/components/Orders';
import { useSession } from 'next-auth/react';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <Profile />;
      case 'orders':
        return <Orders />;
      default:
        return <Profile />;
    }
  };
  const session = useSession()

  return (
    <div className="flex">
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      <div className="w-3/4 p-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default Home;