import React from 'react'

const ShowMessageModal = ({message,title,toggleModal,cancelation,confirmation,handleCancel,handleClick}) => {
  return (
    <div>

      <div
        tabIndex="-1"
        aria-hidden="true"
        className="fixed inset-0 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-opacity-80"
      >
        <div className="relative p-4 w-full max-w-2xl">

          <div className="relative bg-white rounded-lg shadow ">

            <div className="flex items-start justify-between p-4 border-b rounded-t ">
              <h3 className="text-xl font-semibold text-gray-900 ">
                {title}
              </h3>
              <button onClick={toggleModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center" data-modal-hide="defaultModal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-base leading-relaxed text-gray-500">
                {message}
              </p>
            </div>

            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button onClick={handleClick} data-modal-hide="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{confirmation}</button>
              <button onClick={handleCancel} data-modal-hide="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">{cancelation}</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ShowMessageModal