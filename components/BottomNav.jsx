'use client'
import Link from "next/link"
import { Home, Search, User, ShoppingCart } from "lucide-react"
import { useCart } from "./CartContext";
import { useEffect } from "react";
import axios from "axios";

export default function Component() {
  const { cartItems, setCartItems } = useCart();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('/api/cart/get');
        const items = response.data.length;
        setCartItems(items);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, []);
  return (
    <section className="r1 fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border h-16 px-4 lg:hidden">
      <ul className="r2 h-full flex items-center justify-around">
        <li>
          <Link href="/" className="flex flex-col items-center">
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>
        </li>
        <li>
          <Link href="/explore" className="flex flex-col items-center">
            <Search className="h-6 w-6" />
            <span className="text-xs mt-1">Explore</span>
          </Link>
        </li>
        <li>
          <Link href="/user/account" className="flex flex-col items-center">
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">Account</span>
          </Link>
        </li>
        <li>
          <Link href="/cart" className="flex flex-col items-center relative">
            <ShoppingCart className="h-6 w-6" />
            {cartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems}
              </span>
            )}
            <span className="text-xs mt-1">Cart</span>
          </Link>
        </li>
      </ul>
    </section>
  )
}