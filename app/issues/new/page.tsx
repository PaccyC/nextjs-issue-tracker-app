"use client"

import { createIssueSchema } from '@/app/api/schema';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { z } from 'zod';
import dynamic from 'next/dynamic';


const SimpleMDE = dynamic(
  () => import("react-simplemde-editor"),
{ssr:false}

)

type IssueForm=z.infer<typeof createIssueSchema>
const NewIssuePage = () => {

  const [error,setError]= useState('');
  const [isSubmitting,setIsSumbmitting]= useState(false)
  const router= useRouter()

  const {register,control,handleSubmit,formState:{errors}}= useForm<IssueForm>({
    resolver:zodResolver(createIssueSchema)
  })
  
  const onSubmit= handleSubmit(async(data)=>{
            try {
              setIsSumbmitting(true)
              await axios.post("/api/issues",data)
              router.push("/issues")
            } catch (error) {
              setError("Unexpected error occurred")
              setIsSumbmitting(false);
            }
          
          }
          
          )
  return (
    <div className='max-w-xl'>
      {error && <Callout.Root color='red' className='mb-5'>
        <Callout.Text>
          {error}
        </Callout.Text>
        </Callout.Root>}
      <form onSubmit={onSubmit} className='space-y-4'>
            <TextField.Root 
            placeholder='Title' {...register("title")}/>
            
             <ErrorMessage>{errors.title?.message}</ErrorMessage>
            <Controller
            name='description'
            control={control}
            render={({field})=><SimpleMDE placeholder='Description' {...field}/>
          }
            />
        
          <ErrorMessage>{errors.description?.message}</ErrorMessage>

            <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner/>}</Button>
          </form>
    </div>
    
  )
}

export default NewIssuePage
