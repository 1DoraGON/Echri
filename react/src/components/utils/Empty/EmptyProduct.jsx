import React from 'react'

const EmptyProduct = () => {
  return (
    <div>
      <section className="animate-pulse text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="w-4/5 lg:w-full mx-auto flex flex-wrap items-center">
            <div className='w-1/2 lg:w-full'>

              <div className="flex items-center">
                <div alt="ecommerce" className="w-full h-[500px] bg-slate-200 object-cover object-center rounded border border-gray-200" />
              </div>
            </div>
            <div className="w-1/2 lg:w-full pl-10 py-6 lg:mt-6 mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest"></h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1"></h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <span className="text-gray-400 text-sm ml-3 bg-gray-400 rounded-xl w-32 h-5"></span>
                </span>
              </div>
              <p className="leading-relaxed border-b-2 border-gray-200 pb-5"></p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <span className="mr-3 bg-gray-400 rounded-xl w-16 h-5"></span>
                <div className="ml-6 flex justify-start items-start w-full flex-wrap">

                  <div className="bg-blue-200 w-16 h-5 p-1 m-1 rounded-lg flex items-center">
                    <span className="text-xs"></span>
                  </div>
                  <div className="bg-blue-200 w-16 h-5 p-1 m-1 rounded-lg flex items-center">
                    <span className="text-xs"></span>
                  </div>

                </div>
              </div>
              <div className="flex mt-6 items-center justify-between pb-5 border-b-2 border-gray-200 mb-5">

              <div className="bg-gray-400 rounded-xl w-full h-20"></div>

              </div>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">

                <div className="bg-gray-400 rounded-xl w-full h-20"></div>
              </div>
              <div className="flex">
                <button className={`flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded  w-28 h-10`}></button>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EmptyProduct