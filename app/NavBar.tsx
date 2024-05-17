"use client"

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const NavBar = () => {

  const {status,data:session}= useSession()

  if(status === 'loading') return null;

  
  return (
    <div className='flex bg-slate-200 p-5 space-x-3w'>
      <Link href='/' className='mr-5'>Home</Link>
      {status === "authenticated" && <div>{session.user?.name}</div>}
      {status === "unauthenticated" && <Link href='/api/auth/signin' className='mr-5'>Sign In</Link>}
    </div>
  )
}

export default NavBar
