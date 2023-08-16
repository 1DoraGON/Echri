import React from 'react'

const ImagePreview = ({ ImageSVG, handleImageChange, fileInputRef, handleDivClick, style, text, isCategory }) => {

  return (
    <div className={style} onClick={handleDivClick} >
      <div
        className="space-y-1 text-center"
      // Handle div click event
      >
        {isCategory ? (
          <svg className="mx-auto h-12 w-12 text-black" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) :
          <ImageSVG />
        }
        <label
          name="file-upload"
          className={`relative cursor-pointer ${isCategory ? '' : 'bg-white dark:text-gray-200'} rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 `}
        >
          <span className={`${isCategory ? 'text-black' : 'dark:text-black'} dark:text-black p-2`}>{text}</span>
          </label>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="hidden"
            onChange={handleImageChange}
            ref={fileInputRef} // Attach the ref to the input element
          />
        <p className={`pl-1 ${isCategory ? 'text-black' : 'dark:text-gray-200'}`}>or drag and drop</p>
        <p className={`text-xs ${isCategory ? 'text-black' : 'dark:text-gray-200'}`}>
          PNG, JPG, GIF up to 10MB
        </p>
      </div>
    </div>
  )
}

export default ImagePreview