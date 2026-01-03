'use client'
import { Fragment, useEffect, useState } from 'react'
import { MagnifyingGlassIcon, Bars3Icon, ShoppingBagIcon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import SearchBar from "@/components/Searchbar"
import axios from 'axios'
import { ShoppingCart } from "lucide-react"
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { fetchCartItems } from '@/app/lib/store/features/cart/cartSlice';


export default function Example() {
  const dispatch = useAppDispatch();
  const { cartItems, status, error } = useAppSelector((state) => state.cart)
  const [open, setOpen] = useState(false)
  const session = useSession();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const loadCartItems = async () => {
        try {
            await dispatch(fetchCartItems()).unwrap();
            // If successful, the cart items are already in the Redux state
        } catch (error) {
            // Handle the error (e.g., show a toast or log the error)
            console.error('Failed to fetch cart items:', error);
        }
    };

    loadCartItems();
}, [dispatch]);

  const handleSelectProduct = () => {
    setProducts([]); // Clear the products when a product is selected
  };

  return (
    <header className='fixed z-10 w-full'>
      <nav className='navbar-top flex h-12 mt-3 mx-3 shadow-lg items-center flex-row-reverse lg:flex-row justify-between lg:justify-between bg-white rounded-full px-6 relative'>
        <MagnifyingGlassIcon onClick={() => setOpen(true)} className='w-6 lg:hidden' />
        <div>
          <Link href='/'>
            <span className='flex gap-2 items-center'>
              <img className='h-8 w-8' src="/assets/logo2.png" alt="" />
              <h1 className='text-l'>SoundSphere</h1>
            </span>
          </Link>
        </div>
        {/* searchbar  */}
        <div className='lg:block hidden'>
          <div className="flex lg:ml-6">
            <div className='relative w-[600px]' >
              <SearchBar onSearch={setProducts} onSelect={handleSelectProduct} />
              {products &&
                <div >
                  {products.map((product) => (
                    <Link key={product.id} href={`/product/${product.id}`} onClick={() => handleSelectProduct()}>
                      <div className='absolute z-10 bg-white w-full border border-gray-300 rounded mt-2 py-3 px-6 shadow-md' >
                        <h2>{product.title}</h2>
                        <p>${product.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              }
            </div>
          </div>
        </div>
        {/* login cart  */}
        {
          session.data?.user.roles.includes("ADMIN") ? (
            <Link className='flex gap-1 items-center lg:flex hidden' href='/admin/dashboard'>
              <UserIcon className='w-6' />
              <span className='text-lg '>{session && (
                <p className='max-w-16 text-nowrap overflow-hidden text-ellipsis'>{session?.data?.user?.name}</p>
              )}</span>
            </Link>
          ) : (
            <div className='flex gap-5 lg:flex hidden'>
              {session.data ? (
                <Link className='flex gap-1 items-center' href='/user/account'>
                  <UserIcon className='w-6' />
                  <span className='text-lg '>{session && (
                    <p className='max-w-16 text-nowrap overflow-hidden text-ellipsis'>{session?.data?.user?.name}</p>
                  )}</span>
                </Link>
              ) : (
                <Link className='flex gap-1 items-center' href='/user/signin'>
                  <UserIcon className='w-6' />
                  <p className='text-lg'>Login</p>
                </Link>
              )}
              <Link className='flex gap-1 items-center' href='/user/cart'>
                <ShoppingCart className='w-6' />
                <p className='text-lg relative'>Cart<span className='absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>{cartItems.length}</span></p>
              </Link>
            </div>
          )
        }

      </nav>
      {/* mobile searchbar  */}
      {
        open && (
          <div className='fixed z-10 w-full top-3'>
            <div className="flex lg:ml-6 relative mx-3">
              <div className='relative w-full h-12' >
                <div className='h-full'>
                  <SearchBar onSearch={setProducts} onSelect={handleSelectProduct} />
                  {products &&
                    <div >
                      {products.map((product) => (
                        <Link key={product.id} href={`/product/${product.id}`} onClick={() => handleSelectProduct()}>
                          <div className='absolute z-10 bg-white w-full border border-gray-300 rounded mt-2 py-3 px-6 shadow-md' >
                            <h2>{product.title}</h2>
                            <p>${product.price}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  }
                  <XMarkIcon onClick={() => setOpen(false)} className='w-6 absolute top-3 right-3 text-gray-400'></XMarkIcon>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </header>
  )
}
