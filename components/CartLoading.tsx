import React from 'react'
import WordPullUp from "@/components/magicui/word-pull-up";

function CartLoading() {
    return (
        <div className='flex items-center justify-center w-full h-[100vh] flex-col'>
            <img className='w-[30%]' src="./assets/cart.gif" alt="cart gif" />
            <WordPullUp
                className="text-lg font-bold tracking-[-0.02em] text-black dark:text-white md:text-7xl md:leading-[5rem]"
                words="Loading your cart..."
            />
        </div>)
}

export default CartLoading