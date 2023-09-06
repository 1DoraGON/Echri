
const OrderItem = ({ item: { id, name, description, tags, main_image, price, quantity },dark }) => {

  const STORAGE_URL = import.meta.env.VITE_REACT_APP_STORAGE_URL;
  return (
    <div className={`sm:justify-between md:flex-col mb-6 rounded-lg bg-white p-6 shadow-md flex justify-start ${dark? 'dark:bg-secondary-dark-bg' : ''}`}>
      <img src={STORAGE_URL + main_image} alt={`img/cart-item/${id}`} className={`bg-slate-200 md:w-full h-28 self-center md:h-auto rounded-lg w-40 ${dark? 'dark:bg-secondary-dark-bg': ''}`} />
      <div className="ml-4 flex w-full justify-between sm:ml-0 sm:flex-none sm:w-auto">
        <div className="sm:mt-5 mt-0 w-[60%]">
          <h2 className={`text-lg font-bold text-gray-900 ${dark? 'dark:text-gray-200': ''}`}>{name}</h2>
          <div className="flex justify-start items-start w-full flex-wrap">
            {tags?.split('||').map((tag, index) => (
              <div key={index} className="bg-blue-200 p-1 m-1 rounded-lg flex items-center">
                <span className="text-xs">{tag}</span>
              </div>
            ))}
          </div>



          <div className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-500 ${dark? 'dark:bg-main-dark-bg dark:text-gray-200': ''}`}
          >
            {description}
          </div>
        </div>
        <div className="mt-4 sm:flex sm:justify-between sm:space-x-0 sm:space-y-0 space-y-6 sm:mt-0 block space-x-6">
          <div className={`flex-col justify-between  items-center border-gray-100 ${dark? 'dark:border-gray-500': ''}`}>
            <p className={`text-sm font-semibold mb-5 ${dark? 'dark:text-gray-200': ''}`}>Quantity: &nbsp; {quantity}</p>
            <p className={`text-sm font-semibold mt-5 ${dark? 'dark:text-gray-200': ''}`}>{price * quantity} DZD</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default OrderItem