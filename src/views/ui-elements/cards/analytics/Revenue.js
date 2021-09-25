import React from "react"
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap"
import Chart from "react-apexcharts"
import { Settings } from "react-feather"

let $primary = "#7367F0",
  $success = "#28C76F",
  $danger = "#EA5455",
  $warning = "#FF9F43",
  $info = "#00cfe8",
  $primary_light = "#9c8cfc",
  $warning_light = "#FFC085",
  $danger_light = "#f29292",
  $info_light = "#1edec5",
  $stroke_color = "#b9c3cd",
  $label_color = "#e7eef7",
  $purple = "#df87f2",
  $white = "#fff"

class Revenue extends React.Component {
  state = {
    options: {
      chart: {
        toolbar: {
          show: false
        },
        animations: {
          enabled: false
        }
      },
      stroke: {
        curve: "smooth",
        dashArray: [0, 8],
        width: [4, 2]
      },
      grid: {
        borderColor: $label_color
      },
      legend: {
        show: false
      },
      colors: [$danger_light, $stroke_color],

      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          inverseColors: false,
          gradientToColors: [$primary, $stroke_color],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      },
      markers: {
        size: 0,
        hover: {
          size: 5
        }
      },
      xaxis: {
        labels: {
          style: {
            colors: $stroke_color
          }
        },
        axisTicks: {
          show: false
        },
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Des"],
        axisBorder: {
          show: false
        },
        tickPlacement: "on"
      },
      yaxis: {
        tickAmount: 5,
        labels: {
          style: {
            color: $stroke_color
          },
          formatter: val => {
            // return val > 999 ? (val / 1000).toFixed(1) + "k" : val
            return val > 999999 ? (val / 1000000).toFixed(0) + " kk" : val
          }
        }
      },
      tooltip: {
        x: { show: false }
      }
    },
    series: [
      {
        name: "This Month",
        data: [4500000000, 4700000000]
      },
      {
        name: "Last Month",
        data: [4600000000, 4800000000]
      },
    ]
  }
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Revenue</CardTitle>
          <Settings size={20} className="cursor-pointer text-muted" />
        </CardHeader>
        <CardBody>
          <div className="d-flex justify-content-start mb-1">
            <div className="mr-2">
              <p className="mb-50 text-bold-600">This Month</p>
              <h2 className="text-bold-400">
                <sup className="font-medium-1 mr-50">$</sup>
                <span className="text-success">86,589</span>
              </h2>
            </div>
            <div>
              <p className="mb-50 text-bold-600">Last Month</p>
              <h2 className="text-bold-400">
                <sup className="font-medium-1 mr-50">$</sup>
                <span>73,683</span>
              </h2>
            </div>
          </div>
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height={260}
          />
        </CardBody>
      </Card>
    )
  }
}
export default Revenue
