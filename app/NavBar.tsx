"use client"

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import classnames from 'classnames'
import {AiFillBug} from 'react-icons/ai'
import { Box, Container, Flex } from '@radix-ui/themes'

const NavBar = () => {
  const currentPath=usePathname()  
  const {data:session,status}= useSession()
  const links=[
    {label:'Dashboard',href:'/'},
    {label:"Issues",href:'/issues'}
  ]

  
  return (
   <nav className='border-b mb-5 px-5 py-3 items-center'>
    <Container>

    <Flex justify="between">
      <Flex align="center" gap="3">
      <Link href="/"><AiFillBug/></Link>
    <ul className='flex space-x-6 '>
      {links.map((link)=>(
        <li key={link.href} >

          <Link 
          className={
            classnames({
              'text-zinc-900': link.href === currentPath,
              'text-zinc-500': link.href !== currentPath,
              'hover:text-zinc-800 transition-colors':true
            })
          } href={link.href}>{link.label}</Link>
       
        </li>
   
      
      ))}
    </ul>
      </Flex>

      <Box>
        <Box>
        {status ==="unauthenticated" && <Link href="/api/auth/signin">Sign In</Link>}

        {status === "authenticated" && <Link href="/api/auth/signout">Logout</Link>}
      </Box>
      </Box>
    </Flex>
   
   
    </Container>
   </nav>
  )
}

export default NavBar
