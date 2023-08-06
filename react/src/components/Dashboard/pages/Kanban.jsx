import { KanbanComponent, ColumnDirective, ColumnsDirective } from '@syncfusion/ej2-react-kanban'
import { Header } from '../components'
import { kanbanData, kanbanGrid } from '../../../data/dummy'

const Kanban = () => {
  return (
    <div className='m-10  mt-24 p-10 md:p-5 bg-white rounded-3xl'>
      <Header category='App' title='Kanban' />
      <KanbanComponent 
       id='kanban'
       dataSource={kanbanData}
       cardSettings={{contentField: 'Summary', headerField: 'Id'}}
       keyField='Status'
       >
        <ColumnsDirective>
          {kanbanGrid.map((item, i) => (
            <ColumnDirective key={i} {...item} />
          ))}
        </ColumnsDirective>
      </KanbanComponent>
    </div>
  )
}

export default Kanban