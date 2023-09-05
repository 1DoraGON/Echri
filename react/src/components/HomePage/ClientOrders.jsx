import { useEffect, useState } from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids'

import { Header } from '../Dashboard/components'
import axiosClient from '../../api/axios'
import useAuth from '../../hooks/useAuth'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterPage } from '../../app/ProductsSlice'
import { clientOrdersGrid } from '../../data/gridData'
import { truncate } from 'lodash'
import Modal from 'react-modal'
import { toast } from 'react-hot-toast'
import { selectModalIsOpen, selectProductId, setModalIsOpen } from '../../app/ThemeSlice'
import LoadingScreen from '../utils/LoadingScreen'

const ClientOrders = () => {
  const auth = useAuth()
  const dispatch = useDispatch()
  const modalIsOpen = useSelector(selectModalIsOpen)
  const productId = useSelector(selectProductId)
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState([])
  useEffect(() => {
    dispatch(setFilterPage(true))
    const fetchOrders = async () => {
      if (auth) {
        await axiosClient.get('/api/user/orders').then(response => {
          const data = response.data.data
          const transformedData = data.map((order) => ({
            id: parseInt(order.id),
            total_quantity: order.products.length,
            total_price: parseFloat(order.total_price),
            status: order.status,
            products: truncate(order.products.map(product => product.name), 50),
            created_at: order.created_at, // Keep the original value for sorting
          }));
          
          setOrders(transformedData)
          setIsLoading(false)
          console.log(response);
        })
      }
    }
    fetchOrders()
  }, [])


  const handleDelete = async (productId) => {

    await axiosClient.delete('/api/user/orders/' + productId).then((response) => {

      toast.success(response.data.message)
      dispatch(setModalIsOpen(false))
      const filterdedData = orders.filter((order) => order.id !== productId)
      setOrders(filterdedData)

      console.log(response);

      return true;
    }).catch((err) => {
      console.log(err);

      toast.error('Oops! Somthing went wrong!')
    })

  }
  return (
    <div className='m-10 mt-20 md:m-2 p-10 min-h-screen  md:p-2 bg-gray-100 rounded-3xl'>
      {isLoading && (
        <LoadingScreen />
      )}
      <Header category="Page" title="Orders" />
      <GridComponent id='gridcomp' dataSource={orders}
        allowPaging allowSorting>
        <ColumnsDirective>
          {clientOrdersGrid.map((item, i) => (
            <ColumnDirective key={i} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
      </GridComponent>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => dispatch(setModalIsOpen(false))}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent dark overlay
            zIndex: 1000, // Set a higher z-index to overlay above other content
          },
          content: {
            width: '400px',
            height: '160px',
            margin: 'auto',
            background: '#f3f4f6',
            borderRadius: '8px',
            zIndex: 1001, // Set a z-index higher than the overlay
          },
        }}
      >
        <h2 className="text-center">{productId ? 'Are you sure you want to delete product' : 'Are you sure you want to delete products?'} <span className='font-semibold'>{productId ? productId.name : ''}</span> </h2>
        <div className="absolute right-2 bottom-2">

          <button
            onClick={() => { handleDelete(productId.id, false) }}
            className=" mr-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-24"
          >
            Delete
          </button>
          <button
            onClick={() => dispatch(setModalIsOpen(false))}
            className=" ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-24"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default ClientOrders