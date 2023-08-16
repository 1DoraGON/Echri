import React, { useEffect, useState } from 'react'
import Title from '../utils/Title'
import Item from '../utils/Item'
import { toast } from 'react-hot-toast'
import axiosClient from '../../api/axios'

const Sales = () => {
    const [latestProducts,setLatestProducts] = useState([]) 
    useEffect(()=>{
      const fetchProducts = async () =>{
        await axiosClient.get('/api/products').then((response)=>{
          setLatestProducts(response.data.data)
          console.log(response);
        }).catch((error)=>{
          toast.error('Oops! Something went wrong please try later!')
        })
      }
      fetchProducts()
    },[])
  
  return (
    <>
        <div className="nike-container">
            <Title title='Our Latest Products' />
            <div className={`grid items-center justify-items-center gap-7 lg:gap-5 mt-7 grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1`}>
                {latestProducts?.map((item,i)=>(
                    <Item
                        key={i}
                        {...item}
                        
                    />
                ))}  
            </div>
        </div>
    </>
  )
}

export default Sales