import React, { useEffect } from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids'

import { ordersData, contextMenuItems, ordersGrid } from '../../data/dummy'
import { Header } from '../Dashboard/components'
import axiosClient from '../../api/axios'
import useAuth from '../../hooks/useAuth'
import { useDispatch } from 'react-redux'
import { setFilterPage } from '../../app/ProductsSlice'

const ClientOrders = () => {
  const auth = useAuth()
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(setFilterPage(true))
    const fetchOrders = async ()=>{
      if(auth){
        await axiosClient.get('/api/user/orders').then(response=>{
          console.log(response);
        })
      }
    }
    fetchOrders()
  },[])
  return (
    <div className='m-10 mt-20 md:m-2 p-10  md:p-2 bg-gray-100 rounded-3xl'>
    <Header category="Page" title="Orders" />
    <GridComponent id='gridcomp' dataSource={ordersData}
      allowPaging allowSorting>
      <ColumnsDirective>
        {ordersGrid.map((item, i) => (
          <ColumnDirective key={i} {...item} />
        ))}
      </ColumnsDirective>
      <Inject services={[Resize,Sort,ContextMenu,Filter,Page,ExcelExport,Edit,PdfExport]} />
    </GridComponent>
  </div>
  )
}

export default ClientOrders