"use client"

import { CldUploadWidget,CldImage } from 'next-cloudinary'
import { useState } from 'react'



const UploadPage = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const handleUpload = (result:any) => {
    if (result.event === 'success') {
      setImageUrl(result.info.secure_url);
    }
  };
  return (
    <>
    
    <CldUploadWidget 
    options={
      {
        sources:["local"],
        multiple:false,
        maxFiles:5
      }
    }
    
    uploadPreset='cgctjgtk'>
        {({open})=><button 
        className='btn btn-primary'
        onClick={()=>open()}
        >Upload</button>}
        
    </CldUploadWidget>

    {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <CldImage
            src={imageUrl}
            alt="Uploaded Image"
            width={300}
            height={300}
            crop="fill"
          />
        </div>
      )}
    </>
    
  )
}

export default UploadPage
