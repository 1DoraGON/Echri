import { useDispatch } from 'react-redux'
import { setAddItemToCart } from '../../app/CartSlice'
import { truncate } from 'lodash';
import { useNavigate } from 'react-router-dom';

const Item = ({
    id,
    name,
    description,
    tags,
    main_image,
    price,
}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onAddToCart = () => {
        const item = {
            id,
            name,
            tags,
            main_image,
            price,
        }
        console.log(item);
        /*         color: "from-blue-600 to-blue-500",
        shadow: "shadow-lg shadow-blue-500", */
        dispatch(setAddItemToCart(item))
    }
    const STORAGE_URL = import.meta.env.VITE_REACT_APP_STORAGE_URL;

    //const STORAGE_URL = 'http://127.0.0.1:8000/storage/'
    return (

        <div onClick={()=>{navigate('/products/'+id)}} className="cursor-pointer max-w-sm bg-blue-100 shadow-lg rounded-lg overflow-hidden my-10 transition-all duration-700 ease-in-out w-full hover:scale-105">
            <div className="px-4 py-2">
                <h1 className="text-gray-900 font-bold text-xl lg:text-lg lg:leading-5 leading-5 lg:h-16 h-14 uppercase">{truncate(name, { length: 50 })}</h1>
                <p className="text-gray-600 leading-3 h-12 text-sm mt-1">{truncate(description, { length: 70 })}</p>
            </div>
            <img className="h-56 w-full object-cover mt-2" src={STORAGE_URL+main_image} alt={name} />
                <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
                    <h1 className="text-gray-200 font-bold text-xl">DZD {price}</h1>
                    <button  onClick={onAddToCart} className="px-3 py-1 bg-blue-100 hover:bg-white text-sm text-gray-900 font-semibold rounded">Add to card</button>
                </div>
        </div>

    )
}

export default Item


{/* <div className="flex flex-col justify-center items-center w-[28rem] h-auto mx-auto my-8">
<div style={{backgroundImage: `url(${STORAGE_URL+main_image})`}}
    className="bg-gray-300 h-64 w-full rounded-lg shadow-md bg-cover bg-center"></div>
<div className="w-56 md:w-64 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden">
    <div className="py-2 text-center font-bold uppercase tracking-wide text-gray-800">Nike Revolt</div>
    <div className="flex items-center justify-between py-2 px-3 bg-blue-200">
        <h1 className="text-gray-800 font-bold ">$129</h1>
        <button className=" bg-blue-800 text-xs text-white px-2 py-1 font-semibold rounded uppercase hover:bg-gray-700">Add to cart</button>
    </div>
</div>
</div> */}


/*     <>
        <div className={`relative bg-gradient-to-b from-blue-600 to-blue-500 shadow-lg shadow-blue-500 grid items-center ${ifExists? 'justify-items-start' : 'justify-items-center'}  rounded-xl py-4 px-5 transition-all duration-700 ease-in-out w-full hover:scale-105`}>
            <div className={`grid items-center ${ifExists? 'justify-items-start' : 'justify-items-center'} `}>
                <h1 className='text-slate-200 text-xl lg:text-lg md:text-base font-medium filter drop-shadow'>{name}</h1>
                <p className='text-slate-200 filter drop-shadow text-base md:text-sm font-normal'>{description}</p>
                <div className="flex items-center justify-between w-28 my-2">
                    <div className="flex items-center bg-white/80 px-1 rounded blur-effect-theme">
                        <h1 className='text-black text-sm font-medium'>${price}</h1>
                    </div>
                    <div className="flex items-center gap-1">
                        <StarIcon className='icon-style w-5 h-5 md:w-4 md:h-4' />
                        <h1 className='font-normal md:text-sm text-slate-100 '>5</h1>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button type='button' className='bg-white/90 blur-effect-theme button-theme p-0.5 shadow shadow-sky-200'><ShoppingBagIcon className='icon-style text-slate-900' onClick={onAddToCart} /></button>
                    <button type='button' className='bg-white/90 blur-effect-theme button-theme p-0.5 shadow shadow-sky-200 text-sm text-black px-2 py-1'>Buy Now </button>
                </div>
            </div>
            <div className={`flex items-center ${ifExists? 'absolute top-5 right-1' : 'justify-center'} `}>
                <img src={STORAGE_URL + main_image} alt={`img/item-img${id}`}
                className={` transitions-theme hover:-rotate-12 ${ifExists? 'h-auto w-64 lg:w-56 md:w-48 -rotate-[35deg]' : 'h-36 w-64'} `} />
            </div>
        </div>
    </> */