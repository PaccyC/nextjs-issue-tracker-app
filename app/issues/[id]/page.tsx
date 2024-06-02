import prisma from '@/prisma/prisma'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetail from './IssueDetail'
import DeleteIssueButton from './DeleteIssueButton'
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
    <Grid columns={{initial:"1",sm:"5"}}gap="5"> 
      <Box className=' md:col-span-4'>

       <IssueDetail issue={issue}/>
    </Box>
    <Box >
      <Flex direction="column" gap="4">

     <EditIssueButton issueId={issue.id}/>
     <DeleteIssueButton issueId={issue.id}/>
      </Flex>
    </Box>
      
        


    </Grid>
  )
}

export default SingleIssuePage
