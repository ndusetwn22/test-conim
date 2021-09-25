import React from "react"
import { api_query } from "../../../api/ApiConstant"
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Badge,
  Input,
  Button
} from "reactstrap"
import DataTable from "react-data-table-component"
import { Star, Search,
    Edit,
    Trash,
    ChevronDown,
    Plus,
    Check,
    ChevronLeft,
    ChevronRight,
    Inbox,
    Settings} from "react-feather"
import axios from 'axios'
// import ModalDigimon from "./ModalDigimon"
import { history } from "../../../../src/history"
import { CSVLink, CSVDownload } from "react-csv";
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


const CustomHeader = props => {
  return (
    <div className="d-flex flex-wrap justify-content-between">
      {/* <div className="d-flex flex-wrap justify-content-end"> */}
      <div className="add-new">
        <Button.Ripple color="none" className="bg-gradient-success" onClick={() => props.karyawanAdd()}>Tambah Karyawan</Button.Ripple>
      </div>
      <div className="position-relative has-icon-left mb-1">
        <Input value={props.value} onChange={e => props.handleFilter(e)} />
        <div className="form-control-position">
          <Search size="15" />
        </div>
      </div>
    </div>
  )
}

const ApprovalComponent = props => {
    return (
      <div className="data-list-action">
        <Button.Ripple className="mr-1 bg-gradient-success" color="none" size="sm"
          onClick={()=> {
            console.log('props : ', props);
            console.log('digimon : ', props.row.name);
            return props.isVisible(props.row.name, props.row.img)
          }}> Approve</Button.Ripple>
      </div>
    )
  }

  const RejectComponent = props => {
    return (
      <div className="data-list-action">
        <Button.Ripple className="mr-1 bg-gradient-danger" color="none" size="sm"
          onClick={()=> {
            console.log('props : ', props);
            console.log('digimon : ', props.row.name);
            return props.isVisible(props.row.name, props.row.img)
          }}> Reject</Button.Ripple>
      </div>
    )
  }

  const ActionsComponent = props => {
    return (
      <div className="data-list-action">
        {/* <Button.Ripple className="mr-1 bg-gradient-success" color="none" size="sm"
          onClick={()=> {
            // console.log('props : ', props);
            return props.isView(props.row, props.row.id, props.row.cff_id)
          }}>View</Button.Ripple> */}

            {/* <Button color="none" className="bg-gradient-success" onClick={() => console.log('wkwk')}>
              <Check size={14}/>
            </Button> */}

            <Button className='btn-icon bg-gradient-success' color='none'
              onClick={()=> {
                // console.log('props : ', props);
                return props.isView(props.row, props.row.id, props.row.cff_id)
              }}>
              <Settings size={16} />
            </Button>
      </div>
    )
  }



