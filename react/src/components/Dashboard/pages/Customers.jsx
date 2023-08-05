import React from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, Selection, Toolbar } from '@syncfusion/ej2-react-grids'

import { customersData, customersGrid } from '../../../data/dummy'
import { Header } from '../components'

const Customers = () => {
  return (
    <div className='m-10 mt-20 md:m-2 p-10  md:p-2 bg-white rounded-3xl'>
      <Header category="Page" title="Customers" />
      <GridComponent id='gridcomp'
        dataSource={customersData}
        allowPaging
        allowSorting
        toolbar={['Delete']}
        editSettings={{allowDeleting:true, allowEditing:true}}
        width='auto'>
        <ColumnsDirective>
          {customersGrid.map((item, i) => (
            <ColumnDirective key={i} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page,Selection,Edit,Sort,Filter, ExcelExport,Toolbar, PdfExport]} />
      </GridComponent>
    </div>
  )
}

export default Customers