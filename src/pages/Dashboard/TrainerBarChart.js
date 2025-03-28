import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const TrainerBarChart = ({ trainerChatResponseReportData }) => {
  const trainerNames = trainerChatResponseReportData?.map((item) => item.trainerName);
  // const trainerResponseTimes = trainerChatResponseReportData?.map((item) => Number(item.avgResponseTime));
  const trainerResponseTimes = trainerChatResponseReportData?.map((item) => Math.floor(parseFloat(item.avgResponseTime))) || [];
  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: null,
    },
    subtitle: {
      text: null,
    },
    xAxis: {
      categories: trainerNames,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Response Time (minutes)", // Show minutes on Y-axis
      },
      labels: {
        formatter: function () {
          return (this.value / 60).toFixed(2); // Convert seconds to minutes
        }
      }
    },
    tooltip: {
      formatter: function () {
        return `${this.y} sec`; // Show seconds in tooltip
      }
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        pointWidth: 30,
        borderWidth: 0,
      },
    },
    series: [
      {
        data: [trainerResponseTimes],
        color: "rgba(151, 208, 195, 1)",
        showInLegend: false,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default TrainerBarChart;
