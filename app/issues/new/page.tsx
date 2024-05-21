"use client"

import { Button, Callout, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from 'axios'
import {useForm,Controller} from 'react-hook-form'
import { useRouter } from 'next/navigation';


interface issueForm{
  title:string,
  description:string
}
const NewIssuePage = () => {

  const [error,setError]= useState('');

  const router= useRouter()

  const {register,control,handleSubmit}= useForm<issueForm>()
  
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
            <TextField.Root placeholder='Title' {...register("title")}/>
            <Controller
            name='description'
            control={control}
            render={({field})=><SimpleMDE placeholder='Description' {...field}/>
          }
            />
            <Button>Submit New Issue</Button>
          </form>
    </div>
    
  )
}

export default NewIssuePage
