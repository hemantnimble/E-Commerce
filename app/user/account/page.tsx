'use client'
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const Home: React.FC = () => {

  const session = useSession()
  const handleSignout = () => {
    try {
        signOut();
        alert('Signed out successfully');
    } catch (err) {
        console.error('Error signing out: ', err);
        alert('Error signing out');
    }
};
  return (
    <>
      <div className="p-6 bg-background text-foreground">
        <h1 className="text-3xl font-bold text-primary">Hey! {session.data?.user.name}</h1>
        <div className="flex flex-col mt-4 space-y-4">
          <Link href='/user/orders'>
            <button className="w-full flex items-center bg-secondary text-secondary-foreground p-3 rounded-lg shadow-lg hover:bg-secondary/80 transition duration-200">
              <img aria-hidden="true" alt="Orders" src="https://openui.fly.dev/openui/24x24.svg?text=📦" />
              <span className="ml-2">Orders</span>
            </button>
          </Link>
          <Link href='/user/account/profile'>
            <button className=" w-full flex items-center bg-secondary text-secondary-foreground p-3 rounded-lg shadow-lg hover:bg-secondary/80 transition duration-200">
              <img aria-hidden="true" alt="Wishlist" src="https://openui.fly.dev/openui/24x24.svg?text=❤️" />
              <span className="ml-2">Profile</span>
            </button>
          </Link>
          <Link href='/user/orders'>
            <button className=" w-full flex items-center bg-secondary text-secondary-foreground p-3 rounded-lg shadow-lg hover:bg-secondary/80 transition duration-200">
              <img aria-hidden="true" alt="Coupons" src="https://openui.fly.dev/openui/24x24.svg?text=🎁" />
              <span className="ml-2">Coupons</span>
            </button>
          </Link>
          <Link href='/user/orders'>
            <button className=" w-full flex items-center bg-secondary text-secondary-foreground p-3 rounded-lg shadow-lg hover:bg-secondary/80 transition duration-200">
              <img aria-hidden="true" alt="Help Center" src="https://openui.fly.dev/openui/24x24.svg?text=🆘" />
              <span className="ml-2">Help Center</span>
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-background text-foreground p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
        <ul className="space-y-2">
          <li className="flex items-center">
            <img aria-hidden="true" alt="Flipkart Plus" src="https://openui.fly.dev/openui/24x24.svg?text=➕" className="mr-2" />
            <span className="text-primary">Flipkart Plus</span>
          </li>
          <li className="flex items-center">
            <img aria-hidden="true" alt="Edit Profile" src="https://openui.fly.dev/openui/24x24.svg?text=👤" className="mr-2" />
            <span className="text-primary">Edit Profile</span>
          </li>
          <li className="flex items-center">
            <img aria-hidden="true" alt="Saved Credit / Debit & Gift Cards" src="https://openui.fly.dev/openui/24x24.svg?text=💳" className="mr-2" />
            <span className="text-primary">Saved Credit / Debit &amp; Gift Cards</span>
          </li>
          <li className="flex items-center">
            <img aria-hidden="true" alt="Saved Addresses" src="https://openui.fly.dev/openui/24x24.svg?text=📍" className="mr-2" />
            <span className="text-primary">Saved Addresses</span>
          </li>
          <li className="flex items-center">
            <img aria-hidden="true" alt="Select Language" src="https://openui.fly.dev/openui/24x24.svg?text=🌐" className="mr-2" />
            <span className="text-primary">Select Language</span>
          </li>
          <li className="flex items-center">
            <img aria-hidden="true" alt="Notification Settings" src="https://openui.fly.dev/openui/24x24.svg?text=🔔" className="mr-2" />
            <span className="text-primary">Notification Settings</span>
          </li>
        </ul>
      </div>
      <button onClick={handleSignout} className="Btn">
        <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" /></svg></div>
        <div className="text">Logout</div>
      </button>
    </>
  );
};

export default Home;