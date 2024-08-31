
'use client'

import { Fragment, useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import { MagnifyingGlassIcon, Bars3Icon, ShoppingBagIcon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import SearchBar from "@/components/Searchbar"
import axios from 'axios'
import { useCart } from './CartContext'
import { ShoppingCart } from "lucide-react"


export default function Example() {
  const [open, setOpen] = useState(false)
  const session = useSession();
  const [products, setProducts] = useState<any[]>([]);

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
    <header className='fixed z-10 w-full'>
      <nav className='navbar-top flex h-12 mt-3 mx-3 shadow-lg items-center flex-row-reverse lg:flex-row justify-between lg:justify-between bg-white rounded-full px-6 relative'>
        <MagnifyingGlassIcon onClick={() => setOpen(true)} className='w-6 lg:hidden' />
        <div>
          <Link href='/'>LOGO HERE</Link>
        </div>
        {/* searchbar  */}
        <div className='lg:block hidden'>
          <div className="flex lg:ml-6">
            <div className='relative w-[600px]' >
              <SearchBar onSearch={setProducts} />
              {products &&
                <div >
                  {products.map((product) => (
                    <Link key={product.id} href={`/product/${product.id}`}>
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
        <div className='flex gap-5 lg:flex hidden'>
          {session.data ? (
            <Link className='flex gap-1 items-center' href='/profile'>
              <UserIcon className='w-6' />
              <p className='text-lg '>{session && (
                <p className='max-w-16 text-nowrap overflow-hidden text-ellipsis'>{session?.data?.user?.name}</p>
              )}</p>
            </Link>
          ) : (
            <Link className='flex gap-1 items-center' href='/signin'>
              <UserIcon className='w-6' />
              <p className='text-lg'>Login</p>
            </Link>
          )}
          <Link className='flex gap-1 items-center' href='/cart'>
            <ShoppingCart className='w-6' />
            <p className='text-lg relative'>Cart<span className='absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>{cartItems}</span></p>
          </Link>
        </div>
      </nav>
      {/* mobile searchbar  */}
      {
        open && (
          <div className='fixed z-10 w-full top-3'>
            <div className="flex lg:ml-6 relative mx-3">
              <div className='relative w-full h-12' >
                <div className='h-full'>
                  <SearchBar onSearch={setProducts} />
                  {products &&
                    <div >
                      {products.map((product) => (
                        <Link key={product.id} href={`/product/${product.id}`}>
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
    //  <div className="bg-white">
    //    {/* Mobile menu */}
    //    <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
    //      <DialogBackdrop
    //        transition
    //        className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
    //      />

    //      <div className="fixed inset-0 z-40 flex">
    //        <DialogPanel
    //          transition
    //          className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
    //        >
    //          <div className="flex px-4 pb-2 pt-5">
    //            <button
    //              type="button"
    //              onClick={() => setOpen(false)}
    //              className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
    //            >
    //              <span className="absolute -inset-0.5" />
    //              <span className="sr-only">Close menu</span>
    //              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
    //            </button>
    //          </div>

    //          {/* Links */}
    //          <TabGroup className="mt-2">
    //            <div className="border-b border-gray-200">
    //              <TabList className="-mb-px flex space-x-8 px-4">
    //                {navigation.categories.map((category) => (
    //                  <Tab
    //                    key={category.name}
    //                    className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600"
    //                  >
    //                    {category.name}
    //                  </Tab>
    //                ))}
    //              </TabList>
    //            </div>
    //            <TabPanels as={Fragment}>
    //              {navigation.categories.map((category) => (
    //                <TabPanel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
    //                  <div className="grid grid-cols-2 gap-x-4">
    //                    {category.featured.map((item) => (
    //                      <div key={item.name} className="group relative text-sm">
    //                        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
    //                          <img alt={item.imageAlt} src={item.imageSrc} className="object-cover object-center" />
    //                        </div>
    //                        <a href={item.href} className="mt-6 block font-medium text-gray-900">
    //                          <span aria-hidden="true" className="absolute inset-0 z-10" />
    //                          {item.name}
    //                        </a>
    //                        <p aria-hidden="true" className="mt-1">
    //                          Shop now
    //                        </p>
    //                      </div>
    //                    ))}
    //                  </div>
    //                  {category.sections.map((section) => (
    //                    <div key={section.name}>
    //                      <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
    //                        {section.name}
    //                      </p>
    //                      <ul
    //                        role="list"
    //                        aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
    //                        className="mt-6 flex flex-col space-y-6"
    //                      >
    //                        {section.items.map((item) => (
    //                          <li key={item.name} className="flow-root">
    //                            <a href={item.href} className="-m-2 block p-2 text-gray-500">
    //                              {item.name}
    //                            </a>
    //                          </li>
    //                        ))}
    //                      </ul>
    //                    </div>
    //                  ))}
    //                </TabPanel>
    //              ))}
    //            </TabPanels>
    //          </TabGroup>

    //          <div className="space-y-6 border-t border-gray-200 px-4 py-6">
    //            {navigation.pages.map((page) => (
    //              <div key={page.name} className="flow-root">
    //                <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
    //                  {page.name}
    //                </a>
    //              </div>
    //            ))}
    //          </div>

    //          <div className="space-y-6 border-t border-gray-200 px-4 py-6">
    //            <div className="flow-root">
    //              <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
    //                Sign in
    //              </a>
    //            </div>
    //            <div className="flow-root">
    //              <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
    //                Create account
    //              </a>
    //            </div>
    //          </div>

    //          <div className="border-t border-gray-200 px-4 py-6">
    //            <a href="#" className="-m-2 flex items-center p-2">
    //              <img
    //                alt=""
    //                src="https:tailwindui.com/img/flags/flag-canada.svg"
    //                className="block h-auto w-5 flex-shrink-0"
    //              />
    //              <span className="ml-3 block text-base font-medium text-gray-900">CAD</span>
    //              <span className="sr-only">, change currency</span>
    //            </a>
    //          </div>
    //        </DialogPanel>
    //      </div>
    //    </Dialog>

    //    <header className="relative bg-white">
    //      <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    //        <div className="border-b border-gray-200">
    //          <div className="flex h-16 items-center">
    //            <button
    //              type="button"
    //              onClick={() => setOpen(true)}
    //              className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
    //            >
    //              <span className="absolute -inset-0.5" />
    //              <span className="sr-only">Open menu</span>
    //              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
    //            </button>

    //            {/* Logo */}
    //            <div className="ml-4 flex lg:ml-0">
    //              <Link href="/">
    //                <span className="sr-only">Your Company</span>
    //                <img
    //                  alt=""
    //                  src="https:tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
    //                  className="h-8 w-auto"
    //                />
    //              </Link>
    //            </div>

    //            {/* Flyout menus */}
    //            <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
    //              <div className="flex h-full space-x-8">
    //                {navigation.categories.map((category) => (
    //                  <Popover key={category.name} className="flex">
    //                    <div className="relative flex">
    //                      <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-indigo-600 data-[open]:text-indigo-600">
    //                        {category.name}
    //                      </PopoverButton>
    //                    </div>

    //                    <PopoverPanel
    //                      transition
    //                      className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
    //                    >
    //                      {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
    //                      <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow" />

    //                      <div className="relative bg-white">
    //                        <div className="mx-auto max-w-7xl px-8">
    //                          <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
    //                            <div className="col-start-2 grid grid-cols-2 gap-x-8">
    //                              {category.featured.map((item) => (
    //                                <div key={item.name} className="group relative text-base sm:text-sm">
    //                                  <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
    //                                    <img
    //                                      alt={item.imageAlt}
    //                                      src={item.imageSrc}
    //                                      className="object-cover object-center"
    //                                    />
    //                                  </div>
    //                                  <a href={item.href} className="mt-6 block font-medium text-gray-900">
    //                                    <span aria-hidden="true" className="absolute inset-0 z-10" />
    //                                    {item.name}
    //                                  </a>
    //                                  <p aria-hidden="true" className="mt-1">
    //                                    Shop now
    //                                  </p>
    //                                </div>
    //                              ))}
    //                            </div>
    //                            <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
    //                              {category.sections.map((section) => (
    //                                <div key={section.name}>
    //                                  <p id={`${section.name}-heading`} className="font-medium text-gray-900">
    //                                    {section.name}
    //                                  </p>
    //                                  <ul
    //                                    role="list"
    //                                    aria-labelledby={`${section.name}-heading`}
    //                                    className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
    //                                  >
    //                                    {section.items.map((item) => (
    //                                      <li key={item.name} className="flex">
    //                                        <a href={item.href} className="hover:text-gray-800">
    //                                          {item.name}
    //                                        </a>
    //                                      </li>
    //                                    ))}
    //                                  </ul>
    //                                </div>
    //                              ))}
    //                            </div>
    //                          </div>
    //                        </div>
    //                      </div>
    //                    </PopoverPanel>
    //                  </Popover>
    //                ))}

    //                {navigation.pages.map((page) => (
    //                  <a
    //                    key={page.name}
    //                    href={page.href}
    //                    className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
    //                  >
    //                    {page.name}
    //                  </a>
    //                ))}
    //              </div>
    //            </PopoverGroup>

    //            <div className="ml-auto flex items-center">
    //              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
    //                {session.data ? (

    //                  <Link className='flex' href='/profile'>
    //                    <UserIcon
    //                      aria-hidden="true"
    //                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
    //                    />
    //                    {session && (
    //                      <p>{session?.data?.user?.name}</p>
    //                    )}
    //                  </Link>
    //                ) : (
    //                  <Link href="/signin" className="text-sm font-medium text-gray-700 hover:text-gray-800">
    //                    Sign in
    //                  </Link>
    //                )}
    //                <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
    //              </div>

    //              {/* Search */}

    //              <div className="flex lg:ml-6">
    //                <div className='relative' >
    //                  <SearchBar onSearch={setProducts} />
    //                  {products &&
    //                    <div >
    //                      {products.map((product) => (
    //                        <Link key={product.id} href={`/product/${product.id}`}>
    //                          <div className='absolute z-10 bg-white w-full border border-gray-300 rounded mt-2 py-3 px-6 shadow-md' >
    //                            <h2>{product.title}</h2>
    //                            <p>${product.price}</p>
    //                          </div>
    //                        </Link>
    //                      ))}
    //                    </div>
    //                  }
    //                </div>
    //                <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
    //                  <span className="sr-only">Search</span>
    //                  <MagnifyingGlassIcon aria-hidden="true" className="h-6 w-6" />
    //                </a>
    //              </div>

    //              {/* Cart */}
    //              <div className="ml-4 flow-root lg:ml-6">
    //                <Link href="/cart" className="group -m-2 flex items-center p-2">
    //                  <ShoppingBagIcon
    //                    aria-hidden="true"
    //                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500 relative"
    //                  />
    //                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cartItems}</span>
    //                  <span className="sr-only">items in cart, view your bag</span>
    //                </Link>
    //              </div>
    //            </div>
    //          </div>
    //        </div>
    //      </nav>
    //    </header>
    //  </div>
  )
}
