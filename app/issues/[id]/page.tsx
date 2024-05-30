import prisma from '@/prisma/prisma'
import { Flex, Heading } from '@radix-ui/themes'
import React from 'react'

const SingleIssuePage = () => {
    
    const issue= await prisma.issue.findUnique({where:{
        id:parseInt(router.query.id)
    }})
  return (
    <div>
      
      <Heading>{issue.title}</Heading>
      <Flex className='space-x-3 my-2'>
        

      </Flex>

    </div>
  )
}

export default SingleIssuePage
