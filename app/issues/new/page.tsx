"use client"

import { Button, TextField } from '@radix-ui/themes'
import React from 'react'
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

  const router= useRouter()
  const {register,control,handleSubmit}= useForm<issueForm>()
  
  return (
    <form onSubmit={handleSubmit(async(data)=>{
      await axios.post("/api/issues",data)
      router.push("/issues")
    }
    )} className='max-w-xl space-y-4'>
      <TextField.Root placeholder='Title' {...register("title")}/>
      <Controller
      name='description'
      control={control}
      render={({field})=><SimpleMDE placeholder='Description' {...field}/>
    }
      />
      <Button>Submit New Issue</Button>
    </form>
  )
}

export default NewIssuePage
