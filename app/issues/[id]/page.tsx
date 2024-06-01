import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/prisma'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import ReactMarkdown  from 'react-markdown'

interface Props{
    params:{
        id:string
    }
}

const SingleIssuePage =async ({params:{id}}:Props) => {
    
    const issue= await prisma.issue.findUnique({where:{
        id:parseInt(id)
    }})

    if(!issue)
        notFound();
  return (
    <div>
      
      <Heading>{issue.title}</Heading>
      <Flex className='space-x-3 my-2'>
      <IssueStatusBadge status={issue.status}/>
      <Text>{issue.createdAt.toDateString()}</Text>
      <p>{issue.status}</p>

      </Flex>
      <Card>

     <ReactMarkdown>{issue.desription}</ReactMarkdown>  
      </Card>
        


    </div>
  )
}

export default SingleIssuePage
