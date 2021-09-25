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
  Col,
  Label, Modal, ModalHeader, ModalBody, ModalFooter, Alert
} from "reactstrap"
import Flatpickr from "react-flatpickr";
import DataTable from "react-data-table-component"
import { Star, Search,
    Edit,
    Trash,
    ChevronDown,
    Plus,
    Check,
    ChevronLeft,
    ChevronRight,
    Settings } from "react-feather"
import axios from 'axios'
// import ModalDigimon from "./ModalDigimon"
// import { history } from "../../../src/history"
import { history } from "../../../../../src/history"
import Spinner from "../../../../components/@vuexy/spinner/Fallback-spinner"
import ReactExport from "react-data-export";
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb"
// import { MyPdf } from "../component/ExportPdf"


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const CustomHeader = props => {
  return (
    <div className="d-flex flex-wrap justify-content-end">
    {/* <div className="d-flex flex-wrap justify-content-between"> */}
      {/* <ExcelFile filename={"SS Online"} element={<Button color="none" className="bg-gradient-success">Download xlsx</Button>}>
                <ExcelSheet data={props.dataCsv} name="List SS">
                    <ExcelColumn label="Nomor SS" value="nomor_ss"/>
                    <ExcelColumn label="Nama pengusul" value="pengusul_1"/>
                    <ExcelColumn label="Nama pengusul 2" value="pengusul_2"/>
                    <ExcelColumn label="Departemen Pengusul" value="nama_departemen"/>
                    <ExcelColumn label="Tema" value="tema"/>
                    <ExcelColumn label="Lokasi" value="lokasi"/>
                    <ExcelColumn label="Departemen SS" value="departement_terdampak"/>
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
                    <ExcelColumn label="Foto Kondisi Sebelum" value="foto_kondisi_sebelum"/>
                    <ExcelColumn label="Foto Kondisi Sesudah" value="foto_kondisi_sesudah"/>
                </ExcelSheet>
            </ExcelFile> */}
      <div className="position-relative has-icon-left mb-1">
        <Input value={props.value} onChange={e => props.handleFilter(e)} />
        <div className="form-control-position">
          <Search size="15" />
        </div>
      </div>
    </div>
  )
}


