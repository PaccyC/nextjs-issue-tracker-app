import React from 'react'

import dynamic from 'next/dynamic'
const IssueForm = dynamic(
  ()=>import("../_components/IssueForm"),
  {
    ssr:false,
    loading:()=> <p>Loading</p>
  }
)
const NewIssuePage = () => {
  return (
    <IssueForm/>
  )
}

export default NewIssuePage
