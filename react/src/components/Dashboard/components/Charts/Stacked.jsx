import { Category, ChartComponent, Inject, Legend, SeriesCollectionDirective, SeriesDirective, StackingColumnSeries, Tooltip } from "@syncfusion/ej2-react-charts"
import { stackedCustomSeries, stackedPrimaryXAxis, stackedPrimaryYAxis } from "../../../../data/dummy"
const Stacked = ({ width, height }) => {

  return (
    <ChartComponent
      width={width}
      height={height}
      id="charts"
      primaryXAxis={stackedPrimaryXAxis}
      primaryYAxis={stackedPrimaryYAxis}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      legendSettings={{background:'white'}}
    >
      <Inject services={[Legend, Category, StackingColumnSeries, Tooltip]} />
      <SeriesCollectionDirective >
        {stackedCustomSeries.map((item, i) => <SeriesDirective key={i} {...item} />)}
      </SeriesCollectionDirective>
    </ChartComponent>
  )
}

export default Stacked