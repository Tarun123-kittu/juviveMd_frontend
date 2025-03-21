import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const options = {
  chart: {
    type: "pie"
  },
  title: {
    text: null
  },
  tooltip: {
    pointFormat: "<b>{point.name}:</b> {point.y} ({point.percentage:.1f}%)"
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: false // Hides labels inside the pie
      },
      showInLegend: true // Shows legend separately
    }
  },
  legend: {
    layout: "vertical",
    align: "center",
    verticalAlign: "bottom",
    symbolRadius: 5, // Circular legend icons
    symbolWidth: 10,
    labelFormatter: function () {
      return `${this.name} - ${this.y}`; // Displays name with value
    },
    itemStyle: {
      fontWeight: "normal",
      fontSize: "14px"
    }
  },
  series: [
    {
      name: "Patients",
      colorByPoint: true,
      data: [
        { name: "Total Patient", y: 200, color: "rgba(20, 184, 166, 1)" }, // Teal
        { name: "Active Patient", y: 100, color: "rgba(114, 114, 255, 1)" }, // Blue-Violet
        { name: "Regular Present", y: 50, color: "rgba(135, 255, 114, 1)" }, // Green
        { name: "Irregular Present", y: 50, color: "rgba(255, 131, 150, 1)" } // Red
      ]
    }
  ]
};

export default function UserActivityChart() {
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
