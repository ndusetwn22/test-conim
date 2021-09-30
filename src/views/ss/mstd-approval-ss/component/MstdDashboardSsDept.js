import React from "react"
import { api_query } from "../../../../api/ApiConstant"
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Badge,
  Input,
  Button,
  Row,
  Col,
  Label,
  FormGroup
} from "reactstrap"
import * as Icon from "react-feather"
import StatisticsCard from "../../../../components/@vuexy/statisticsCard/StatisticsCard"
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb"
// import StatisticsCard from "../../../../../"
import DataTable from "react-data-table-component"
import Flatpickr from "react-flatpickr";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { Star, Search,
    Edit,
    Trash,
    ChevronDown,
    Plus,
    Check,
    ChevronLeft,
    ChevronRight } from "react-feather"
import axios from 'axios'
// import ModalDigimon from "./ModalDigimon"
// import { history } from "../../../src/history"
import { history } from "../../../../../src/history"
import Spinner from "../../../../components/@vuexy/spinner/Fallback-spinner"
import ReactExport from "react-data-export";
import Chart from "react-apexcharts"
import { Settings } from "react-feather"
import Select from "react-select"


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const CustomHeader = props => {
  return (
    // <div className="d-flex flex-wrap justify-content-between">
    <div className="d-flex flex-wrap justify-content-between">
      {/* <div className="add-new">
        <Button.Ripple color="none" className="bg-gradient-success" onClick={() => props.tarikData()}>Add New</Button.Ripple>
      </div> */}
      <ExcelFile filename={"SS Online"} element={<Button color="none" className="bg-gradient-success">Download xlsx</Button>}>
                <ExcelSheet data={props.dataCsv} name="List SS">
                    <ExcelColumn label="Nomor SS" value="nomor_ss"/>
                    <ExcelColumn label="Nama pengusul" value="pengusul_1"/>
                    <ExcelColumn label="Nama pengusul 2" value="pengusul_2"/>
                    <ExcelColumn label="Departemen Pengusul" value="nama_departemen"/>
                    <ExcelColumn label="Tema" value="tema"/>
                    <ExcelColumn label="Lokasi" value="lokasi"/>
                    <ExcelColumn label="Departemen SS" value="departement_terdampak"/>
                    {/* <ExcelColumn label="Kondisi Sebelum" value="kondisi_sebelum"/> */}
                    {/* <ExcelColumn label="Kondisi Sesudah" value="kondisi_sesudah"/> */}
                    <ExcelColumn label="Permasalahan" value="permasalahan"/>
                    <ExcelColumn label="Improvement" value="improvement"/>
                    <ExcelColumn label="Biaya" value="biaya"/>
                    <ExcelColumn label="Biaya Uraian" value="biaya_uraian"/>
                    <ExcelColumn label="Keuntungan" value="keuntungan"/>
                    <ExcelColumn label="Keuntungan Uraian" value="keuntungan_uraian"/>
                    <ExcelColumn label="Tanggal dibuat" value="tgl"/>
                    <ExcelColumn label="Status" value="status_deskripsi"/>
                    <ExcelColumn label="Closed Date" value="closed_date"/>
                    <ExcelColumn label="Change Control" value="change_control"/>
                    <ExcelColumn label="Nomor CC" value="nomor_cc"/>
                    <ExcelColumn label="Jenis Saving" value="jenis_saving"/>
                </ExcelSheet>
            </ExcelFile>
      <div className="position-relative has-icon-left mb-1">
        <Input value={props.value} onChange={e => props.handleFilter(e)} />
        <div className="form-control-position">
          <Search size="15" />
        </div>
      </div>
    </div>
  )
}

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



