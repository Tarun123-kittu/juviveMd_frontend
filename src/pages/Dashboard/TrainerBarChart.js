import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const TrainerBarChart = ({ trainerChatResponseReportData }) => {
  // Get trainer names
  const trainerNames = trainerChatResponseReportData?.map((item) => item.trainerName) || [];

  // Get average response times in seconds for the trainers
  const trainerResponseTimes = trainerChatResponseReportData?.map((item) => {
    return Math.floor(parseFloat(item.avgResponseTime)) || 0; // Ensure each value is a number
  }) || [];
  
  // Log trainer response times for debugging
  console.log(trainerResponseTimes, "trainerResponseTimes");

  // Chart options
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
        text: "Response Time (seconds)", // Show seconds on Y-axis for clarity
      },
      labels: {
        formatter: function () {
          return (this.value / 60).toFixed(2); // Convert seconds to minutes
        }
      }
    },
    tooltip: {
      formatter: function () {
        return `${Math.floor(this.y / 60)} min ${this.y % 60} sec`;

      },
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
        name: "Average Response Time", // Add a name for clarity in the legend
        data: trainerResponseTimes, // Use the array of seconds directly for plotting
        color: "rgba(151, 208, 195, 1)",
        showInLegend: false,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default TrainerBarChart;