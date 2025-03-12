import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ProgressChart = ({months,strengthData,weightLiftedData,cardioData,reportType}) => {
  console.log("ProgressChartAllData--",months,strengthData,weightLiftedData,cardioData,reportType)


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
    yAxis: {
      title: {
        text: "Weight"
      }
    },
    series: [
      {
        name: "Strength",
        data:strengthData,
        color: "#FF5733",
        fontWeight: "bold"
      },
      {
        name: "Weight Lifted",
        data: weightLiftedData,
        color: "#33FF57" // Green color for distinction
      },
      {
        name: "Cardio",
        data: cardioData,
        color: "#3357FF" // Blue color for distinction
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

export default ProgressChart;
