import React from "react"
import { api_query, project } from "../../../../api/ApiConstant"
import firebase from "../../../../firebase/firebase"
import axios from 'axios'
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label,
  CustomInput,
  CardImg
} from "reactstrap"

import img1 from "../../../../assets/img/pages/1.png"
import img2 from "../../../../assets/img/pages/2.png"


import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Check, Star, Save, Send } from "react-feather"
import { history } from "../../../../../src/history"
import Select from "react-select"
import SweetAlert from "react-bootstrap-sweetalert"
import Spinner from "../../../../components/@vuexy/spinner/Fallback-spinner"
import Toggle from "react-toggle"
import "react-toggle/style.css"
import "../../../../assets/scss/plugins/forms/switch/react-toggle.scss"


class DepartemenAdd extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      myProfile:null,
      isSweetAlert: false,
      sweetAlertTitle: 'Judul',
      sweetAlertText: 'Text',
      sweetAlertType: 'warning',
      isSweetAlertConfirm: false,
      sweetAlertTitleConfirm: 'Judul',
      sweetAlertTextConfirm: 'Text',
      sweetAlertTypeConfirm: 'warning',
      dataDepartement: [],
      departementSelected: null,
      nik: '',
      nama: '',
      jobLevel: '1',
      isChecked: true
    }
}

componentDidMount = async() => {
    await this.isLogin("super_admin")
    await this.tarikDepartemen()
}

submitForm = async() =>{


    if (this.state.nik == '' || this.state.nik == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'NIK Tidak Boleh Kosong', 'warning')}
    if (this.state.nama == '' || this.state.nama == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Nama Lengkap Tidak Boleh Kosong', 'warning')}
    if (this.state.jobLevel == '' || this.state.jobLevel == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Job Level Tidak Boleh Kosong', 'warning')}
    if (this.state.departementSelected == '' || this.state.departementSelected == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Departemen Tidak Boleh Kosong', 'warning')}
    else {
  
      this.setState({isLoading: true})

        var active = this.state.isChecked? 'Y':'N'
        var pass = 'onekalbe21'  
        var role = 'op_df'

        if (this.state.jobLevel == '1' || this.state.jobLevel == '2' || this.state.jobLevel == '3') {
            role = 'op_df'
        }
        if (this.state.jobLevel == '4'){
            role = 'spv_df'
        }
        if (this.state.jobLevel == '5'){
            role = 'spv_df'
        }

        //besok cek NIK dulu
        var sql = `
           select id, nik from df_master_user where nik = '`+this.state.nik+`'
        `

        
        // console.log('sql : ', sql)
  
        var result = await axios.post(api_query, {
                                    query : sql
                                })
                                    .then(async(result) => {
                                    let res = result.data.response.rows
                                    
                                    if (res.length == '') {
                                      // query insert
                                    }else{
                                      return await this.handleAlertConfirm('isSweetAlertConfirm', true, 'Warning', 'NIK Sudah digunakan', 'warning')
                                    }

                                    // Beda dgn sweetAlert yg lain
                                    // return await this.handleAlertConfirm('isSweetAlertConfirm', true, 'Success', 'Berhasil tambah karyawan', 'success')
                                    // this.props.changeViewPage('page')
                                }).catch(async(err) => {
                                    console.log('error : ', err)
                                    return await this.handleAlertConfirm('isSweetAlertConfirm', true, 'Danger', 'Gagal tambah karyawan', 'danger')
                                    // return []
                                })
  
    this.setState({isLoading: false})
  
  
  }
}

tarikDepartemen = async() =>{

    let sql = `
      select  id as value,
              nama_departemen as label
      from df_master_departement
    `
  
    var result = await axios.post(api_query, {
                                query : sql
                            })
                                .then(async(result) => {
                                  var res = result.data.response.rows
                                //   console.log('result query kategori : ', res)
                                  if (res.length == '') {
                                      return []
                                  }
  
                                  await this.setState({dataDepartement: res})
  
                                }).catch(err => {
                                    console.log('error : ', err)
                                    return []
                                })
      // await this.setState({data: result})
  }
  

isLogin = async(role) =>{
  if (localStorage.getItem('account') == undefined || localStorage.getItem('account') == null) {
    history.push("/pages/login")
  }else if(JSON.parse(localStorage.getItem('account')).role !== role){
    history.push("/pages/login")
  }
  else{
    var myProfile = JSON.parse(localStorage.getItem('account'))
    console.log('myProfile ss : ', myProfile)
    this.setState({myProfile: myProfile})
  }
}

handleAlertConfirm = (state, value, title, text, type) => {

  if (value) {
    this.setState({ [state] : value })
    this.setState({sweetAlertTitleConfirm: title, sweetAlertTextConfirm: text, sweetAlertTypeConfirm: type});
  }else{
    this.setState({ [state] : value })
    this.props.changeViewPage('page')
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


  render() {
    return (
      <>
      {this.state.isLoading?
        <Spinner/>
      :
      <div>
        <Button.Ripple color="none" className="bg-gradient-warning mb-1" onClick={() => this.props.changeViewPage()}>Back</Button.Ripple>

        <Card>
        <CardHeader>
          <CardTitle>Tambah Karyawan</CardTitle>
        </CardHeader>
        <CardBody>
          <Form>
            <Row>
              <Col sm="12">
                <FormGroup>
                  <div className="d-flex flex-wrap justify-content-end">
                    <div className="justify-content-end">
                      {/* <Button color="none" className="bg-gradient-warning mr-1" onClick={() => this.saveForm()}>
                        <span className='align-middle ml-25'>Simpan  </span>
                        <Save size={14}/>
                      </Button> */}
                      <Button color="none" className="bg-gradient-success" onClick={() => this.submitForm()}>
                        {/* Kirim */}
                        <span className='align-middle ml-25'>Buat Departemen  </span>
                        <Send size={14}/>
                      </Button>
                    </div>
                  </div>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      </div>
      }
      
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
export default DepartemenAdd