class KaryawanTable extends React.Component {
  state = {
    modalVisible: false,
    modalImage: '',
    modalDigimonName: '',
    myProfile: null,
    columns: [
      {
        name: "NIK",
        selector: "nik",
        sortable: true,
        minWidth: "200px",
        cell: row =>
        (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.nik}
                className="d-block text-bold-500 text-truncate mb-0">
                {row.nik}
                {/* {row.tema} */}
              </span>
            </div>
          </div>
        )
      },
      {
        name: "Nama Lengkap",
        selector: "name",
        sortable: true,
        minWidth: "200px",
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.name}
                className="d-block text-bold-500 text-truncate mb-0">
                {row.name}
              </span>
            </div>
          </div>
        )
      },
      {
        name: "Departemen",
        selector: "nama_departemen",
        sortable: true,
        minWidth: "200px",
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.nama_departemen}
                className="d-block text-bold-500 text-truncate mb-0">
                {row.nama_departemen}
              </span>
            </div>
          </div>
        )
      },
      {
        name: "Status Aktif",
        selector: "active",
        sortable: true,
        minWidth: "200px",
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.active == 'Y' ? 'Aktif':'Tidak Aktif'}
                className="d-block text-bold-500 text-truncate mb-0">
                {row.active == 'Y' ? 'Aktif':'Tidak Aktif'}
              </span>
            </div>
          </div>
        )
      },
      {
        name: "Actions",
        sortable: true,
        cell: row =>
        (
          <>
            <ActionsComponent
              row={row}
              isView={this.viewSS}
            />
          </>
        )
      }
    ],
    data: [],
    csvData:  [
      { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
      { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
      { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
    ],
    filteredData: [],
    value: ""
  }

  componentDidMount=async()=>{
    await this.isLogin('super_admin');
    await this.tarikDataTable();

  }

  karyawanAdd = async() =>{
    console.log('karyawan add')
    await this.props.changeViewPage('add')

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

  tarikDataTable = async() =>{

    let sql = `
        select dmu.id, dmu.nik, dmu.name, convert_from(df_decrypt(dmu.password), 'UTF8') as "password",
        dmu.role, dmu.job_level, dmu.departement_id, dmu.active, dmd.nama_departemen from df_master_user dmu
        join df_master_departement dmd
        on dmu.departement_id = dmd.id
        where dmu.departement_id != 0
    `
    var result = await axios.post(api_query, {
                                query : sql
                            })
                                .then(async(result) => {
                                // let res = result.data.response
                                var res = result.data.response.rows

                                // console.log('result : ', result)
                                // console.log('result postgres : ', result)
                                console.log('result query : ', res)
                                console.log('query leng :', res.length)
                                if (res.length == '') {
                                    return []
                                }else{
                                  await this.setState({data: res})
                                }
                            }).catch(err => {
                                console.log('error : ', err)
                                return []
                            })
      // await this.setState({data: result})
    }

  handleFilter = e => {
    let value = e.target.value
    let data = this.state.data
    let filteredData = this.state.filteredData
    this.setState({ value })

    if (value.length) {
      filteredData = data.filter(item => {
        // console.log('ITEM : ', item)
        let startsWithCondition =
          item.nik.toLowerCase().startsWith(value.toLowerCase()) ||
          item.name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.nama_departemen.toLowerCase().startsWith(value.toLowerCase())
          // item.name.toLowerCase().startsWith(value.toLowerCase())
          // item.date.toLowerCase().startsWith(value.toLowerCase()) ||
          // item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          // item.revenue.toLowerCase().startsWith(value.toLowerCase()) ||
          // item.status.toLowerCase().startsWith(value.toLowerCase())
        let includesCondition =
          item.nik.toLowerCase().includes(value.toLowerCase()) ||
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.nama_departemen.toLowerCase().includes(value.toLowerCase())
          // item.name.toLowerCase().includes(value.toLowerCase())
          // item.date.toLowerCase().includes(value.toLowerCase()) ||
          // item.email.toLowerCase().includes(value.toLowerCase()) ||
          // item.revenue.toLowerCase().includes(value.toLowerCase()) ||
          // item.status.toLowerCase().includes(value.toLowerCase())

        if (startsWithCondition) {
          return startsWithCondition
        } else if (!startsWithCondition && includesCondition) {
          return includesCondition
        } else return null
      })
      this.setState({ filteredData })
    }
  }

  viewSS = async(data, id, cff_id) =>{
    console.log('view SS : ', id)
    console.log('data row : ', data)
    this.props.changeViewPage('edit', data, id)
  }

  render() {
    let { data, columns, value, filteredData } = this.state
    return (
        <>
        {/* <CSVLink data={this.state.csvData}>Download me</CSVLink>;

        <CSVDownload data={this.state.csvData} target="_blank" />; */}

            {/* <ExcelFile element={<button>Download Data</button>}>
                <ExcelSheet data={this.state.csvData} name="Employees">
                    <ExcelColumn label="First Name" value="firstname"/>
                    <ExcelColumn label="Last Name" value="lastname"/>
                    <ExcelColumn label="Email" value="email"/>
                    <ExcelColumn label="Marital Status"
                                 value={(col) => col.is_married ? "Married" : "Single"}/>
                </ExcelSheet>
                <ExcelSheet data={dataSet2} name="Leaves">
                    <ExcelColumn label="Name" value="name"/>
                    <ExcelColumn label="Total Leaves" value="total"/>
                    <ExcelColumn label="Remaining Leaves" value="remaining"/>
                </ExcelSheet>
            </ExcelFile> */}

            
            <Card>
                <CardHeader>
                <CardTitle>Karyawan</CardTitle>
                </CardHeader>
                <CardBody className="rdt_Wrapper">
                <DataTable
                    className="dataTable-custom"
                    data={value.length ? filteredData : data}
                    columns={columns}
                    noHeader
                    pagination
                    subHeader
                    subHeaderComponent={
                    <CustomHeader value={value} handleFilter={this.handleFilter} karyawanAdd={this.karyawanAdd}/>
                    // <CustomHeader value={value} handleFilter={this.handleFilter} tarikData={this.tarikDataTable}/>
                    }
                />
                </CardBody>
            </Card>
            {/* <ModalDigimon {...this.state} {...this.props}
                        // modalImage={this.state.modalImage}
                        // modalVisible={this.state.modalVisible}
                        toggleModal={this.toggleModalDigimon}></ModalDigimon> */}
      </>
    )
  }
}

export default KaryawanTable
