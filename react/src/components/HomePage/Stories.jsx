import React, { useEffect, useState } from 'react'
import Title from '../utils/Title'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css';
import { HashtagIcon, HeartIcon } from "@heroicons/react/24/solid";
import { ClockIcon } from "@heroicons/react/24/outline";
import { truncate } from 'lodash';
import axiosClient from '../../api/axios';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectParams, setFilterPage, setLoading, setParams } from '../../app/ProductsSlice';
import EmptyCategory from '../utils/EmptyCategory';
import { selectIsLoading, setIsLoading } from '../../app/ThemeSlice';

const Stories = () => {
  const [categories, setCategories] = useState([])
  const dispatch = useDispatch()
  const isLoading = useSelector(selectIsLoading)
  const params = useSelector(selectParams)
  useEffect(() => {
    const fetchCategories = async () => {
      await axiosClient.get('/api/categories/indexWithProducts').then((response) => {
        setCategories(response.data.categories)
        dispatch(setIsLoading(false))
        console.log(response);
      }).catch((error) => {
        console.log(error);
        toast.error('Oops! Something went wrong please try later!')
      })
    }




    fetchCategories()
  }, [])

  const splideOptions = {
    perPage: 4,
    perMove: 1,
    rewind: false,
    keyboard: 'global',
    gap: '1rem',
    pagination: false,
    padding: '2rem',
    breakpoints: {
      1200: { perPage: 3 },
      991: { perPage: 2.3 },
      768: { perPage: 2 },
      500: { perPage: 1.3 },
      425: { perPage: 1 },
    },
  };
  const STORAGE_URL = import.meta.env.VITE_REACT_APP_STORAGE_URL;

  const handleCategoryClick = (category) => {
    dispatch(setLoading(true))
    dispatch(setFilterPage(true))
    dispatch(setParams({...params, category: category}))
    dispatch(fetchProducts(params));
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling animation
    });
    //dispatch(setLoading(false))

  }

  return (
    <>
      <div className="nike-container mb-11">
        <Title title="In our store we have:" />
        <div className="">
          <Splide className='mt-10' options={splideOptions}>
            {isLoading && (
              <>
                <SplideSlide>
                  <EmptyCategory />
                </SplideSlide>
                <SplideSlide>
                  <EmptyCategory />
                </SplideSlide>
                <SplideSlide>
                  <EmptyCategory />
                </SplideSlide>
                <SplideSlide>
                  <EmptyCategory />
                </SplideSlide>

              </>
            )}
            {categories?.map((val, i) => (
              <SplideSlide key={i} className='mb-0.5' >
                <div className="relative grid items-center gap-4 pb-2 rounded-lg shadow shadow-slate-200 ring-1 ring-slate-200">
                  <div className="flex items-center justify-center">
                    <img src={STORAGE_URL + val.image_url} alt={`img/story${i}`} className='w-full h-48 object-cover shadow-md shadow-slate-200 rounded-tl-lg rounded-tr-lg' />
                  </div>
                  <div className="flex items-center justify-between w-full px-4">
                    {/*                     <div className="flex-items-center gap-0.5">
                      <HeartIcon className='icon-style text-red-500 w-5 h-5' /> <span className='text-xs font-bold'>{val.like}</span>
                    </div>
                    <div className="flex-items-center gap-0.5">
                      <ClockIcon className='icon-style w-4 h-4 text-black ' /> <span className='text-xs font-bold'>{val.time}</span>
                    </div>
                    <div className="flex-items-center gap-0.5">
                      <HashtagIcon className='icon-style text-blue-600' /> <span className='text-xs font-bold text-blue-600'>{val.by}</span>
                    </div> */}

                  </div>
                  <div className="grid items-center justify-items-start px-4">
                    <h1 className='text-base font-semibold lg:text-sm'>{val.name}</h1>
                    <p className='text-sm text-justify lg:text-xs h-28 lg:h-24'>{truncate(val.products.map(obj => obj.name).join(', ')
                      , { length: 175 })} and many more ... </p>
                  </div>
                  <div className="flex items-center justify-center px-4 w-full">
                    <button type='button' onClick={() => { handleCategoryClick(val.id) }} className='w-full bg-slate-900 bg-gradient-to-b from-slate-800 to-black shadow-md shadow-black text-center text-slate-100 py-1.5 button-theme'>Explore </button>
                  </div>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </>
  )
}

export default Stories