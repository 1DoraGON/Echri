import { ChartComponent, SeriesCollectionDirective, SeriesDirective,Inject, DateTime, Legend, Tooltip, LineSeries } from "@syncfusion/ej2-react-charts"
import { LinePrimaryXAxis, LinePrimaryYAxis, lineCustomSeries } from "../../../../data/dummy"

const LineChart = () => {
  return (
    <div>
      <ChartComponent
        id="line-chart"
        height="420px"
        primaryXAxis={LinePrimaryXAxis}
        primaryYAxis={LinePrimaryYAxis}
        chartArea={{ border: {width: 0}}}
        tooltip={{enable: true}}
      >
        <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
        <SeriesCollectionDirective>
          {lineCustomSeries.map((item,i)=><SeriesDirective key={i} {...item} />)}
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  )
}

export default LineChart