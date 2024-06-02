"use client"

import { issueSchema } from '@/app/api/schema';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

type IssueFormData = z.infer<typeof issueSchema>
const IssueForm = ({ issue }: { issue?: Issue }) => {

  const [error, setError] = useState('');
  const [isSubmitting, setIsSumbmitting] = useState(false)
  const router = useRouter()

  const { register,
    control,
    handleSubmit
    , formState: { errors } } = useForm<IssueFormData>({
      resolver: zodResolver(issueSchema)
    })

  const onSubmit = handleSubmit(async (data) => {

    try {
      setIsSumbmitting(true)
      if (issue)
        await axios.patch("/api/issues/" + issue.id,data);
      else
        await axios.post("/api/issues", data);
      router.push("/issues");
      router.refresh();
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
          defaultValue={issue?.title}
          placeholder='Title' {...register("title")} />

        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name='description'
          defaultValue={issue?.desription}
          control={control}
          render={({ field }) => <SimpleMDE placeholder='Description' {...field} />
          }
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {issue ? "Update issue" : "Submit New Issue "}
          {' '}
          {isSubmitting && <Spinner />}</Button>
      </form>
    </div>

  )
}

export default IssueForm
