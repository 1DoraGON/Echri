import React, { useEffect, useRef, useState } from 'react'
import Title from '../utils/Title'
import Item from '../utils/Item'
import { toast } from 'react-hot-toast'
import axiosClient from '../../api/axios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, selectFilterPage, selectLoading, selectProducts } from '../../app/ProductsSlice'
import EmptyItem from '../utils/EmptyItem'

const Sales = () => {
  const searchRef = useRef()
  const filterPage = useSelector(selectFilterPage)
  const dispatch = useDispatch()
  const latestProducts = useSelector(selectProducts)
  const loading = useSelector(selectLoading)

  useEffect(() => {
    const fetch = (params) => {
      dispatch(fetchProducts({ params }));
    }
    fetch({})
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    const params = {
      search: searchRef.current.value
    }
    dispatch(fetchProducts(params));
  }
  return (
    <>

      <div className={`${filterPage ? 'mt-28' : ''} nike-container`}>
        <div className='flex md:flex-col items-center justify-between'>
          <Title title='Our Latest Products' />
          <form className='w-[30%] md:w-full md:block md:mt-4'>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input ref={searchRef} type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search Categories, Products, Colors ..." required />
              <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2" onClick={(e) => { handleSearch(e) }} >Search</button>
            </div>
          </form>
        </div>
        <div className={`grid items-center justify-items-center gap-7 lg:gap-5 mt-7 grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1`}>
          {loading && <>
            <EmptyItem />
            <EmptyItem />
            <EmptyItem />
            <EmptyItem />
          </>}
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