import { Header, LineChart } from "../../components"

const Line = () => {
  return (
    <div className='m-10  mt-24 p-10 md:p-5 bg-white rounded-3xl'>

      <Header category="Chart" title="Inflation Rate" />
      <div className="w-full">
        <LineChart />
      </div>
    </div>
  )
}

export default Line