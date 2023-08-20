import React, { useEffect, useState } from 'react'
import Title from '../utils/Title'
import Item from '../utils/Item'
import { toast } from 'react-hot-toast'
import axiosClient from '../../api/axios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, selectFilterPage, selectProducts } from '../../app/ProductsSlice'

const Sales = () => {
  const filterPage = useSelector(selectFilterPage)
  const dispatch = useDispatch()
  const latestProducts = useSelector(selectProducts)
  useEffect(() => {
    const fetch = async () => {
      dispatch(fetchProducts({search:'e'}));
    }
    fetch()
  }, [])

  return (
    <>

      <div className={`${filterPage? 'mt-28' : ''} nike-container`}>
        <Title title='Our Latest Products' />
        <div className={`grid items-center justify-items-center gap-7 lg:gap-5 mt-7 grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1`}>
          {latestProducts?.map((item, i) => (
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