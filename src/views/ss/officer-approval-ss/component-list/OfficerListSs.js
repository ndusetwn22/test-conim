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
import { MyPdf } from "../component/ExportPdf"


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
                    <ExcelColumn label="Foto Kondisi Sebelum" value="foto_kondisi_sebelum"/>
                    <ExcelColumn label="Foto Kondisi Sesudah" value="foto_kondisi_sesudah"/>
                </ExcelSheet>
                {/* <ExcelSheet data={dataSet2} name="Leaves">
                    <ExcelColumn label="Name" value="name"/>
                    <ExcelColumn label="Total Leaves" value="total"/>
                    <ExcelColumn label="Remaining Leaves" value="remaining"/>
                </ExcelSheet> */}
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

const ActionsComponent = props => {
  return (
    <div className="data-list-action">
          <Button.Ripple className="mr-1 bg-gradient-success" color="none" size="sm"
            onClick={()=> {
              // console.log('props : ', props);
              return props.isView(props.row, props.row.ds_id)
            }}>
            View</Button.Ripple>
    </div>
    // <>
    //   <MyPdf/>
    // </>
  )
}

class OfficerListSs extends React.Component {
  state = {
    modalApproval: false,
    dataApproval: [],
    columnsApproval: [
      {
        name: "Nama",
        selector: "nama",
        sortable: true,
        minWidth: "200px",
        cell: row =>
        (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.name}
                className="d-block text-bold-500 text-truncate mb-0">
                {row.name}
                {/* {row.tema} */}
              </span>
            </div>
          </div>
        )
      },
      {
        name: "Status",
        selector: "approval_rejected_status",
        sortable: true,
        minWidth: "200px",
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.approval_rejected_status}
                className="d-block text-bold-500 text-truncate mb-0">
                {row.approval_rejected_status}
              </span>
            </div>
          </div>
        )
      },
      {
        name: "Tanggal",
        selector: "approve_date",
        sortable: true,
        minWidth: "200px",
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.approve_date}
                className="d-block text-bold-500 text-truncate mb-0">
                {row.approve_date}
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
        name: "Tema",
        selector: "tema",
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
        name: "Tanggal dibuat",
        selector: "tgl",
        sortable: true,
        minWidth: "200px",
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.tgl}
                className="d-block text-bold-500 text-truncate mb-0">
                {row.tgl}
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
              <a onClick={()=>this.viewApproval(row)}>
                <span
                  title={row.status_deskripsi}
                  className="d-block text-bold-500 text-truncate mb-0"
                  >
                  {row.status_deskripsi}
                </span>
              </a>
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
              // isDownload={this.downloadPDF}
              isView={this.viewSS}
            />
          </>
        )
      }
    ],
    data: [],
    filteredData: [],
    value: ""
  }

  componentDidMount=async()=>{
    await this.setState({isLoading: true});
    await this.isLogin('officer_df');
    await this.tarikDataTable();
    await this.setState({isLoading: false});

    // await this.tarikData();
    // await this.tarikDataPostgre();

    // console.log('state data:', typeof(this.state.data))
    // console.log('local', JSON.parse(localStorage.getItem('account')).role)

  }

  toggleModalApproval = async(id) => {
    await this.setState(prevState => ({
      isLoading: true,
      // modalApproval: !prevState.modalApproval
    }))

    let sql = `
        select dsha.ss_id, dsha.approved_rejected_by_id, dmu."name", dsha.approval_rejected_status, dsha.create_date, COALESCE(to_char(dsha.create_date , 'DD Mon YYYY HH24:MI:SS'), '') AS approve_date from df_ss_history_approval dsha 
        join df_master_user dmu
        on dsha.approved_rejected_by_id = dmu.id 
        where dsha.ss_id = `+id+`
        order by dsha.id asc
    `
    var result = await axios.post(api_query, {
                                query : sql
                            })
                                .then(async(result) => {
                                let res = result.data.response.rows
                                console.log('result : ', result)
                                if (res.length == '') {
                                    return []
                                }else{
                                  await this.setState({dataApproval: res})
                                }
                            }).catch(err => {
                                console.log('error : ', err)
                                return []
                            })


    await this.setState(prevState => ({
      isLoading: true,
      modalApproval: !prevState.modalApproval
    }))

    await this.setState({isLoading: false})
  }
  
  toggleModalFixApproval = async() => {
    this.setState(prevState => ({
      modalApproval: !prevState.modalApproval,
      dataApproval: []
    }))
  
  }

  viewApproval = async(data) =>{
    console.log('viewApproval : ', data)
    console.log('viewApproval : ', data.ds_id)
    await this.toggleModalApproval(data.ds_id);
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

  toggleModalDigimon = async(name, img) =>{
      console.log('LAUNCH TOGGLE DIGIMON')

      if (name == undefined) {
        await this.setState({
            modalVisible: false,
            modalImage: null,
            modalNameDigimon: ''
        })
      }else{
        await this.setState({
            modalVisible: !this.state.modalVisible,
            modalImage: img,
            modalDigimonName: name
        })
      }


  }

  tarikDataTable = async() =>{

    // select *, to_char(ds.tanggal_dibuat, 'dd Mon yyyy') as tgl, dss.status_deskripsi, ds.id as ds_id

    // SELECT tema, pengusul_id, pegusul_id_2, fasilitator_id, tanggal_dibuat, lokasi, ss_kategori_id, kondisi_sebelum, kondisi_sesudah, permasalahan, improvement, foto_kondisi_sebelum, foto_kondisi_sesudah, foto_permasalahan, foto_improvement, biaya, biaya_uraian, keuntungan, keuntungan_uraian, ss_status_id, change_control, nomor_cc, catatan_reject_delete, catatan_return, jenis_saving, nomor_ss, closed_date, create_by, create_date, update_by, update_date, ss_kategori_2_id,
    // to_char(ds.tanggal_dibuat, 'dd Mon yyyy') as tgl, dss.status_deskripsi, ds.id as ds_id


    // let sql = `
    // select *, to_char(ds.tanggal_dibuat, 'dd Mon yyyy') as tgl, to_char(ds.closed_date, 'dd Mon yyyy') as closed_date, dss.status_deskripsi, ds.id as ds_id
    //         from df_suggestion_system ds
    //         join df_ss_status dss
    //         on ds.ss_status_id = dss.id
    //   where
    //     ss_status_id = `+6+`
    //     order by ds.id desc
    // `

    let sql = `
    select  ds.id as ds_id,
            ds.pengusul_id,
            ds.pengusul_id_2,
            dmu.name as pengusul_1,
            dmu2.name as pengusul_2,
            dmd.nama_departemen,
            dmd2.nama_departemen as departement_terdampak,
            ds.tema,
            ds.lokasi,
            ds.permasalahan,
            ds.improvement,
            ds.fasilitator_id,
            ds.foto_kondisi_sebelum,
            ds.foto_kondisi_sesudah,
            ds.biaya,
            ds.biaya_uraian,
            ds.keuntungan,
            ds.keuntungan_uraian,
            ds.nomor_ss,
            ds.nomor_cc,
            ds.change_control,
            ds.jenis_saving,
            ds.catatan_reject_delete,
            ds.catatan_return,
            dss.status_deskripsi,
            ds.create_by,
            ds.create_date,
            ds.update_by,
            ds.update_date,
            coalesce(ds.pengusul_id_2 ,0) as wkwk, 
            to_char(ds.tanggal_dibuat, 'dd Mon yyyy') as tgl, 
            to_char(ds.closed_date, 'dd Mon yyyy') as closed_date,
            dsk.nama_kategori,
            dsk2.nama_kategori_2  
        from df_suggestion_system ds
        join df_ss_status dss
        on ds.ss_status_id = dss.id
        join df_master_user dmu
        on ds.pengusul_id = dmu.id 
        left join df_master_user dmu2
        on ds.pengusul_id_2 = dmu2.id
        join df_master_departement dmd
        on dmu.departement_id = dmd.id 
        join df_master_departement dmd2
        on ds.departement_terdampak_id = dmd2.id
        left join df_ss_kategori dsk
        on dsk.id = ds.ss_kategori_id 
        left join df_ss_kategori_2 dsk2
        on dsk2.id = ds.ss_kategori_2_id  
        where
        ss_status_id = `+6+`
        order by ds.id desc
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

                                  await this.setState({data: _temp})
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
          item.tema.toLowerCase().startsWith(value.toLowerCase()) ||
          item.tgl.toLowerCase().startsWith(value.toLowerCase()) ||
          item.status_deskripsi.toLowerCase().startsWith(value.toLowerCase())
          // item.name.toLowerCase().startsWith(value.toLowerCase())
          // item.date.toLowerCase().startsWith(value.toLowerCase()) ||
          // item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          // item.revenue.toLowerCase().startsWith(value.toLowerCase()) ||
          // item.status.toLowerCase().startsWith(value.toLowerCase())
        let includesCondition =
          item.tema.toLowerCase().includes(value.toLowerCase()) ||
          item.tgl.toLowerCase().includes(value.toLowerCase()) ||
          item.status_deskripsi.toLowerCase().includes(value.toLowerCase())
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
                        breadCrumbTitle="List SS"
                        breadCrumbParent="SS"
                        breadCrumbActive="List SS"
                    />
                <Card>
                <CardHeader>
                <CardTitle>List SS Officer</CardTitle>
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
                      isOpen={this.state.modalApproval}
                      toggle={this.toggleModalApproval}
                      className="modal-dialog-centered"
                      backdrop="static"
                    >
                      <ModalHeader toggle={this.toggleModalFixApproval} className="bg-success">
                        List approval
                      </ModalHeader>
                      <ModalBody className="modal-dialog-centered">
                        {/* <Row> */}
                          <DataTable
                            className="dataTable-custom"
                            data={this.state.dataApproval}
                            columns={this.state.columnsApproval}
                            noHeader
                        />
                          {/* </Row> */}
                      </ModalBody>
                      <ModalFooter>
                      <Button color="danger" onClick={this.toggleModalFixApproval}>
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

export default OfficerListSs
