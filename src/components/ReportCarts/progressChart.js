import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ProgressChart = ({months,strengthData,weightLiftedData,cardioData,reportType}) => {
  console.log("ProgressChartAllData--",months,"strength--",strengthData,"weightLifted--",weightLiftedData,"cardioData--",cardioData,"reportType",reportType)


  const formatCategories = (categories, reportType) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    return categories?.map(date => {
      if (reportType === "monthly") {
        // Convert "2025-03" → "Mar 2025"
        const [year, month] = date.split("-");
        return `${monthNames[parseInt(month, 10) - 1]} ${year}`; 
      } else if (reportType === "weekly") {
        // Convert "2025-Week10" → "Week 10, 2025"
        const [year, week] = date.split("-");
        return `Week ${week.replace("Week", "")}, ${year}`;
      } else if (reportType === "daily") {
        // Convert "2025-03-06" → "06 Mar 2025"
        const [year, month, day] = date.split("-");
        return `${day} ${monthNames[parseInt(month, 10) - 1]} ${year}`;
      }
      return date; // Default case
    });
  };


  const chartConfig = {
    title: {
      text: ""
    },
    xAxis: {
      categories: formatCategories(months, reportType)
    },
    yAxis: [
      {
        title: { text: "Strength / Cardio (min)" },
        min: 0, 
        opposite: false,
        alignTicks: false // Prevents scaling issues
      },
      {
        title: { text: "Weight Lifted (kg)" },
        min: 0,
        opposite: true, // Places it on the right side
        alignTicks: false // Ensures independent scaling
      }
    ],
    series: [
      {
        name: "Strength",
        data: strengthData ? strengthData[0].map(value => Math.round(value)) : [],
        color: "#FF5733",
        yAxis: 0 // Assign to the first y-axis
      },
      {
        name: "Weight Lifted",
        data: weightLiftedData ? weightLiftedData[0].map(value => Math.round(value)) : [],
        color: "#33FF57",
        yAxis: 1 // Assign to the second y-axis
      },
      {
        name: "Cardio",
        data: cardioData ? cardioData[0].map(value => Math.round(value)) : [],
        color: "#3357FF",
        yAxis: 0 // Assign to the first y-axis
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
      shared: true,
      backgroundColor: "rgba(12, 94, 98, 1)",  
      style: {
        color: "#fff",
        fontWeight: "bold"
      }
    },
    credits: {
      enabled: false
    }
  };

  return <HighchartsReact highcharts={Highcharts} options={chartConfig} />;
};

export default ProgressChart;
