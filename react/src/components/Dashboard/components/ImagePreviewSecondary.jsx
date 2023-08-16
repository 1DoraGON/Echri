import React from 'react'
import { MdOutlineCancel } from 'react-icons/md'

const ImagePreviewSecondary = ({handleRemoveImage,image,STORAGE_URL,productId,i}) => {
  return (
    <>
      <div className={`${i==='category'? 'relative top-8 left-2' : 'absolute top-2 right-2'}`} onClick={() => { handleRemoveImage(image) }}>
        <MdOutlineCancel className='w-5 h-5 text-black dark:text-gray-800 hover:text-slate-400 cursor-pointer' />
      </div>
      <div className="w-full h-full overflow-hidden border-2 border-gray-300 border-dashed rounded-md flex items-center ">
        <img
          id={`image-preview-${i}`}
          className="object-center w-full h-auto"
          src={`${productId ? STORAGE_URL + image : ''}`}
          alt=""
        />
      </div>
    </>
  )
}

export default ImagePreviewSecondary