class MstdDashboardSsDept extends React.Component {
  state = {
    isLoading: false,
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
              // {this.state.keuntungan > 999999999 ? (this.state.keuntungan/1000000000).toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' M': this.state.keuntungan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            //   return val > 999999 ? (val / 1000000).toFixed(0) + " kk" : val
                return val > 999999999 ? (val/1000000000).toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' M': val > 999999 ? (val/1000000).toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' jt' :val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          }
        },
        tooltip: {
          x: { show: false }
        }
    },
    series: [
    {
        name: "This Year",
        data: [0, 0,0,0,0,0,0,0,0,0,0,0]
    },
    {
        name: "Last Year",
        data: [0, 0,0,0,0,0,0,0,0,0,0,0]
    },
    ],
    seriesColumn: [
    {
        name: 'Current Year',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 44, 0, 0]
    },
    {
    name: 'Last Year',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 100, 0, 0]
    }, 
    ],
    optionsColumn: {
    chart: {
        type: 'bar',
        height: 350
    },
    plotOptions: {
        bar: {
        horizontal: false,
        columnWidth: '30%',
        endingShape: 'rounded'
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des'],
    },
    yaxis: {
        title: {
        // text: '$ (thousands)'
        text: 'Total SS'
        }
    },
    fill: {
        opacity: 1
    },
    tooltip: {
        y: {
        // formatter: function (val) {
        //   return "$ " + val + " thousands"
        formatter: function (val) {
            return val + " SS"
        }
        }
    }
    },
    modalVisible: false,
    modalImage: '',
    modalDigimonName: '',
    dataDepartemen: [],
    deptSelected: null,
    deptLabel: '',
    myProfile: null,
    value: "",
    keuntungan: 0,
    done: 0,
    keuntunganPS: 0,
    donePS: 0,
    keuntunganHS: 0,
    doneHS: 0,
    kDiversification: 0,
    kYield: 0,
    kLeadtime: 0,
    kGreen: 0,
    kDefect: 0,
    kOF: 0,
    kSafety: 0,
    kBrft: 0,
    kCylce: 0,
    kOee: 0,
    kRework: 0,
    kMttr: 0,
    kCustomer: 0,
    k2Rm: 0,
    k2Pm: 0,
    k2Bs: 0,
    k2Capacity: 0,
    k2LeadTime: 0,
    k2Process: 0,
    k2Yield: 0,
    k2Energy: 0,
    k2Water: 0,
    k2Logistic: 0,
    k2Repair: 0,
    k2Adm: 0,
    k2Others: 0,
    date: new Date(),
    basicPicker: new Date(),
    basicPicker2: new Date(),
    startDate: new Date(),
    endDate: new Date(),
    cYear: new Date(),
    lYear: new Date()
  }

  componentDidMount=async()=>{
    await this.setState({isLoading: true});
    await this.isLogin('mstd_df');

    var date = new Date();
    var firstDay = await new Date(date.getFullYear(), date.getMonth(), 2).toISOString().split('T')[0];
    var lastDay = await new Date(date.getFullYear(), date.getMonth() + 1, 1).toISOString().split('T')[0];
    var dummy = await new Date(date.getFullYear(), date.getMonth(), 1)
    var dummy2 = await new Date(date.getFullYear(), date.getMonth() + 1, 0)

    var firstDay2 = await new Date(date.getFullYear(), date.getMonth(), 2).toISOString().split('T')[0].split('-')[2];
    var lastDay2 = await new Date(date.getFullYear(), date.getMonth() + 1, 1).toISOString().split('T')[0].split('-')[2];


    var cYear = date.getFullYear()
    var lYear = date.getFullYear()-1
    var lDate = date.getDay()
    await this.setState({cYear: cYear, lYear: lYear})
    // console.log('first day : ', firstDay2)
    // console.log('last day : ', lastDay2)
    // console.log('cYear : ', cYear)
    // console.log('lYear : ', lYear)
    // console.log('lDate : ', lDate)


    await this.setState({startDate: firstDay, endDate: lastDay})
    await this.setState({basicPicker: dummy, basicPicker2: dummy2})

    await this.tarikDepartemen();
    await this.tarikSaving();
    await this.tarikCount();
    await this.tarikSavingPS();
    await this.tarikCountPS();
    await this.tarikSavingHS();
    await this.tarikCountHS();
    await this.tarikCountKategori();
    await this.tarikCountKategori2();
    await this.tarikGarisChart();
    await this.tarikColumnChart();
    // await this.tarikDataTable();

    // var startDate = new Date();
    // var endDate = new Date().getDate();




    // console.log('print end : ', endDate)
    // console.log('print first : ', firstDay)
    // console.log('last day : ', lastDay)
    // console.log('dummy first : ', dummy)
    // console.log('dummy day : ', dummy2)


    await this.setState({isLoading: false});
  }

  tarikDepartemen = async() =>{

    let sql = `
    select id as value,
      nama_departemen as label
      from df_master_departement dmd
      order by id asc 
    `
  
    var result = await axios.post(api_query, {
                                query : sql
                            })
                                .then(async(result) => {
                                  var res = result.data.response.rows
                                  console.log('result query departemen : ', res)
                                  if (res.length == '') {
                                      return []
                                  }
  
                                  await this.setState({dataDepartemen: res})
  
                                }).catch(err => {
                                    console.log('error : ', err)
                                    return []
                                })
      // await this.setState({data: result})
    }

  tarikGarisChart = async() =>{
    // where closed_date >= '2021-01-01'
    // and	closed_date <= '2021-12-31'

    let sql = `
        select  coalesce(sum(a.cjan),0) cjan,
                coalesce(sum(a.cfeb), 0) cfeb,
                coalesce(sum(a.cmar), 0) cmar,
                coalesce(sum(a.capr), 0) capr,
                coalesce(sum(a.cmay), 0) cmay,
                coalesce(sum(a.cjun), 0) cjun,
                coalesce(sum(a.cjul), 0) cjul,
                coalesce(sum(a.caug), 0) caug,
                coalesce(sum(a.csep), 0) csep,
                coalesce(sum(a.coct), 0) coct,
                coalesce(sum(a.cnov), 0) cnov,
                coalesce(sum(a.cdes), 0) cdes,
                coalesce(sum(a.ljan),0) ljan,
                coalesce(sum(a.lfeb), 0) lfeb,
                coalesce(sum(a.lmar), 0) lmar,
                coalesce(sum(a.lapr), 0) lapr,
                coalesce(sum(a.lmay), 0) lmay,
                coalesce(sum(a.ljun), 0) ljun,
                coalesce(sum(a.ljul), 0) ljul,
                coalesce(sum(a.laug), 0) laug,
                coalesce(sum(a.lsep), 0) lsep,
                coalesce(sum(a.loct), 0) loct,
                coalesce(sum(a.lnov), 0) lnov,
                coalesce(sum(a.ldes), 0) ldes
            from
            (select dss.keuntungan,
            case when dss.closed_date >= '`+this.state.cYear+`-01-01' and dss.closed_date <= '`+this.state.cYear+`-01-31' then dss.keuntungan else 0 end as cjan,
            case when dss.closed_date >= '`+this.state.cYear+`-02-01' and dss.closed_date <= '`+this.state.cYear+`-02-28' then dss.keuntungan else 0 end as cfeb,
            case when dss.closed_date >= '`+this.state.cYear+`-03-01' and dss.closed_date <= '`+this.state.cYear+`-03-31' then dss.keuntungan else 0 end as cmar,
            case when dss.closed_date >= '`+this.state.cYear+`-04-01' and dss.closed_date <= '`+this.state.cYear+`-04-30' then dss.keuntungan else 0 end as capr,
            case when dss.closed_date >= '`+this.state.cYear+`-05-01' and dss.closed_date <= '`+this.state.cYear+`-05-31' then dss.keuntungan else 0 end as cmay,
            case when dss.closed_date >= '`+this.state.cYear+`-06-01' and dss.closed_date <= '`+this.state.cYear+`-06-30' then dss.keuntungan else 0 end as cjun,
            case when dss.closed_date >= '`+this.state.cYear+`-07-01' and dss.closed_date <= '`+this.state.cYear+`-07-31' then dss.keuntungan else 0 end as cjul,
            case when dss.closed_date >= '`+this.state.cYear+`-08-01' and dss.closed_date <= '`+this.state.cYear+`-08-31' then dss.keuntungan else 0 end as caug,
            case when dss.closed_date >= '`+this.state.cYear+`-09-01' and dss.closed_date <= '`+this.state.cYear+`-09-30' then dss.keuntungan else 0 end as csep,
            case when dss.closed_date >= '`+this.state.cYear+`-10-01' and dss.closed_date <= '`+this.state.cYear+`-10-31' then dss.keuntungan else 0 end as coct,
            case when dss.closed_date >= '`+this.state.cYear+`-11-01' and dss.closed_date <= '`+this.state.cYear+`-11-30' then dss.keuntungan else 0 end as cnov,
            case when dss.closed_date >= '`+this.state.cYear+`-12-01' and dss.closed_date <= '`+this.state.cYear+`-12-31' then dss.keuntungan else 0 end as cdes,
            case when dss.closed_date >= '`+this.state.lYear+`-01-01' and dss.closed_date <= '`+this.state.lYear+`-01-31' then dss.keuntungan else 0 end as ljan,
            case when dss.closed_date >= '`+this.state.lYear+`-02-01' and dss.closed_date <= '`+this.state.lYear+`-02-28' then dss.keuntungan else 0 end as lfeb,
            case when dss.closed_date >= '`+this.state.lYear+`-03-01' and dss.closed_date <= '`+this.state.lYear+`-03-31' then dss.keuntungan else 0 end as lmar,
            case when dss.closed_date >= '`+this.state.lYear+`-04-01' and dss.closed_date <= '`+this.state.lYear+`-04-30' then dss.keuntungan else 0 end as lapr,
            case when dss.closed_date >= '`+this.state.lYear+`-05-01' and dss.closed_date <= '`+this.state.lYear+`-05-31' then dss.keuntungan else 0 end as lmay,
            case when dss.closed_date >= '`+this.state.lYear+`-06-01' and dss.closed_date <= '`+this.state.lYear+`-06-30' then dss.keuntungan else 0 end as ljun,
            case when dss.closed_date >= '`+this.state.lYear+`-07-01' and dss.closed_date <= '`+this.state.lYear+`-07-31' then dss.keuntungan else 0 end as ljul,
            case when dss.closed_date >= '`+this.state.lYear+`-08-01' and dss.closed_date <= '`+this.state.lYear+`-08-31' then dss.keuntungan else 0 end as laug,
            case when dss.closed_date >= '`+this.state.lYear+`-09-01' and dss.closed_date <= '`+this.state.lYear+`-09-30' then dss.keuntungan else 0 end as lsep,
            case when dss.closed_date >= '`+this.state.lYear+`-10-01' and dss.closed_date <= '`+this.state.lYear+`-10-31' then dss.keuntungan else 0 end as loct,
            case when dss.closed_date >= '`+this.state.lYear+`-11-01' and dss.closed_date <= '`+this.state.lYear+`-11-30' then dss.keuntungan else 0 end as lnov,
            case when dss.closed_date >= '`+this.state.lYear+`-12-01' and dss.closed_date <= '`+this.state.lYear+`-12-31' then dss.keuntungan else 0 end as ldes
            from df_suggestion_system dss
            where dss.ss_status_id = 6
            and departement_terdampak_id = `+this.state.deptSelected+`
            ) a
    `
    // console.log('garis sql :', sql)
    var result = await axios.post(api_query, {
        query : sql
    })
        .then(async(result) => {
        // let res = result.data.response
        var res = result.data.response.rows

        // console.log('result : ', result)
        // console.log('result postgres : ', result)
        console.log('result tarik garis : ', res)
        if (res.length == '') {
            return []
        }else{
            var series = [
                {
                  name: "This Year",
                  data: [100000000, 200000000,0,0,0,0,0,0,0,0,0,0]
                },
                {
                  name: "Last Year",
                  data: [50000000, 100000000,0,0,0,0,0,0,0,0,0,0]
                },
              ]
            var tmp = []
            var thisYear = {
                name: "This Year",
                data: [res[0].cjan, res[0].cfeb, res[0].cmar, res[0].capr, res[0].cmay, res[0].cjun, res[0].cjul, res[0].caug, res[0].csep, res[0].coct, res[0].cnov, res[0].cdes]
            }
            var lastYear = {
                name: "Last Year",
                data: [res[0].ljan, res[0].lfeb, res[0].lmar, res[0].lapr, res[0].lmay, res[0].ljun, res[0].ljul, res[0].laug, res[0].lsep, res[0].loct, res[0].lnov, res[0].ldes]
            }

            tmp.push(thisYear);
            tmp.push(lastYear);
            await this.setState({series: tmp})
            //  this.setState({keuntungan: res[0].keuntungan})   
          }
    }).catch(err => {
        console.log('error : ', err)
        return []
    })


  }

  tarikColumnChart= async() =>{
    // where closed_date >= '2021-01-01'
    // and	closed_date <= '2021-12-31'

    let sql = `
        select  
              coalesce(sum(a.cjan), 0) cjan,
              coalesce(sum(a.cfeb), 0) cfeb,
              coalesce(sum(a.cmar), 0) cmar,
              coalesce(sum(a.capr), 0) capr,
              coalesce(sum(a.cmay), 0) cmay,
              coalesce(sum(a.cjun), 0) cjun,
              coalesce(sum(a.cjul), 0) cjul,
              coalesce(sum(a.caug), 0) caug,
              coalesce(sum(a.csep), 0) csep,
              coalesce(sum(a.coct), 0) coct,
              coalesce(sum(a.cnov), 0) cnov,
              coalesce(sum(a.cdes), 0) cdes,
              coalesce(sum(a.ljan), 0) ljan,
              coalesce(sum(a.lfeb), 0) lfeb,
              coalesce(sum(a.lmar), 0) lmar,
              coalesce(sum(a.lapr), 0) lapr,
              coalesce(sum(a.lmay), 0) lmay,
              coalesce(sum(a.ljun), 0) ljun,
              coalesce(sum(a.ljul), 0) ljul,
              coalesce(sum(a.laug), 0) laug,
              coalesce(sum(a.lsep), 0) lsep,
              coalesce(sum(a.loct), 0) loct,
              coalesce(sum(a.lnov), 0) lnov,
              coalesce(sum(a.ldes), 0) ldes
            from
            (select dss.id,
            case when dss.closed_date >= '`+this.state.cYear+`-01-01' and dss.closed_date <= '`+this.state.cYear+`-01-31' then count(dss.id) else null end as cjan,
            case when dss.closed_date >= '`+this.state.cYear+`-02-01' and dss.closed_date <= '`+this.state.cYear+`-02-28' then count(dss.id) else null end as cfeb,
            case when dss.closed_date >= '`+this.state.cYear+`-03-01' and dss.closed_date <= '`+this.state.cYear+`-03-31' then count(dss.id) else null end as cmar,
            case when dss.closed_date >= '`+this.state.cYear+`-04-01' and dss.closed_date <= '`+this.state.cYear+`-04-30' then count(dss.id) else null end as capr,
            case when dss.closed_date >= '`+this.state.cYear+`-05-01' and dss.closed_date <= '`+this.state.cYear+`-05-31' then count(dss.id) else null end as cmay,
            case when dss.closed_date >= '`+this.state.cYear+`-06-01' and dss.closed_date <= '`+this.state.cYear+`-06-30' then count(dss.id) else null end as cjun,
            case when dss.closed_date >= '`+this.state.cYear+`-07-01' and dss.closed_date <= '`+this.state.cYear+`-07-31' then count(dss.id) else null end as cjul,
            case when dss.closed_date >= '`+this.state.cYear+`-08-01' and dss.closed_date <= '`+this.state.cYear+`-08-31' then count(dss.id) else null end as caug,
            case when dss.closed_date >= '`+this.state.cYear+`-09-01' and dss.closed_date <= '`+this.state.cYear+`-09-30' then count(dss.id) else null end as csep,
            case when dss.closed_date >= '`+this.state.cYear+`-10-01' and dss.closed_date <= '`+this.state.cYear+`-10-31' then count(dss.id) else null end as coct,
            case when dss.closed_date >= '`+this.state.cYear+`-11-01' and dss.closed_date <= '`+this.state.cYear+`-11-30' then count(dss.id) else null end as cnov,
            case when dss.closed_date >= '`+this.state.cYear+`-12-01' and dss.closed_date <= '`+this.state.cYear+`-12-31' then count(dss.id) else null end as cdes,
            case when dss.closed_date >= '`+this.state.lYear+`-01-01' and dss.closed_date <= '`+this.state.lYear+`-01-31' then count(dss.id) else null end as ljan,
            case when dss.closed_date >= '`+this.state.lYear+`-02-01' and dss.closed_date <= '`+this.state.lYear+`-02-28' then count(dss.id) else null end as lfeb,
            case when dss.closed_date >= '`+this.state.lYear+`-03-01' and dss.closed_date <= '`+this.state.lYear+`-03-31' then count(dss.id) else null end as lmar,
            case when dss.closed_date >= '`+this.state.lYear+`-04-01' and dss.closed_date <= '`+this.state.lYear+`-04-30' then count(dss.id) else null end as lapr,
            case when dss.closed_date >= '`+this.state.lYear+`-05-01' and dss.closed_date <= '`+this.state.lYear+`-05-31' then count(dss.id) else null end as lmay,
            case when dss.closed_date >= '`+this.state.lYear+`-06-01' and dss.closed_date <= '`+this.state.lYear+`-06-30' then count(dss.id) else null end as ljun,
            case when dss.closed_date >= '`+this.state.lYear+`-07-01' and dss.closed_date <= '`+this.state.lYear+`-07-31' then count(dss.id) else null end as ljul,
            case when dss.closed_date >= '`+this.state.lYear+`-08-01' and dss.closed_date <= '`+this.state.lYear+`-08-31' then count(dss.id) else null end as laug,
            case when dss.closed_date >= '`+this.state.lYear+`-09-01' and dss.closed_date <= '`+this.state.lYear+`-09-30' then count(dss.id) else null end as lsep,
            case when dss.closed_date >= '`+this.state.lYear+`-10-01' and dss.closed_date <= '`+this.state.lYear+`-10-31' then count(dss.id) else null end as loct,
            case when dss.closed_date >= '`+this.state.lYear+`-11-01' and dss.closed_date <= '`+this.state.lYear+`-11-30' then count(dss.id) else null end as lnov,
            case when dss.closed_date >= '`+this.state.lYear+`-12-01' and dss.closed_date <= '`+this.state.lYear+`-12-31' then count(dss.id) else null end as ldes
            from df_suggestion_system dss
            where dss.ss_status_id = 6
            and departement_terdampak_id = `+this.state.deptSelected+`
            group by dss.id
            ) a
    `
    // console.log('garis sql :', sql)
    var result = await axios.post(api_query, {
        query : sql
    })
        .then(async(result) => {
        // let res = result.data.response
        var res = result.data.response.rows

        // console.log('result : ', result)
        // console.log('result postgres : ', result)
        console.log('result tarik garis : ', res)
        if (res.length == '') {
            return []
        }else{

          var seriesColumn = [
              
              {
                name: 'Current Year',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
              },
              {
                name: 'Last Year',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
              }, 
            ]

            var tmp = []
            var thisYear = {
                name: "Current Year",
                data: [res[0].cjan, res[0].cfeb, res[0].cmar, res[0].capr, res[0].cmay, res[0].cjun, res[0].cjul, res[0].caug, res[0].csep, res[0].coct, res[0].cnov, res[0].cdes]
            }
            var lastYear = {
                name: "Last Year",
                data: [res[0].ljan, res[0].lfeb, res[0].lmar, res[0].lapr, res[0].lmay, res[0].ljun, res[0].ljul, res[0].laug, res[0].lsep, res[0].loct, res[0].lnov, res[0].ldes]
            }

            tmp.push(lastYear);
            tmp.push(thisYear);
            await this.setState({seriesColumn: tmp})
            //  this.setState({keuntungan: res[0].keuntungan})   
          }
    }).catch(err => {
        console.log('error : ', err)
        return []
    })


  }

  numberWithCommas = async (x)=> {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  handleChange= async(date) =>{
    //   console.log('new date: ', date)
      await this.setState({basicPicker: date})
      var tmp = await new Date(date).toISOString().split('T')[0]
      console.log('temp : ', tmp)
      await this.setState({startDate: tmp})
      await this.reRunChart();
  }

  handleChange2= async(date) =>{
    //   console.log('new date: ', date)
      await this.setState({basicPicker2: date})
      var tmp = await new Date(date).toISOString().split('T')[0]
      console.log('temp : ', tmp)
      await this.setState({endDate: tmp})
      await this.reRunChart();
  }

  reRunChart= async()=>{
    await this.tarikSaving();
    await this.tarikCount();
    await this.tarikSavingPS();
    await this.tarikCountPS();
    await this.tarikSavingHS();
    await this.tarikCountHS();
    await this.tarikCountKategori();
    await this.tarikCountKategori2();
    await this.tarikGarisChart();
    await this.tarikColumnChart();

  }

  isLogin = async(role) =>{
    if (localStorage.getItem('account') == undefined || localStorage.getItem('account') == null) {
      history.push("/pages/login")
    }else if(JSON.parse(localStorage.getItem('account')).role !== role){
      history.push("/pages/login")
    }
    else{
      var myProfile = JSON.parse(localStorage.getItem('account'))
      console.log('myProfile', myProfile)
      this.setState({myProfile: myProfile})
    }
  }

tarikSaving = async() =>{
    // where closed_date >= '2021-01-01'
    // and	closed_date <= '2021-12-31'

    let sql = `
        select coalesce(sum(dss.biaya), 0) biaya, coalesce(sum(dss.keuntungan), 0) keuntungan
        from df_suggestion_system dss 
        where closed_date >= '`+this.state.startDate+`'
        and	closed_date <= '`+this.state.endDate+`'
        and ss_status_id = 6
        and departement_terdampak_id = `+this.state.deptSelected+`
    `
    var result = await axios.post(api_query, {
        query : sql
    })
        .then(async(result) => {
        // let res = result.data.response
        var res = result.data.response.rows

        // console.log('result : ', result)
        // console.log('result postgres : ', result)
        // console.log('result query saving ytd : ', res)
        // console.log('query leng ytd :', res.length)
        if (res.length == '') {
            return []
        }else{
             this.setState({keuntungan: res[0].keuntungan})   
          }
    }).catch(err => {
        console.log('error : ', err)
        return []
    })


}

tarikCount = async() =>{
    let sql = `
        select coalesce(count(dss.id), 0) jumlah_done
        from df_suggestion_system dss 
        where closed_date >= '`+this.state.startDate+`'
        and	closed_date <= '`+this.state.endDate+`'
        and ss_status_id = 6
        and departement_terdampak_id = `+this.state.deptSelected+`
    `
    var result = await axios.post(api_query, {
        query : sql
    })
        .then(async(result) => {
        // let res = result.data.response
        var res = result.data.response.rows

        // console.log('result : ', result)
        // console.log('result postgres : ', result)
        // console.log('result query saving ytd : ', res)
        // console.log('query leng ytd :', res.length)
        if (res.length == '') {
            return []
        }else{
             this.setState({done: res[0].jumlah_done})   
          }
    }).catch(err => {
        console.log('error : ', err)
        return []
    })


}

tarikSavingPS = async() =>{
    // where closed_date >= '2021-01-01'
    // and	closed_date <= '2021-12-31'

    let sql = `
        select coalesce(sum(dss.biaya), 0) biaya, coalesce(sum(dss.keuntungan), 0) keuntungan
        from df_suggestion_system dss 
        where closed_date >= '`+this.state.startDate+`'
        and	closed_date <= '`+this.state.endDate+`'
        and ss_status_id = 6
        and jenis_saving = 'PS'
        and departement_terdampak_id = `+this.state.deptSelected+`
    `
    var result = await axios.post(api_query, {
        query : sql
    })
        .then(async(result) => {
        // let res = result.data.response
        var res = result.data.response.rows

        // console.log('result : ', result)
        // console.log('result postgres : ', result)
        // console.log('result query saving ytd : ', res)
        // console.log('query leng ytd :', res.length)
        if (res.length == '') {
            return []
        }else{
             this.setState({keuntunganPS: res[0].keuntungan})   
          }
    }).catch(err => {
        console.log('error : ', err)
        return []
    })


}

tarikCountPS = async() =>{
    let sql = `
        select coalesce(count(dss.id), 0) jumlah_done
        from df_suggestion_system dss 
        where closed_date >= '`+this.state.startDate+`'
        and	closed_date <= '`+this.state.endDate+`'
        and ss_status_id = 6
        and jenis_saving = 'PS'
        and departement_terdampak_id = `+this.state.deptSelected+`
    `
    var result = await axios.post(api_query, {
        query : sql
    })
        .then(async(result) => {
        // let res = result.data.response
        var res = result.data.response.rows

        // console.log('result : ', result)
        // console.log('result postgres : ', result)
        // console.log('result query saving ytd : ', res)
        // console.log('query leng ytd :', res.length)
        if (res.length == '') {
            return []
        }else{
             this.setState({donePS: res[0].jumlah_done})   
          }
    }).catch(err => {
        console.log('error : ', err)
        return []
    })


}

tarikSavingHS = async() =>{
    // where closed_date >= '2021-01-01'
    // and	closed_date <= '2021-12-31'

    let sql = `
        select coalesce(sum(dss.biaya), 0) biaya, coalesce(sum(dss.keuntungan), 0) keuntungan
        from df_suggestion_system dss 
        where closed_date >= '`+this.state.startDate+`'
        and	closed_date <= '`+this.state.endDate+`'
        and ss_status_id = 6
        and jenis_saving = 'HS'
        and departement_terdampak_id = `+this.state.deptSelected+`
    `
    var result = await axios.post(api_query, {
        query : sql
    })
        .then(async(result) => {
        // let res = result.data.response
        var res = result.data.response.rows

        // console.log('result : ', result)
        // console.log('result postgres : ', result)
        // console.log('result query saving ytd : ', res)
        // console.log('query leng ytd :', res.length)
        if (res.length == '') {
            return []
        }else{
             this.setState({keuntunganHS: res[0].keuntungan})   
          }
    }).catch(err => {
        console.log('error : ', err)
        return []
    })


}

tarikCountHS = async() =>{
    let sql = `
        select coalesce(count(dss.id), 0) jumlah_done
        from df_suggestion_system dss 
        where closed_date >= '`+this.state.startDate+`'
        and	closed_date <= '`+this.state.endDate+`'
        and ss_status_id = 6
        and jenis_saving = 'HS'
        and departement_terdampak_id = `+this.state.deptSelected+`
    `
    var result = await axios.post(api_query, {
        query : sql
    })
        .then(async(result) => {
        // let res = result.data.response
        var res = result.data.response.rows

        // console.log('result : ', result)
        // console.log('result postgres : ', result)
        // console.log('result query saving ytd : ', res)
        // console.log('query leng ytd :', res.length)
        if (res.length == '') {
            return []
        }else{
             this.setState({doneHS: res[0].jumlah_done})   
          }
    }).catch(err => {
        console.log('error : ', err)
        return []
    })


}

tarikCountKategori = async() =>{
    let sql = `
    select  coalesce(sum(a.divers),0) divers,
            coalesce(sum(a.yield), 0) yield, 
            coalesce(sum(a.leadtime), 0) leadtime, 
            coalesce(sum(a.green), 0) green, 
            coalesce(sum(a.defect), 0) defect,
            coalesce(sum(a.order_fullfillment), 0) order_fullfillment, 
            coalesce(sum(a.safety), 0) safety, 
            coalesce(sum(a.brft), 0) brft, 
            coalesce(sum(a.cycle_time), 0) cycle_time, 
            coalesce(sum(a.oee), 0) oee,
            coalesce(sum(a.rework), 0) rework, 
            coalesce(sum(a.mttr), 0) mttr, 
            coalesce(sum(a.customer), 0) customer
        from
        (select dss.ss_kategori_id,
        case when dss.ss_kategori_id = 1 then 1 else 0 end as divers,
        case when dss.ss_kategori_id = 2 then 1 else 0 end as yield,
        case when dss.ss_kategori_id = 3 then 1 else 0 end as leadtime,
        case when dss.ss_kategori_id = 4 then 1 else 0 end as green,
        case when dss.ss_kategori_id = 5 then 1 else 0 end as defect,
        case when dss.ss_kategori_id = 6 then 1 else 0 end as order_fullfillment,
        case when dss.ss_kategori_id = 7 then 1 else 0 end as safety,
        case when dss.ss_kategori_id = 8 then 1 else 0 end as brft,
        case when dss.ss_kategori_id = 9 then 1 else 0 end as cycle_time,
        case when dss.ss_kategori_id = 10 then 1 else 0 end as oee,
        case when dss.ss_kategori_id = 11 then 1 else 0 end as rework,
        case when dss.ss_kategori_id = 12 then 1 else 0 end as mttr,
        case when dss.ss_kategori_id = 13 then 1 else 0 end as customer
        from df_suggestion_system dss
        left join df_ss_kategori dsk
        on dss.ss_kategori_id = dsk.id 
        where dss.closed_date >= '`+this.state.startDate+`'
        and	dss.closed_date <= '`+this.state.endDate+`'
        and dss.ss_status_id = 6
        and departement_terdampak_id = `+this.state.deptSelected+`
        ) a
    `
    var result = await axios.post(api_query, {
        query : sql
    })
        .then(async(result) => {
        // let res = result.data.response
        var res = result.data.response.rows

        // console.log('result : ', result)
        // console.log('result postgres : ', result)
        // console.log('result query saving ytd : ', res)
        // console.log('query leng ytd :', res.length)
        if (res.length == '') {
            return []
        }else{
             this.setState({
                kDiversification: res[0].divers,
                kYield: res[0].yield,
                kLeadtime: res[0].leadtime,
                kGreen: res[0].green,
                kDefect: res[0].defect,
                kOF: res[0].order_fullfillment,
                kSafety: res[0].safety,
                kBrft: res[0].brft,
                kCylce: res[0].cycle_time,
                kOee: res[0].oee,
                kRework: res[0].rework,
                kMttr: res[0].mttr,
                kCustomer: res[0].customer
             })   
          }
    }).catch(err => {
        console.log('error : ', err)
        return []
    })


}

tarikCountKategori2 = async() =>{
  let sql = `
  select  coalesce(sum(a.rm),0) rm,
          coalesce(sum(a.pm), 0) pm, 
          coalesce(sum(a.bs), 0) bs, 
          coalesce(sum(a.capacity), 0) capacity, 
          coalesce(sum(a.leadtime), 0) leadtime,
          coalesce(sum(a.process), 0) process, 
          coalesce(sum(a.yield), 0) yield, 
          coalesce(sum(a.energy), 0) energy, 
          coalesce(sum(a.water), 0) water, 
          coalesce(sum(a.logistic), 0) logistic,
          coalesce(sum(a.repair), 0) repair, 
          coalesce(sum(a.adm), 0) adm, 
          coalesce(sum(a.others1), 0) others1
      from
      (select dss.ss_kategori_2_id,
      case when dss.ss_kategori_2_id = 1 then 1 else 0 end as rm,
      case when dss.ss_kategori_2_id = 2 then 1 else 0 end as pm,
      case when dss.ss_kategori_2_id = 3 then 1 else 0 end as bs,
      case when dss.ss_kategori_2_id = 4 then 1 else 0 end as capacity,
      case when dss.ss_kategori_2_id = 5 then 1 else 0 end as leadtime,
      case when dss.ss_kategori_2_id = 6 then 1 else 0 end as process,
      case when dss.ss_kategori_2_id = 7 then 1 else 0 end as yield,
      case when dss.ss_kategori_2_id = 8 then 1 else 0 end as energy,
      case when dss.ss_kategori_2_id = 9 then 1 else 0 end as water,
      case when dss.ss_kategori_2_id = 10 then 1 else 0 end as logistic,
      case when dss.ss_kategori_2_id = 11 then 1 else 0 end as repair,
      case when dss.ss_kategori_2_id = 12 then 1 else 0 end as adm,
      case when dss.ss_kategori_2_id = 13 then 1 else 0 end as others1
      from df_suggestion_system dss
      left join df_ss_kategori_2 dsk
      on dss.ss_kategori_2_id = dsk.id 
      where dss.closed_date >= '`+this.state.startDate+`'
      and	dss.closed_date <= '`+this.state.endDate+`'
      and dss.ss_status_id = 6
      and departement_terdampak_id = `+this.state.deptSelected+`
      ) a
  `
//   console.log('sql cat 2 :', sql)
  var result = await axios.post(api_query, {
      query : sql
  })
      .then(async(result) => {
      // let res = result.data.response
      var res = result.data.response.rows

      // console.log('result : ', result)
      // console.log('result postgres : ', result)
      // console.log('result query saving ytd : ', res)
      // console.log('query leng ytd :', res.length)
      if (res.length == '') {
          return []
      }else{
           this.setState({
              k2Rm: res[0].rm,
              k2Pm: res[0].pm,
              k2Bs: res[0].bs,
              k2Capacity: res[0].capacity,
              k2LeadTime: res[0].leadtime,
              k2Process: res[0].process,
              k2Yield: res[0].yield,
              k2Energy: res[0].energy,
              k2Water: res[0].water,
              k2Logistic: res[0].logistic,
              k2Repair: res[0].repair,
              k2Adm: res[0].adm,
              k2Others: res[0].others1
           })   
        }
  }).catch(err => {
      console.log('error : ', err)
      return []
  })


}

gantiDept = async(val) =>{
    await this.setState({deptSelected: val.value})
    await this.setState({deptLabel: val.label})
    await this.reRunChart();
}


  render() {
    let { data, columns, value, filteredData } = this.state
    let { 
        basicPicker, 
      } = this.state
    return (
        <>
          {this.state.isLoading?
            <Spinner/>
            :
            <div>
                <Breadcrumbs
                    breadCrumbTitle="Dashboard SS Dept"
                    breadCrumbParent="SS"
                    breadCrumbActive="Dashboard SS Dept"
                />
            
                <Row>
                    <Col className="" md="12" sm="12">
                        <FormGroup>
                        <Label for="">Pilih Departemen</Label>
                        <Select
                            className="React"
                            classNamePrefix="select"
                            // defaultValue={colourOptions[1]}
                            name="clear"
                            options={this.state.dataDepartemen}
                            // isClearable={true}
                            // onChange={(val)=>this.setState({deptSelected: val.value})}
                            onChange={(val)=>this.gantiDept(val)}
                        />
                        </FormGroup>
                    </Col>
                    <Col className="mb-3" md="6" sm="12">
                        <Label>Start Date</Label>
                        <DatePicker
                            className="form-control"
                            selected={this.state.basicPicker}
                            // onSelect={handleDateSelect} //when day is clicked
                            onChange={(date)=>this.handleChange(date)} //only when value has changed
                        />
                    </Col>
                    <Col className="mb-3" md="6" sm="12">
                        <Label>End Date</Label>
                        <DatePicker
                            className="form-control"
                            selected={this.state.basicPicker2}
                            // onSelect={handleDateSelect} //when day is clicked
                            onChange={(date)=>this.handleChange2(date)} //only when value has changed
                        />
                    </Col>
                </Row>
                <Row>
                    <Col lg="6" sm="6">
                        <StatisticsCard
                        hideChart
                        iconRight
                        iconBg="primary"
                        icon={<Icon.Activity className="dark" size={22} />}
                        stat={this.state.done > 999 ? (this.state.done/1000).toFixed(1) + ' k': this.state.done}
                        statTitle="Jumlah SS"
                        />
                    </Col>
                    <Col lg="6" sm="6">
                        <StatisticsCard
                        hideChart
                        iconRight
                        iconBg="success"
                        icon={<Icon.CreditCard className="success" size={22} />}
                        // stat={this.state.keuntungan > 999999 ? (this.state.keuntungan/1000000).toFixed(1) + ' jt': this.state.keuntungan}
                        // return val > 999999 ? (val / 1000000).toFixed(0) + " kk" : val
                        // stat={this.state.keuntungan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        stat={this.state.keuntungan > 999999999 ? (this.state.keuntungan/1000000000).toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' M': this.state.keuntungan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        statTitle="Cost Saving"
                        />
                    </Col>
                    {/* <Col lg="3" sm="6"> */}
                        {/* <StatisticsCard
                        hideChart
                        iconRight
                        iconBg="primary"
                        icon={<Icon.Activity className="primary" size={22} />}
                        stat={this.state.done > 999 ? (this.state.done/1000).toFixed(1) + ' k': this.state.done}
                        statTitle="Jumlah SS"
                        /> */}
                    {/* </Col> */}
                    {/* <Col lg="3" sm="6"> */}
                        {/* <StatisticsCard
                        hideChart
                        iconRight
                        iconBg="success"
                        icon={<Icon.Server className="success" size={22} />}
                        stat={this.state.keuntungan > 999999 ? (this.state.keuntungan/1000000).toFixed(1) + ' jt': this.state.keuntungan}
                        // return val > 999999 ? (val / 1000000).toFixed(0) + " kk" : val
                        statTitle="Cost Saving"
                        /> */}
                    {/* </Col> */}
                    <Col lg="3" sm="6">
                        <StatisticsCard
                        hideChart
                        iconRight
                        iconBg="primary"
                        icon={<Icon.Activity className="dark" size={22} />}
                        stat={this.state.donePS > 999 ? (this.state.donePS/1000).toFixed(1) + ' k': this.state.donePS}
                        statTitle="Jumlah SS Soft"
                        />
                    </Col>
                    <Col lg="3" sm="6">
                        <StatisticsCard
                        hideChart
                        iconRight
                        iconBg="success"
                        icon={<Icon.CreditCard className="success" size={22} />}
                        // stat={this.state.keuntunganPS > 999999 ? (this.state.keuntunganPS/1000000).toFixed(1) + ' jt': this.state.keuntunganPS}
                        // return val > 999999 ? (val / 1000000).toFixed(0) + " kk" : val
                        stat={this.state.keuntunganPS > 999999999 ? (this.state.keuntunganPS/1000000000).toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' M': this.state.keuntunganPS.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        // stat={this.state.keuntunganPS.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        statTitle="Cost Saving Soft"
                        />
                    </Col>
                    <Col lg="3" sm="6">
                        <StatisticsCard
                        hideChart
                        iconRight
                        iconBg="primary"
                        icon={<Icon.Activity className="dark" size={22} />}
                        stat={this.state.doneHS > 999 ? (this.state.doneHS/1000).toFixed(1) + ' k': this.state.doneHS}
                        statTitle="Jumlah SS Hard"
                        />
                    </Col>
                    <Col lg="3" sm="6">
                        <StatisticsCard
                        hideChart
                        iconRight
                        iconBg="success"
                        icon={<Icon.CreditCard className="success" size={22} />}
                        // stat={this.state.keuntunganHS > 999999 ? (this.state.keuntunganHS/1000000).toFixed(1) + ' jt': this.state.keuntunganHS}
                        // return val > 999999 ? (val / 1000000).toFixed(0) + " kk" : val
                        // stat={this.state.keuntunganHS.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        stat={this.state.keuntunganHS > 999999999 ? (this.state.keuntunganHS/1000000000).toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' M': this.state.keuntunganHS.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        statTitle="Cost Saving Hard"
                        />
                    </Col>
                </Row>
                
                
                {/* KeuntunganChart cYear and lYear */}
                <Card>
                    <CardHeader>
                    <CardTitle>Cost Saving {this.state.deptLabel === null?'':this.state.deptLabel} (Current vs Last)</CardTitle>
                    <Settings size={20} className="cursor-pointer text-muted" />
                    </CardHeader>
                    <CardBody>
                    {/* <div className="d-flex justify-content-start mb-1">
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
                    </div> */}
                    <Chart
                        options={this.state.options}
                        series={this.state.series}
                        type="line"
                        height={260}
                    />
                    </CardBody>
                </Card>
                
                {/* Column Chart APEX */}
                <Card>
                    <CardHeader>
                    <CardTitle>Actual SS (Current vs Last)</CardTitle>
                    <Settings size={20} className="cursor-pointer text-muted" />
                    </CardHeader>
                    <CardBody>
                    {/* <Chart
                        options={this.state.options}
                        series={this.state.series}
                        type="line"
                        height={260}
                    /> */}
                      <Chart options={this.state.optionsColumn} series={this.state.seriesColumn} type="bar" height={350} />
                    </CardBody>
                </Card>
                
                {/* Category Saving SS */}
                <Row>
                    <Col xl="12" lg="12" sm="12">
                        <h2 className="text-center align-self-center" style={{marginBottom: 20}}>Category Saving SS {this.state.deptLabel === null?'':this.state.deptLabel}</h2>
                    </Col>
                </Row>
                {/* Kategori */}
                <Row>
                    <Col xl="2" lg="4" sm="6">
                        <StatisticsCard
                        hideChart
                        iconBg="primary"
                        icon={<Icon.Eye className="primary" size={22} />}
                        stat={this.state.kDiversification}
                        statTitle="Diversification"
                        />
                    </Col>
                    <Col xl="2" lg="4" sm="6">
                        <StatisticsCard
                        hideChart
                        iconBg="success"
                        icon={<Icon.MessageSquare className="success" size={22} />}
                        stat={this.state.kYield}
                        statTitle="Yield"
                        />
                    </Col>
                    <Col xl="2" lg="4" sm="6">
                        <StatisticsCard
                        hideChart
                        iconBg="warning"
                        icon={<Icon.ShoppingBag className="warning" size={22} />}
                        stat={this.state.kLeadtime}
                        statTitle="Leadtime"
                        />
                    </Col>
                    <Col xl="2" lg="4" sm="6">
                        <StatisticsCard
                        hideChart
                        iconBg="danger"
                        icon={<Icon.Heart className="danger" size={22} />}
                        stat={this.state.kGreen}
                        statTitle="Green Project"
                        />
                    </Col>
                    <Col xl="2" lg="4" sm="6">
                        <StatisticsCard
                        hideChart
                        iconBg="success"
                        icon={<Icon.Smile className="success" size={22} />}
                        stat={this.state.kDefect}
                        statTitle="Defect Mode"
                        />
                    </Col>
                    <Col xl="2" lg="4" sm="6">
                        <StatisticsCard
                        hideChart
                        iconBg="warning"
                        icon={<Icon.Truck className="warning" size={22} />}
                        stat={this.state.kOF}
                        statTitle="OF"
                        />
                    </Col>
                    <Col xl="2" lg="4" sm="6">
                        <StatisticsCard
                        hideChart
                        iconBg="primary"
                        icon={<Icon.Eye className="primary" size={22} />}
                        stat={this.state.kSafety}
                        statTitle="Safety & Health"
                        />
                    </Col>
                    <Col xl="2" lg="4" sm="6">
                        <StatisticsCard
                        hideChart
                        iconBg="success"
                        icon={<Icon.MessageSquare className="success" size={22} />}
                        stat={this.state.kBrft}
                        statTitle="BRFT"
                        />
                    </Col>
                    <Col xl="2" lg="4" sm="6">
                        <StatisticsCard
                        hideChart
                        iconBg="warning"
                        icon={<Icon.ShoppingBag className="warning" size={22} />}
                        stat={this.state.kCylce}
                        statTitle="Cycle Time"
                        />
                    </Col>
                    <Col xl="2" lg="4" sm="6">
                        <StatisticsCard
                        hideChart
                        iconBg="danger"
                        icon={<Icon.Heart className="danger" size={22} />}
                        stat={this.state.kOee}
                        statTitle="OEE"
                        />
                    </Col>
                    <Col xl="2" lg="4" sm="6">
                        <StatisticsCard
                        hideChart
                        iconBg="success"
                        icon={<Icon.Smile className="success" size={22} />}
                        stat={this.state.kRework}
                        statTitle="Rework"
                        />
                    </Col>
                    <Col xl="2" lg="4" sm="6">
                        <StatisticsCard
                        hideChart
                        iconBg="warning"
                        icon={<Icon.Truck className="warning" size={22} />}
                        stat={this.state.kMttr}
                        statTitle="MTTR/MTBF"
                        />
                    </Col>
                    <Col xl="2" lg="4" sm="6">
                        <StatisticsCard
                        hideChart
                        iconBg="warning"
                        icon={<Icon.Truck className="warning" size={22} />}
                        stat={this.state.kCustomer}
                        statTitle="Customer Complain"
                        />
                    </Col>
                </Row>
                {/* Category 2 Saving SS */}
                <Row>
                    <Col xl="12" lg="12" sm="12">
                        <h2 className="text-center align-self-center" style={{marginBottom: 20}}>Category 2 Saving SS {this.state.deptLabel === null?'':this.state.deptLabel}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col xl="2" lg="4" sm="6">
                        <StatisticsCard
                        hideChart
                        iconBg="primary"
                        icon={<Icon.Eye className="primary" size={22} />}
                        stat={this.state.k2Rm}
                        statTitle="RM Diversification"
                        />
                    </Col>
                    <Col xl="2" lg="4" sm="6">
                        <StatisticsCard
                        hideChart
                        iconBg="success"
                        icon={<Icon.MessageSquare className="success" size={22} />}
                        stat={this.state.k2Pm}
                        statTitle="PM Diversification"
                        />
                    </Col>
                    <Col xl="2" lg="4" sm="6">
                        <StatisticsCard
                        hideChart
                        iconBg="warning"
                        icon={<Icon.ShoppingBag className="warning" size={22} />}
                        stat={this.state.k2Bs}
                        statTitle="BS Improvement"
                        />
                    </Col>
                    <Col xl="2" lg="4" sm="6">
                        <StatisticsCard
                        hideChart
                        iconBg="danger"
                        icon={<Icon.Heart className="danger" size={22} />}
                        stat={this.state.k2Capacity}
                        statTitle="Capacity Improvement"
                        />
                    </Col>
                    <Col xl="2" lg="4" sm="6">
                        <StatisticsCard
                        hideChart
                        iconBg="success"
                        icon={<Icon.Smile className="success" size={22} />}
                        stat={this.state.k2LeadTime}
                        statTitle="Lead Time Reduction"
                        />
                    </Col>
                    <Col xl="2" lg="4" sm="6">
                        <StatisticsCard
                        hideChart
                        iconBg="warning"
                        icon={<Icon.Truck className="warning" size={22} />}
                        stat={this.state.k2Process}
                        statTitle="Prod Process Efficiency"
                        />
                    </Col>
                    <Col xl="2" lg="4" sm="6">
                        <StatisticsCard
                        hideChart
                        iconBg="primary"
                        icon={<Icon.Eye className="primary" size={22} />}
                        stat={this.state.k2Yield}
                        statTitle={"\n"+"Increase Yield Saving"+" \n"}
                        />
                    </Col>
                    <Col xl="2" lg="4" sm="6">
                        <StatisticsCard
                        hideChart
                        iconBg="success"
                        icon={<Icon.MessageSquare className="success" size={22} />}
                        stat={this.state.k2Energy}
                        statTitle="Energy Cost Reduction"
                        />
                    </Col>
                    <Col xl="2" lg="4" sm="6">
                        <StatisticsCard
                        hideChart
                        iconBg="warning"
                        icon={<Icon.ShoppingBag className="warning" size={22} />}
                        stat={this.state.k2Water}
                        statTitle="Water Consump Reduction"
                        />
                    </Col>
                    <Col xl="2" lg="4" sm="6">
                        <StatisticsCard
                        hideChart
                        iconBg="danger"
                        icon={<Icon.Heart className="danger" size={22} />}
                        stat={this.state.k2Logistic}
                        statTitle="Increase Logistic Productivity"
                        />
                    </Col>
                    <Col xl="2" lg="4" sm="6">
                        <StatisticsCard
                        hideChart
                        iconBg="success"
                        icon={<Icon.Smile className="success" size={22} />}
                        stat={this.state.k2Repair}
                        statTitle="Repair & Maintenance"
                        />
                    </Col>
                    <Col xl="2" lg="4" sm="6">
                        <StatisticsCard
                        hideChart
                        iconBg="warning"
                        icon={<Icon.Truck className="warning" size={22} />}
                        stat={this.state.k2Adm}
                        statTitle="ADM Process Efficiency"
                        />
                    </Col>
                    <Col xl="2" lg="4" sm="6">
                        <StatisticsCard
                        hideChart
                        iconBg="warning"
                        icon={<Icon.Truck className="warning" size={22} />}
                        stat={this.state.k2Others}
                        statTitle="Others"
                        />
                    </Col>
                </Row>
            </div>
          }

      </>
    )
  }
}

export default MstdDashboardSsDept