class SpvRekapSs extends React.Component {
  state = {
    modalDone: false,
    dataDone: [],
    columnsDone: [
      {
        name: "Tema",
        selector: "tema_singkat",
        sortable: true,
        minWidth: "200px",
        cell: row =>
        (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.tema_singkat}
                className="d-block text-bold-500 text-truncate mb-0">
                {row.tema_singkat}
                {/* {row.tema} */}
              </span>
            </div>
          </div>
        )
      },
      {
        name: "Status",
        selector: "status_deskripsi",
        sortable: true,
        minWidth: "200px",
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.status_deskripsi}
                className="d-block text-bold-500 text-truncate mb-0">
                {row.status_deskripsi}
              </span>
            </div>
          </div>
        )
      },
      {
        name: "Tanggal dibuat",
        selector: "tgl_buat",
        sortable: true,
        minWidth: "200px",
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.tgl_buat}
                className="d-block text-bold-500 text-truncate mb-0">
                {row.tgl_buat}
              </span>
            </div>
          </div>
        )
      },
      {
        name: "Tanggal tutup",
        selector: "tgl_tutup",
        sortable: true,
        minWidth: "200px",
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.tgl_tutup}
                className="d-block text-bold-500 text-truncate mb-0">
                {row.tgl_tutup}
              </span>
            </div>
          </div>
        )
      },
    ],
    modalPending: false,
    dataPending: [],
    columnsPending: [
        {
          name: "Tema",
          selector: "tema_singkat",
          sortable: true,
          minWidth: "200px",
          cell: row =>
          (
            <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
              <div className="user-info text-truncate ml-xl-50 ml-0">
                <span
                  title={row.tema_singkat}
                  className="d-block text-bold-500 text-truncate mb-0">
                  {row.tema_singkat}
                  {/* {row.tema} */}
                </span>
              </div>
            </div>
          )
        },
        {
          name: "Status",
          selector: "status_deskripsi",
          sortable: true,
          minWidth: "200px",
          cell: row => (
            <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
              <div className="user-info text-truncate ml-xl-50 ml-0">
                <span
                  title={row.status_deskripsi}
                  className="d-block text-bold-500 text-truncate mb-0">
                  {row.status_deskripsi}
                </span>
              </div>
            </div>
          )
        },
        {
          name: "Tanggal dibuat",
          selector: "tgl_buat",
          sortable: true,
          minWidth: "200px",
          cell: row => (
            <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
              <div className="user-info text-truncate ml-xl-50 ml-0">
                <span
                  title={row.tgl_buat}
                  className="d-block text-bold-500 text-truncate mb-0">
                  {row.tgl_buat}
                </span>
              </div>
            </div>
          )
        },
        {
          name: "Tanggal tutup",
          selector: "tgl_tutup",
          sortable: true,
          minWidth: "200px",
          cell: row => (
            <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
              <div className="user-info text-truncate ml-xl-50 ml-0">
                <span
                  title={row.tgl_tutup}
                  className="d-block text-bold-500 text-truncate mb-0">
                  {row.tgl_tutup}
                </span>
              </div>
            </div>
          )
        },
      ],
    isLoading: false,
    modalVisible: false,
    modalImage: '',
    modalDigimonName: '',
    myProfile: null,
    basicPicker : new Date(),
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
        name: "Nama",
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
        name: "Done",
        selector: "done",
        sortable: true,
        minWidth: "200px",
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <a onClick={()=>this.viewDone(row)}>
                <span
                  title={row.done}
                  className="d-block text-bold-500 text-truncate mb-0"
                  >
                  {row.done}
                </span>
              </a>
            </div>
          </div>
        )
      },
      {
        name: "Pending",
        selector: "pending",
        sortable: true,
        minWidth: "200px",
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <a onClick={()=>this.viewPending(row)}>
                <span
                  title={row.pending}
                  className="d-block text-bold-500 text-truncate mb-0"
                  >
                  {row.pending}
                </span>
              </a>
            </div>
          </div>
        )
      },
    ],
    data: [],
    filteredData: [],
    value: "",
    cYear: new Date(),
    lYear: new Date()
  }

  componentDidMount=async()=>{
    await this.setState({isLoading: true});
    await this.isLogin('spv_df');

    var date = new Date();
    var cYear = date.getFullYear()
    var lYear = date.getFullYear()-1
    var lDate = date.getDay()
    await this.setState({cYear: cYear, lYear: lYear})

    await this.tarikDataTable();
    await this.setState({isLoading: false});
    

  }

  toggleModalDone = async(id) => {
    await this.setState(prevState => ({
      isLoading: true,
    }))

    let sql = `
        select dss.id, dss.tema, dstatus.status_deskripsi, 
        COALESCE(to_char(dss.tanggal_dibuat, 'DD Mon YYYY'), '') AS tgl_buat,
		COALESCE(to_char(dss.closed_date, 'DD Mon YYYY'), '') AS tgl_tutup 
        from df_suggestion_system dss
        join df_ss_status dstatus
        on dstatus.id_status = dss.ss_status_id 
        where dss.closed_date >= '`+this.state.cYear+`-01-01' 
        and dss.closed_date < '`+this.state.cYear+`-12-31'
        and (dss.ss_status_id = 6)  
        and (dss.pengusul_id = `+id+` or dss.pengusul_id_2 = `+id+`)
        order by id
    `
    var result = await axios.post(api_query, {
                                query : sql
                            })
                                .then(async(result) => {
                                let res = result.data.response.rows
                                console.log('result : ', res)
                                if (res.length == '') {
                                    return []
                                }else{
                                    var _temp = []

                                  for (let index = 0; index < res.length; index++) {
                                    const element = res[index].tema;
                                    var temaSingkat = element.split(' ').slice(0,2).join(' ')
                                    temaSingkat = temaSingkat + ' ... '

                                    var tema = res[index];
                                    tema.tema_singkat = temaSingkat

                                    // console.log('dummy : ', dummy)

                                    // // const elementTgl = res[index].tanggal_dibuat;
                                    // // var tgl = elementTgl.split('T')
                                    // console.log('tgl query : ', res[index].tgl)

                                    // console.log('tema singkat : ', temaSingkat)
                                    // // console.log('tanggal : ', tgl[0])
                                    // console.log('element:', element)

                                    _temp.push(tema)

                                  }

                                  await this.setState({dataDone: _temp})
                                }
                            }).catch(err => {
                                console.log('error : ', err)
                                return []
                            })


    await this.setState(prevState => ({
      isLoading: true,
      modalDone: !prevState.modalDone
    }))

    await this.setState({isLoading: false})
  }
  
  toggleModalFixDone = async() => {
    this.setState(prevState => ({
      modalDone: !prevState.modalDone,
      dataDone: []
    }))
  
  }

  viewDone = async(data) =>{
    console.log('viewDone : ', data)
    console.log('viewDone : ', data.id)
    await this.toggleModalDone(data.id);
  }




  toggleModalPending = async(id) => {
    await this.setState(prevState => ({
      isLoading: true,
    }))

    let sql = `
        select dss.id, dss.tema, dstatus.status_deskripsi, 
            COALESCE(to_char(dss.tanggal_dibuat, 'DD Mon YYYY'), '') AS tgl_buat,
            COALESCE(to_char(dss.closed_date, 'DD Mon YYYY'), '') AS tgl_tutup 			
            from df_suggestion_system dss 
            join df_ss_status dstatus
            on dstatus.id_status = dss.ss_status_id 
        where dss.tanggal_dibuat >= '`+this.state.cYear+`-01-01' 
        and dss.tanggal_dibuat < '`+this.state.cYear+`-12-31' 
        and (dss.ss_status_id < 6 or dss.ss_status_id = 7 or dss.ss_status_id = 10) 
        and (pengusul_id = `+id+` or pengusul_id_2 = `+id+`)
        order by id
    `
    var result = await axios.post(api_query, {
                                query : sql
                            })
                                .then(async(result) => {
                                let res = result.data.response.rows
                                console.log('result : ', res)
                                if (res.length == '') {
                                    return []
                                }else{
                                    var _temp = []

                                  for (let index = 0; index < res.length; index++) {
                                    const element = res[index].tema;
                                    var temaSingkat = element.split(' ').slice(0,2).join(' ')
                                    temaSingkat = temaSingkat + ' ... '

                                    var tema = res[index];
                                    tema.tema_singkat = temaSingkat

                                    // console.log('dummy : ', dummy)

                                    // // const elementTgl = res[index].tanggal_dibuat;
                                    // // var tgl = elementTgl.split('T')
                                    // console.log('tgl query : ', res[index].tgl)

                                    // console.log('tema singkat : ', temaSingkat)
                                    // // console.log('tanggal : ', tgl[0])
                                    // console.log('element:', element)

                                    _temp.push(tema)

                                  }

                                  await this.setState({dataPending: _temp})
                                }
                            }).catch(err => {
                                console.log('error : ', err)
                                return []
                            })


    await this.setState(prevState => ({
      isLoading: true,
      modalPending: !prevState.modalPending
    }))

    await this.setState({isLoading: false})
  }
  
  toggleModalFixPending = async() => {
    this.setState(prevState => ({
      modalPending: !prevState.modalPending,
      dataPending: []
    }))
  
  }

  viewPending = async(data) =>{
    console.log('viewPending : ', data)
    console.log('viewPending : ', data.id)
    await this.toggleModalPending(data.id);
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
        select distinct dmu.id, nik, name, departement_id, job_level, 
       		(select coalesce(count(dss.id),0) from df_suggestion_system dss 
       			where dss.closed_date >= '`+this.state.cYear+`-01-01' 
                and dss.closed_date < '`+this.state.cYear+`-12-31'
                and (dss.ss_status_id = 6)  
       			and (dss.pengusul_id = dmu.id or dss.pengusul_id_2 = dmu.id)) as done, 
			(select coalesce(count(dss.id),0) from df_suggestion_system dss 
				where dss.tanggal_dibuat >= '`+this.state.cYear+`-01-01' 
				and dss.tanggal_dibuat < '`+this.state.cYear+`-12-31' 
				and (dss.ss_status_id < 6 or dss.ss_status_id = 7 or dss.ss_status_id = 10) 
				and (dss.pengusul_id = dmu.id or dss.pengusul_id_2 = dmu.id) ) as pending       		
			from df_master_user dmu 
       		left join df_suggestion_system dss
       		on dss.pengusul_id = dmu.id or dss.pengusul_id_2 = dmu.id
       		where 
       			dmu.departement_id = `+this.state.myProfile.departement_id+` and 
       			job_level < '4'
            group by dmu.id
            order by dmu.id
    `

    // console.log('tarik data', sql)
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
                                    return
                                
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
          item.done.toLowerCase().startsWith(value.toLowerCase()) ||
          item.pending.toLowerCase().startsWith(value.toLowerCase())
          // item.name.toLowerCase().startsWith(value.toLowerCase())
          // item.date.toLowerCase().startsWith(value.toLowerCase()) ||
          // item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          // item.revenue.toLowerCase().startsWith(value.toLowerCase()) ||
          // item.status.toLowerCase().startsWith(value.toLowerCase())
        let includesCondition =
          item.nik.toLowerCase().includes(value.toLowerCase()) ||
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.done.toLowerCase().includes(value.toLowerCase()) ||
          item.pending.toLowerCase().includes(value.toLowerCase())
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

  viewSS = async(data, id) =>{
    console.log('view SS : ', id)
    // console.log('data row : ', data)
    this.props.changeViewPage('edit', data, id)
  }

  downloadPDF = async() =>{

  }

  render() {
    let { data, columns, value, filteredData } = this.state
    return (
        <>
          {this.state.isLoading?
            <Spinner/>
            :
            <div>
                <Breadcrumbs
                        breadCrumbTitle="Rekap SS"
                        breadCrumbParent="SS"
                        breadCrumbActive="Rekap SS"
                    />
                <Card>
                <CardHeader>
                <CardTitle>Rekap SS YTD</CardTitle>
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
                    <CustomHeader value={value} handleFilter={this.handleFilter} tarikData={this.tarikData} dataCsv={this.state.data}/>
                    // <CustomHeader value={value} handleFilter={this.handleFilter} tarikData={this.tarikDataTable}/>
                    }
                />
                </CardBody>
            </Card>
                <Modal
                      isOpen={this.state.modalDone}
                      toggle={this.toggleModalDone}
                      className="modal-dialog-centered"
                      backdrop="static"
                    >
                      <ModalHeader toggle={this.toggleModalFixDone} className="bg-success">
                        Rekap SS Done
                      </ModalHeader>
                      <ModalBody className="modal-dialog-centered">
                        {/* <Row> */}
                          <DataTable
                            className="dataTable-custom"
                            data={this.state.dataDone}
                            columns={this.state.columnsDone}
                            noHeader
                        />
                          {/* </Row> */}
                      </ModalBody>
                      <ModalFooter>
                      <Button color="danger" onClick={this.toggleModalFixDone}>
                        close
                      </Button>{" "}
                      </ModalFooter>
                </Modal>

                <Modal
                      isOpen={this.state.modalPending}
                      toggle={this.toggleModalPending}
                      className="modal-dialog-centered"
                      backdrop="static"
                    >
                      <ModalHeader toggle={this.toggleModalFixPending} className="bg-success">
                        Rekap SS Pending
                      </ModalHeader>
                      <ModalBody className="modal-dialog-centered">
                        {/* <Row> */}
                          <DataTable
                            className="dataTable-custom"
                            data={this.state.dataPending}
                            columns={this.state.columnsPending}
                            noHeader
                        />
                          {/* </Row> */}
                      </ModalBody>
                      <ModalFooter>
                      <Button color="danger" onClick={this.toggleModalFixPending}>
                        close
                      </Button>{" "}
                      </ModalFooter>
                </Modal>
            </div>
          }
      </>
    )
  }
}

export default SpvRekapSs
