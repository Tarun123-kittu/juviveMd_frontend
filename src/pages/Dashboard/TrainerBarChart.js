import React from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
const options = {
    chart: {
      type: "column"
    },
    title: {
      text: null
    },
    subtitle: {
      text: null
    },
    xAxis: {
      categories: ["Tariner 01", "Tariner 02", "Tariner 03", "Tariner 04", "Tariner 05", "Tariner 06","Tariner 01", "Tariner 02", "Tariner 03", "Tariner 04", "Tariner 05", "Tariner 06"],
      crosshair: true,
      accessibility: {
        description: "Countries"
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: null
      }
    },
    tooltip: {
        enabled: true // Hides tooltip
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [
      {
        name: null,
        data: [387749, 280000, 129000, 64300, 54000, 34300,387749, 280000, 129000, 64300, 54000, 34300],
        color: "rgba(151, 208, 195, 1)" ,
        showInLegend: false // Hides from legend
      }
    ]
  };
const TrainerBarChart = () => {
  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  )
}

export default TrainerBarChart