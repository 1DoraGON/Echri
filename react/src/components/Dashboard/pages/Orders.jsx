import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids'

import { ordersData, contextMenuItems, ordersGrid } from '../../../data/dummy'
import { Header } from '../components'

const Orders = () => {
  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className='m-10 mt-20 md:m-2 p-10  md:p-2 bg-white rounded-3xl'>
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

export default Orders