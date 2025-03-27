import React from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const TrainerBarChart = ({ trainerChatResponseReportData }) => {
  const trainerNames = trainerChatResponseReportData?.map((item) => item.trainerName) || [];
  const trainerResponseTimes = trainerChatResponseReportData?.map((item) => Math.floor(parseFloat(item.avgResponseTime))) || [];
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
      categories: trainerNames,
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
        data: trainerResponseTimes,
        color: "rgba(151, 208, 195, 1)",
        showInLegend: false // Hides from legend
      }
    ]
  };
  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  )
}

export default TrainerBarChart