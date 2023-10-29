import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { setFilterPage } from "../../app/ProductsSlice"
import axiosClient from "../../api/axios"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import { setAddItemToCart, setQTY } from "../../app/CartSlice"
import LoadingScreen from "../utils/LoadingScreen"
import EmptyProduct from "../utils/Empty/EmptyProduct"

const Product = () => {
  const STORAGE_URL = import.meta.env.VITE_REACT_APP_STORAGE_URL;
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const [isLoading, setIsLoading] = useState(true)

  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const messageRef = useRef()
  const [product, setProduct] = useState({})
  const { id } = useParams()
  const navigate = useNavigate()
  const splideOptions = {
    perPage: 1,
    perMove: 1,
    //type: 'loop',
    rewind: true,
    keyboard: 'global',
    gap: '1rem',
    pagination: false,
    padding: '2rem',
    breakpoints: {
      1200: { perPage: 1 },
      991: { perPage: 1 },
      768: { perPage: 1 },
      500: { perPage: 1 },
      425: { perPage: 1 },
    },
  };


  useEffect(() => {
    dispatch(setFilterPage(true))
    const fetchProduct = async () => {
      await axiosClient.get('/api/products/' + id).then(response => {
        console.log(response);
        setProduct(response.data.data)
        console.log(response.data.data.images.length);
      }).catch(err => {
        console.log(err);
        if (err.response.status === 404) {
          navigate('/products')
        }
        toast.error('Oops! Something went wrong, please try later.')
      })
      setIsLoading(false)
    }
    fetchProduct()

  }, [])



  const onAddToCart = () => {
    setButtonDisabled(true)
    const item = {
      id: product.id,
      name: product.name,
      tags: product.tags,
      main_image: product.main_image,
      price: product.price,
      message: messageRef.current.value
    }
    console.log(item);
    /*         color: "from-blue-600 to-blue-500",
    shadow: "shadow-lg shadow-blue-500", */
    dispatch(setAddItemToCart(item))
    dispatch(setQTY({ id: product.id, QTY: quantity }))
    setTimeout(() => {
      setButtonDisabled(false);
    }, 2000);
  }
  return (
    <>
      {isLoading ? (
        <>
          <LoadingScreen />
          <EmptyProduct />
        </>
      ) : (
          <section className="text-gray-700 body-font overflow-hidden bg-white">
            <div className="container px-5 py-24 mx-auto">
              <div className="w-4/5 lg:w-full mx-auto flex flex-wrap items-center">
                <Splide className='w-1/2 lg:w-full' options={splideOptions}>

                  <SplideSlide className="flex items-center">
                    <img alt="ecommerce" className="w-full object-cover object-center rounded border border-gray-200" src={STORAGE_URL + product.main_image} />
                  </SplideSlide>
                  {product.images !== undefined && product.images?.length > 0 &&
                    product.images?.map((image, index) => (

                      <SplideSlide key={index} className="flex items-center">
                        <img alt="ecommerce" className="w-full object-cover object-center rounded border border-gray-200" src={STORAGE_URL + image} />
                      </SplideSlide>
                    ))}
                </Splide>
                <div className="w-1/2 lg:w-full pl-10 py-6 lg:mt-6 mt-0">
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.category}</h2>
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.name}</h1>
                  <div className="flex mb-4">
                    <span className="flex items-center">
                      <span className="text-gray-500 text-sm ml-3">Added At: {new Date(product.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}</span>
                    </span>
                    {/*                 <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span> */}
                  </div>
                  <p className="leading-relaxed border-b-2 border-gray-200 pb-5">{product.description}</p>
                  <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                    <span className="mr-3">Tags: </span>
                    <div className="ml-6 flex justify-start items-start w-full flex-wrap">
                      {product.tags?.split('||').map((tag, index) => (
                        <div key={index} className="bg-blue-200 p-1 m-1 rounded-lg flex items-center">
                          <span className="text-xs">{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex mt-6 items-center justify-between pb-5 border-b-2 border-gray-200 mb-5">

                    <div className="flex ml-6 items-center">
                      <span className="mr-3">Quantity</span>
                      <div className="flex items-center border-gray-100">
                        <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => { quantity > 1 ? setQuantity(prev => prev - 1) : null }}> - </span>
                        <input onChange={(e) => {
                          const newValue = parseInt(e.target.value) || 1;
                          setQuantity(newValue > 0 ? newValue : 1); // Ensure it's not negative
                        }} value={quantity} className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" min="1" />
                        <span onClick={() => { setQuantity(prev => prev + 1) }} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                      </div>
                    </div>
                    <span
                      className="border-l-2 border-gray-200 h-6"
                      style={{ marginLeft: "10px", marginRight: "10px" }}
                    ></span>
                    <div className="flex ml-6 items-center">
                      <span className="mr-3">Total Price:</span>
                      <span className="mr-3 font-semibold text-sm">{product.price * quantity}.00 DZD</span>
                    </div>
                  </div>
                  <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">

                    <textarea ref={messageRef} rows="2" style={{ resize: 'none' }} id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-500" placeholder="Describe your order, (size, color ...)"></textarea>
                  </div>
                  <div className="flex">
                    <span className="title-font font-medium text-2xl text-gray-900">{product.price} DZD</span>
                    <button onClick={onAddToCart} className={`flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isButtonDisabled}>Add to cart</button>
                    {/*                 <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button> */}
                  </div>
                </div>
              </div>
            </div>
          </section>

      )}

    </>
  )
}

export default Product