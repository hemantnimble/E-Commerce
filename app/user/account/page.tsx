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
              <svg className='w-[24px] h-[24px]' xmlns="http://www.w3.org/2000/svg" width={430} height={430} viewBox="0 0 430 430" fill="none">
                <path d="M55 350C55 286.487 106.487 235 170 235H260C323.513 235 375 286.487 375 350V372C375 373.657 373.657 375 372 375H58C56.3431 375 55 373.657 55 372V350Z" fill="#4BB3FD" />
                <g style={{ mixBlendMode: 'multiply' }} opacity="0.5">
                  <path d="M170 235C106.487 235 55 286.487 55 350V372C55 373.657 56.3431 375 58 375H110V350C110 286.487 161.487 235 225 235H170Z" fill="#4BB3FD" />
                </g>
                <path d="M272.496 76.7327C283.423 89.7808 290 106.648 290 125C290 166.478 256.372 200 215 200C173.628 200 140 166.372 140 125C140 83.628 173.628 50 215 50C238.126 50 258.706 60.396 272.496 76.7327Z" fill="#FFC738" />
                <g style={{ mixBlendMode: 'multiply' }} opacity="0.5">
                  <path d="M265.319 180.618C257.407 183.455 248.882 185 240 185C198.628 185 165 151.372 165 110C165 87.955 174.548 68.1085 189.728 54.377C160.762 64.766 140 92.4926 140 125C140 166.372 173.628 200 215 200C234.349 200 252.005 192.668 265.319 180.618Z" fill="#FFC738" />
                </g>
              </svg>
              <span className="ml-2">Profile</span>
            </button>
          </Link>
          <Link href='/user/address'>
            <button className=" w-full flex items-center bg-secondary text-secondary-foreground p-3 rounded-lg shadow-lg hover:bg-secondary/80 transition duration-200">
              <img aria-hidden="true" alt="Coupons" src="https://openui.fly.dev/openui/24x24.svg?text=🎁" />
              <span className="ml-2">Saved Address</span>
            </button>
          </Link>
          <Link href='/user/orders'>
            <button className=" w-full flex items-center bg-secondary text-secondary-foreground p-3 rounded-lg shadow-lg hover:bg-secondary/80 transition duration-200">
              <img aria-hidden="true" alt="Help Center" src="https://openui.fly.dev/openui/24x24.svg?text=🆘" />
              <span className="ml-2">Help Center</span>
            </button>
          </Link>
        </div>
        <button onClick={handleSignout} className="Btn mt-3">
          <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" /></svg></div>
          <div className="text">Logout</div>
        </button>
      </div>
      {/* <div className="bg-background text-foreground p-4 rounded-lg shadow-md">
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
      </div> */}

    </>
  );
};

export default Home;