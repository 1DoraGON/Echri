import React from 'react'

const Button = ({bgColor,color,size,text,borderRadius, handleClick}) => {
  return (
    <button onClick={handleClick} type="button" style={{backgroundColor:bgColor,color,borderRadius}} 
    className={`text-${size} p-3 hover:drop-shadow-xl`}>
      {text}
    </button>
  )
}

export default Button