import SignIn from '@/components/SignIn'
import React from 'react'

function page() {
  return (
    <>
      <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <SignIn></SignIn>
      </div>
    </>
  )
}

export default page