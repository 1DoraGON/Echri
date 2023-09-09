
const MessageModal = ({text,reference,placeholder, confirmation, handleClose, handleClick,cancelation, handleCancel}) => {
  return (
    <div
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-opacity-80"
    >
      <div className="relative p-4 w-full max-w-2xl">


        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Confim Order
            </h3>
            <button onClick={handleClose} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-6 space-y-6">



            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {text}
            </p>
            <textarea name="" id="" cols="30" rows="3" ref={reference} style={{ resize: 'none' }} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder}></textarea>
          </div>

          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button onClick={handleClick} data-modal-hide="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{confirmation}</button>
            <button onClick={handleCancel} data-modal-hide="defaultModal" type="button" className="text-red-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg border border-red-200 text-sm font-medium px-5 py-2.5 hover:text-red-600 focus:z-10 dark:bg-gray-700 dark:text-red-500 dark:border-gray-500 dark:hover:text-red-600 dark:hover:bg-gray-600 dark:focus:ring-gray-600">{cancelation}</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default MessageModal