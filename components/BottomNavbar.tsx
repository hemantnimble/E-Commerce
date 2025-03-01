'use client'
import Link from "next/link"
import { Home, Search, User, ShoppingCart,User2,User2Icon } from "lucide-react"
import { useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useAppSelector } from '@/lib/store/hooks';


export default function BottomNavBar() {
  const { cartItems, status, error } = useAppSelector((state) => state.cart)

  const session = useSession();
  const pathname = usePathname(); // Get current path

  // Define a function to check if the link is active
  const isActiveLink = (path: string) => pathname === path;
  return (
    <section className="r1 fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border h-16 px-4 lg:hidden">
      <ul className="r2 h-full flex items-center justify-around">
        <li>
          <Link href="/" className={`flex flex-col items-center ${isActiveLink('/') ? 'text-primary font-black' : ''}`}>
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>
        </li>
        <li>
          <Link href="/explore" className={`flex flex-col items-center ${isActiveLink('/explore') ? 'text-primary font-black' : ''}`}>
            <Search className="h-6 w-6" />
            <span className="text-xs mt-1">Explore</span>
          </Link>
        </li>
        <li>
          {session?.data?.user?.roles?.includes("ADMIN") ? (
            <Link href="/admin/dashboard" className={`flex flex-col items-center ${isActiveLink('/admin/dashboard') ? ' font-black' : ''}`}>
              <User className="h-6 w-6" />
              <span className="text-xs mt-1">Account</span>
            </Link>
          ) : (
            <Link href="/user/account" className={`flex flex-col items-center ${isActiveLink('/user/account') ? 'text-primary font-black' : ''}`}>
              <User className="h-6 w-6" />
              <span className="text-xs mt-1">Account</span>
            </Link>
          )}
        </li>
        <li>
          <Link href="/user/cart" className={`flex flex-col items-center relative ${isActiveLink('/user/cart') ? 'text-primary font-black' : ''}`}>
            <ShoppingCart className="h-6 w-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
            <span className="text-xs mt-1">Cart</span>
          </Link>
        </li>
      </ul>
    </section>
  );
}
