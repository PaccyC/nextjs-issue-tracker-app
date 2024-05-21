"use client"

import { Button, Callout, TextField,Text } from '@radix-ui/themes'
import React, { useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from 'axios'
import {useForm,Controller} from 'react-hook-form'
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/api/schema';
import {z} from 'zod'


type IssueForm=z.infer<typeof createIssueSchema>
const NewIssuePage = () => {

  const [error,setError]= useState('');

  const router= useRouter()

  const {register,control,handleSubmit,formState:{errors}}= useForm<IssueForm>({
    resolver:zodResolver(createIssueSchema)
  })
  
  return (
    <div className='max-w-xl'>
      {error && <Callout.Root color='red' className='mb-5'>
        <Callout.Text>
          {error}
        </Callout.Text>
        </Callout.Root>}
      <form onSubmit={handleSubmit(async(data)=>{
            try {
              await axios.post("/api/issues",data)
              router.push("/issues")
            } catch (error) {
              setError("Unexpected error occurred")
            }
          
          }
          )} className='space-y-4'>
            <TextField.Root 
            placeholder='Title' {...register("title")}/>
            {errors.title && <Text color='red'>{errors.title.message}</Text>}
            <Controller
            name='description'
            control={control}
            render={({field})=><SimpleMDE placeholder='Description' {...field}/>
          }
            />
          {errors.description && <Text color='red'>{errors.description.message}</Text>}

            <Button>Submit New Issue</Button>
          </form>
    </div>
    
  )
}

export default NewIssuePage
