import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PerformanceChart = () => {
  const chartConfig = {
    title: {
      text: null
    },
    xAxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct", "Nov", "Dec"
      ]
    },
    yAxis: {
      title: {
        text: "Weight"
      }
    },
    series: [
      {
        name: "Weight",
        data: [10, 15, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70],
        color: "#FF5733",
        fontWeight: "bold"
      }
    ],
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: "{y}"
        }
      }
    },
    chart: {
      type: "line"
    },
    tooltip: {
        backgroundColor: "rgba(12, 94, 98, 1)",  // Custom tooltip background color
        style: {
          color: "#fff",  // Text color
          fontWeight: "bold"
        }
      },
    credits: {
      enabled: false
    }
  };

  return <HighchartsReact highcharts={Highcharts} options={chartConfig} />;
};

export default PerformanceChart;
