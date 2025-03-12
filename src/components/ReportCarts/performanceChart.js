import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PerformanceChart = ({patientWeightReportData,patientId,months,averageWeight}) => {
  console.log("WeightReport--",patientWeightReportData,patientId)
  console.log("months--",months)
   
  const chartConfig = {
    title: {
      text: null
    },
    xAxis: {
      categories: 
        months
      
    },
    yAxis: {
      title: {
        text: "Weight"
      }
    },
    series: [
      {
        name: "Weight",
        data: averageWeight,
        color: "#FF5733",
        fontWeight: "bold"
      },
      
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
