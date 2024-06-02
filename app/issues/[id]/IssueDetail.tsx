import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@prisma/client'
import { Heading, Flex, Card,Text} from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'

const IssueDetail = ({issue}:{issue:Issue}) => {
  return (
   <>
     <Heading>{issue.title}</Heading>
      <Flex className='space-x-3 my-2'>
      <IssueStatusBadge status={issue.status}/>
      <Text>{issue.createdAt.toDateString()}</Text>
      <p>{issue.status}</p>

      </Flex>
      <Card>

     <ReactMarkdown>{issue.desription}</ReactMarkdown>  
      </Card>
   </>
  )
}

export default IssueDetail
