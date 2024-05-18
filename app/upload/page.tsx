"use client"

import { CldUploadWidget,CldImage } from 'next-cloudinary'
import { sources } from 'next/dist/compiled/webpack/webpack'
import { useState } from 'react'

interface CloudnaryResult{
  public_id:string
}
const UploadPage = () => {
  const [publicId,setPublicId]=useState('')
  return (
    <>
    {publicId &&
     <CldImage src={publicId} width={270} height={180} alt=''/>
    }
    <CldUploadWidget 
    options={
      {
        sources:["local"],
        multiple:false,
        maxFiles:5
      }
    }
    onUploadAdded={(result,widget)=>{
      
        console.log(result);
    if(result.event !== "success") return
  

    const info = result.info as CloudnaryResult
     setPublicId(info.public_id)
    }}
    uploadPreset='cgctjgtk'>
        {({open})=><button 
        className='btn btn-primary'
        onClick={()=>open()}
        >Upload</button>}
    </CldUploadWidget>
    </>
    
  )
}

export default UploadPage
