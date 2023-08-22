import { useDispatch, useSelector } from "react-redux"
import { fetchProducts, selectCurrentPage, selectLastPage, selectParams, setCurrentPage, setLoading, setParams } from "../../app/ProductsSlice"

const Pagination = () => {

  const currentPage = useSelector(selectCurrentPage)
  const lastPage = useSelector(selectLastPage)
  const params = useSelector(selectParams)
  const dispatch = useDispatch()

  const handlePageChange = (e, page) => {
    e.preventDefault()
    console.log(page);
    if (page !== currentPage && page <= lastPage) {

      dispatch(setLoading(true))
      dispatch(fetchProducts({ ...params, page: page }))
      console.log(params);
    }
  }

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-base h-10">
          <li>
            <a onClick={(e) => currentPage - 1 > 0 ? handlePageChange(e, currentPage - 1) : {}} role="button" className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">Previous</a>
          </li>
          {/* Generate pagination links */}
          {Array.from({ length: 8 }, (_, index) =>
            index + 1 <= lastPage ? ( // Check if index is within the valid range
              <>
                <li key={index}>
                  <a
                    onClick={(e) => handlePageChange(e, index + 1)} // Assuming index is 0-based
                    role="button"
                    className={`flex items-center justify-center border border-gray-300 px-4 h-10 ${currentPage === index + 1
                      ? "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                      : "leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 "
                      }`}
                  >
                    {index + 1}
                  </a>
                </li>

              </>
            ) : null // If index is out of range, render nothing
          )}



          {currentPage < lastPage && currentPage <= 8 && lastPage > 9 && (
            <>
              <li>
                <a onClick={(e) => handlePageChange(e, currentPage + 1)} role="button" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">9</a>
              </li>
            </>
          )

          }

          {currentPage < lastPage && currentPage > 8 && (
            <>

              <li>
                <a onClick={(e) => { handlePageChange(e, currentPage) }} role="button" aria-current="page" className="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 ">{currentPage}</a>
              </li>
              <li>
                <a onClick={(e) => handlePageChange(e, currentPage + 1)} role="button" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">{currentPage + 1}</a>
              </li>
            </>
          )

          }
          {currentPage < lastPage && currentPage <= 8 && lastPage > 9 && (
            <>
              <li>
                <a onClick={(e) => handlePageChange(e, currentPage + 1)} role="button" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">10</a>
              </li>
            </>
          )

          }
          {currentPage === lastPage && currentPage > 8 && (
            <>
              <li>
                <a onClick={(e) => handlePageChange(e, currentPage - 1)} role="button" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">{currentPage - 1}</a>
              </li>

              <li>
                <a onClick={(e) => { handlePageChange(e, currentPage) }} role="button" aria-current="page" className="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 ">{currentPage}</a>
              </li>
            </>
          )

          }
          <li>
            <a onClick={(e) => handlePageChange(e, currentPage + 1)} role="button" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">Next</a>
          </li>
        </ul>
      </nav>


    </div>
  )
}

export default Pagination