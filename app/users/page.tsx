import Link from 'next/link'
import React, { Suspense } from 'react'
import UserTable from './UserTable'

const UsersPage = () => {
  return (
    <div>
    
   <Link href='/users/new' className='btn'>New User</Link>
    
    <Suspense fallback={<p >Loading...</p>}>

    <UserTable/>
    </Suspense>
    </div>
  )
}

export default UsersPage
