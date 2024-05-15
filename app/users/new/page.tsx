"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

const NewUserPage = () => {

  const router= useRouter();
  return (
    <div>
      New User Page

      <button
       className=' btn btn-primary'
       onClick={()=>router.push("/users")}
       >Add User</button>
    </div>
  )
}

export default NewUserPage
