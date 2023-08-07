import { ChartComponent, SeriesCollectionDirective, SeriesDirective,Inject, DateTime, Legend, SplineAreaSeries, Tooltip } from "@syncfusion/ej2-react-charts"
import { areaPrimaryXAxis, areaPrimaryYAxis, areaCustomSeries } from "../../../../data/dummy"
import { Header } from "../../components"

const Area = () => {
  return (
    <div className='m-10  mt-24 p-10 md:p-5 bg-white rounded-3xl'>

    <Header category="Chart" title="Inflation Rate" />
      <ChartComponent
        id="line-chart"
        height="420px"
        primaryXAxis={areaPrimaryXAxis}
        primaryYAxis={areaPrimaryYAxis}
        chartArea={{ border: {width: 0}}}
        tooltip={{enable: true}}
      >
        <Inject services={[SplineAreaSeries, DateTime, Legend,Tooltip]} />
        <SeriesCollectionDirective>
          {areaCustomSeries.map((item,i)=><SeriesDirective key={i} {...item} />)}
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  )
}

export default Area