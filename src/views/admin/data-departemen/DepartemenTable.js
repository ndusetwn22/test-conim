import React from "react"
import { api_query } from "../../../api/ApiConstant"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Badge,
  FormGroup,
  Input,
  Button, Label, Modal, ModalHeader, ModalBody, ModalFooter, Alert

} from "reactstrap"
import Select from "react-select"
import DataTable from "react-data-table-component"
import { Star, Search,
    Edit,
    Trash,
    ChevronDown,
    Plus,
    Check,
    ChevronLeft,
    ChevronRight } from "react-feather"
import axios from 'axios'
import { history } from "../../../../src/history"
import Toggle from "react-toggle"
import SweetAlert from "react-bootstrap-sweetalert"


const CustomHeader = props => {
  return (
    <div className="d-flex flex-wrap justify-content-between">
      {/* <div className="d-flex flex-wrap justify-content-end"> */}
      <div className="add-new">
        <Button.Ripple color="none" className="bg-gradient-success" onClick={() => props.departemenAdd()}>Tambah Departemen</Button.Ripple>
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


  const ActionsComponent = props => {
    return (
      <div className="data-list-action">
        <Button.Ripple className="mr-1 bg-gradient-success" color="none" size="sm"
          onClick={()=> {
            // console.log('props : ', props);
            return props.isView(props.row, props.row.id, props.row.cff_id)
          }}>View</Button.Ripple>
      </div>
    )
  }



class DepartemenTable extends React.Component {
  state = {
    modalVisible: false,
    modalImage: '',
    modalDigimonName: '',
    myProfile: null,
    modal: false,
    modalAdd: false,
    id: 0,
    namaDepartemen: '',
    namaDepartemenAdd: '',
    isSweetAlert: false,
    sweetAlertTitle: 'Judul',
    sweetAlertText: 'Text',
    sweetAlertType: 'warning',
    isSweetAlertConfirm: false,
    sweetAlertTitleConfirm: 'Judul',
    sweetAlertTextConfirm: 'Text',
    sweetAlertTypeConfirm: 'warning',
  columns: [
      {
        name: "Id",
        selector: "id",
        sortable: true,
        minWidth: "200px",
        cell: row =>
        (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.id}
                className="d-block text-bold-500 text-truncate mb-0">
                {row.id}
                {/* {row.tema} */}
              </span>
            </div>
          </div>
        )
      },
      {
        name: "Nama Departemen",
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
        name: "Actions",
        sortable: true,
        cell: row =>
        (
          <>
            <ActionsComponent
              row={row}
              isView={this.toggleModal}
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
    await this.isLogin('super_admin');
    await this.tarikDataTable();

    // await this.tarikData();
    // await this.tarikDataPostgre();

    // console.log('state data:', typeof(this.state.data))
    // console.log('local', JSON.parse(localStorage.getItem('account')).role)

  }

  departemenAdd = async()=>{
    console.log('Depatemen Add')
    await this.toggleModalAdd();
  }

  toggleModalAdd = (data, id) => {
    // this.setState(prevState => ({
    //   modal: !prevState.modal
    // }))

    this.setState(prevState => ({
      modalAdd: !prevState.modalAdd,
    }))
  }

  toggleModalAddFix = async() => {
    this.setState(prevState => ({
      modalAdd: !prevState.modalAdd
    }))

    let sql = `
        insert into df_master_departement(nama_departemen)
        values('`+this.state.namaDepartemenAdd+`')
    `
      // console.log('sql : ', sql)

      var result = await axios.post(api_query, {
                                  query : sql
                              })
                                  .then(async(result) => {
                                  let res = result.data.response
                                  // Beda dgn sweetAlert yg lain
                                  return await this.handleAlertConfirm('isSweetAlertConfirm', true, 'Success', 'Berhasil tambah departemen', 'success')
                                  // this.props.changeViewPage('page')
                              }).catch(async(err) => {
                                  console.log('error : ', err)
                                  return await this.handleAlertConfirm('isSweetAlertConfirm', true, 'Danger', 'Gagal tambah nama departemen', 'danger')
                                  // return []
                        })
  }

  toggleModal = (data, id) => {
    // this.setState(prevState => ({
    //   modal: !prevState.modal
    // }))

    this.setState(prevState => ({
      modal: !prevState.modal,
      namaDepartemen: data.nama_departemen,
      id: data.id
    }))
  }

  toggleModalFix = async() => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))

    let sql = `
        update df_master_departement
        set
        nama_departemen = '`+this.state.namaDepartemen+`',
        update_date = timezone('utc-7', now())
        where id = `+this.state.id+`
    `
      // console.log('sql : ', sql)

      var result = await axios.post(api_query, {
                                  query : sql
                              })
                                  .then(async(result) => {
                                  let res = result.data.response
                                  // Beda dgn sweetAlert yg lain
                                  return await this.handleAlertConfirm('isSweetAlertConfirm', true, 'Success', 'Berhasil ganti nama departemen', 'success')
                                  // this.props.changeViewPage('page')
                              }).catch(async(err) => {
                                  console.log('error : ', err)
                                  return await this.handleAlertConfirm('isSweetAlertConfirm', true, 'Danger', 'Gagal ganti nama departemen', 'danger')
                                  // return []
                        })
  }

  handleAlertConfirm = async(state, value, title, text, type) => {

    if (value) {
      this.setState({ [state] : value })
      this.setState({sweetAlertTitleConfirm: title, sweetAlertTextConfirm: text, sweetAlertTypeConfirm: type});
    }else{
      this.setState({ [state] : value })
      await this.tarikDataTable();

      // this.props.changeViewPage('page')
  }
    // if(text == "Berhasil membuat SS"){
    //   this.setState({ [state] : value })
    //   this.setState({sweetAlertTitle: title, sweetAlertText: text, sweetAlertType: type});
    //   // this.props.changeViewPage('page')
    // }else{}
  }

  handleAlert = (state, value, title, text, type) => {
      if (value) {
        this.setState({ [state] : value })
        this.setState({sweetAlertTitle: title, sweetAlertText: text, sweetAlertType: type});
      }else{
        this.setState({ [state] : value })
      }
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
        select * from df_master_departement order by id asc
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
                                    this.setState({data: res})
                                }

                                // else{
                                //   var _temp = []

                                //   for (let index = 0; index < res.length; index++) {
                                //     const element = res[index].tema;
                                //     var temaSingkat = element.split(' ').slice(0,2).join(' ')
                                //     temaSingkat = temaSingkat + ' ... '

                                //     var tema = res[index];
                                //     tema.tema_singkat = temaSingkat

                                //     // console.log('dummy : ', dummy)

                                //     // // const elementTgl = res[index].tanggal_dibuat;
                                //     // // var tgl = elementTgl.split('T')
                                //     // console.log('tgl query : ', res[index].tgl)

                                //     // console.log('tema singkat : ', temaSingkat)
                                //     // // console.log('tanggal : ', tgl[0])
                                //     // console.log('element:', element)

                                //     _temp.push(tema)

                                //   }

                                //   await this.setState({data: _temp})
                                // }
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
          item.id.toLowerCase().startsWith(value.toLowerCase()) ||
          item.nama_departemen.toLowerCase().startsWith(value.toLowerCase())
          // item.name.toLowerCase().startsWith(value.toLowerCase())
          // item.date.toLowerCase().startsWith(value.toLowerCase()) ||
          // item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          // item.revenue.toLowerCase().startsWith(value.toLowerCase()) ||
          // item.status.toLowerCase().startsWith(value.toLowerCase())
        let includesCondition =
          item.id.toLowerCase().includes(value.toLowerCase()) ||
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
    // console.log('view SS : ', id)
    console.log('data row : ', data)



    // this.props.changeViewPage('edit', data, id)
  }

  render() {
    let { data, columns, value, filteredData } = this.state
    return (
        <>
            <Card>
                <CardHeader>
                <CardTitle>Departemen</CardTitle>
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
                    <CustomHeader value={value} handleFilter={this.handleFilter} departemenAdd={this.departemenAdd}/>
                    // <CustomHeader value={value} handleFilter={this.handleFilter} tarikData={this.tarikDataTable}/>
                    }
                />
                </CardBody>
            </Card>
            {/* <ModalDigimon {...this.state} {...this.props}
                        // modalImage={this.state.modalImage}
                        // modalVisible={this.state.modalVisible}
                        toggleModal={this.toggleModalDigimon}></ModalDigimon> */}

                      {/* Approve */}
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.toggleModal} className="bg-success">
            Edit Nama Departemen
          </ModalHeader>
          <ModalBody className="modal-dialog-centered">
                  {/* <FormGroup> */}
                    <Label for="catatan">Nama Departemen</Label>
                    <Input
                      type="text"
                      name="catatan"
                      id="catatan"
                      placeholder="Catatan CC"
                      value={this.state.namaDepartemen}
                      onChange={(val)=>this.setState({namaDepartemen: val.target.value})}
                      // required
                    />
                  {/* </FormGroup> */}
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.toggleModalFix}>
              Ganti nama departemen
            </Button>{" "}
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.modalAdd}
          toggle={this.toggleModalAdd}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.toggleModalAdd} className="bg-success">
            Tambah Departemen
          </ModalHeader>
          <ModalBody className="modal-dialog-centered">
                  {/* <FormGroup> */}
                    <Label for="catatan">Nama Departemen</Label>
                    <Input
                      type="text"
                      name="catatan"
                      id="catatan"
                      placeholder="Nama Departemen"
                      value={this.state.namaDepartemenAdd}
                      onChange={(val)=>this.setState({namaDepartemenAdd: val.target.value})}
                      // required
                    />
                  {/* </FormGroup> */}
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.toggleModalAddFix}>
              Tambah departemen
            </Button>{" "}
          </ModalFooter>
        </Modal>

        <SweetAlert type={this.state.sweetAlertType} title={this.state.sweetAlertTitle}
          show={this.state.isSweetAlert}
          onConfirm={() => this.handleAlert("isSweetAlert", false)}
        >
            <p className="sweet-alert-text">
              {this.state.sweetAlertText}
            </p>
        </SweetAlert>

        <SweetAlert type={this.state.sweetAlertTypeConfirm} title={this.state.sweetAlertTitleConfirm}
          show={this.state.isSweetAlertConfirm}
          onConfirm={() => this.handleAlertConfirm("isSweetAlertConfirm", false)}
        >
            <p className="sweet-alert-text">
              {this.state.sweetAlertTextConfirm}
            </p>
        </SweetAlert>
      </>
    )
  }
}

export default DepartemenTable
