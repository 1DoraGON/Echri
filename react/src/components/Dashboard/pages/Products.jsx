import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids'

import { productsData, contextMenuItems, productsGrid } from '../../../data/dummy'
import { Header } from '../components'
import { useEffect, useState } from 'react'
import axiosClient from '../../../api/axios'

const Products = () => {
  const [loading,setLoading] = useState(true)
  const [productsData,setProductsData] = useState([])
  const editing = { allowDeleting: true, allowEditing: true };
  useEffect( ()=>{
    async function fetchData(){
      await axiosClient.get('/api/products').then((response) => {
        const data = response.data.data
        
        data.map((product,i)=>{
          const item ={
            id: product.id,
            name: product.name,
        
            price: product.price,
            stock: product.stock,
            category_id: product.category,
            created_at: product.created_at,
        
            ProductImage: 'http://127.0.0.1:8000/storage/'+product.main_image,
          }
          setProductsData((prev)=>[...prev,item])
        })
        setLoading(false)
      })

    }
    fetchData()
  },[])
  if(loading) {
    return;
  }
  return (
    <div className='m-10 mt-20 md:m-2 p-10  md:p-2 bg-white rounded-3xl'>
      <Header category="Page" title="Products" />
      <GridComponent id='gridcomp' dataSource={productsData}
        allowPaging allowSorting>
        <ColumnsDirective>
          {productsGrid.map((item, i) => (
            <ColumnDirective key={i} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Resize,Sort,ContextMenu,Filter,Page,ExcelExport,Edit,PdfExport]} />
      </GridComponent>
    </div>

  )
}

export default Products