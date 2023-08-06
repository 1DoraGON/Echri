import { GridComponent, ColumnsDirective, ColumnDirective, Page, ExcelExport, PdfExport, Search, Inject, Toolbar } from '@syncfusion/ej2-react-grids'

import { employeesData, employeesGrid } from '../../../data/dummy'
import { Header } from '../components'

const Employees = () => {
  

  return (
    <div className='m-10 mt-20 md:m-2 p-10  md:p-2 bg-white rounded-3xl'>
      <Header category="Page" title="Employees" />
      <GridComponent id='gridcomp'
        dataSource={employeesData}
        allowPaging
        allowSorting
        toolbar={['Search']}
        width='auto' >
        <ColumnsDirective>
          {employeesGrid.map((item, i) => (
            <ColumnDirective key={i} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, ExcelExport, Search,Toolbar, PdfExport]} />
      </GridComponent>
    </div>
  )
}

export default Employees