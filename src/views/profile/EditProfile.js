import React, { useState } from "react"
import { api_query } from "../../api/ApiConstant"
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
  Label, Modal, ModalHeader, ModalBody, ModalFooter, Alert
} from "reactstrap"
import Checkbox from "../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Check, Star, Save, Send, X } from "react-feather"
// import { history } from "../../../../../src/history"
import Select from "react-select"
import SweetAlert from "react-bootstrap-sweetalert"
import Toggle from "react-toggle"
// import { history } from "../../../../src/history"
import { history } from "../../../src/history"
import "react-toggle/style.css"
import "../../assets/scss/plugins/forms/switch/react-toggle.scss"

class EditProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      myProfile:null,
      step: 0,
      modal: false,
      modalReject: false,
      isSweetAlert: false,
      sweetAlertTitle: 'Judul',
      sweetAlertText: 'Text',
      sweetAlertType: 'warning',
      isSweetAlertConfirm: false,
      sweetAlertTitleConfirm: 'Judul',
      sweetAlertTextConfirm: 'Text',
      sweetAlertTypeConfirm: 'warning',
      currentPass: '',
      newPassword: '',
      valPassword: '',
      /////////
      // cffNik: '',
      // cffName: '',
      // cffKondisiSaatIni: this.props.editData.kondisi_sekarang,
      // cffKondisiDiusulkan: this.props.editData.kondisi_diusulkan,
      // cffAlasanPerubahan: this.props.editData.alasan_perubahan,
      // cffDampakPerubahan: this.props.editData.dampak_perubahan,
      // password: this.props.editData.nik,
    }
}

componentDidMount = async() => {
  await this.isLogin();
  await this.tarikProfile();
  // await this.tarikDepartemen();
  // await this.tarikDataProfile();
  // await this.tarikDataFormCff();
  // await this.tarikKategori();
  // await this.tarikAtasan();

  console.log('props edit : ', this.props)
}

toggleModal = () => {
  this.setState(prevState => ({
    modal: !prevState.modal
  }))
}

toggleModalFix = async() => {
  this.setState(prevState => ({
    modal: !prevState.modal
  }))

  if (this.state.kategoriSelected == '' || this.state.kategoriSelected == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Kategori Tidak Boleh Kosong', 'warning')}
  else{
      if(this.state.isChecked){
        if (this.state.catatanCC == '' || this.state.catatanCC == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Catatan CC Tidak Boleh Kosong', 'warning')}
      }
  }

  if (this.state.isChecked) {
    console.log('isChecked')
    let sql = `
        with ins1 as(
            update df_cff
            set
            change_control = 'Y',
            catatan_cc = '`+this.state.catatanCC+`',
            status_cff_id = 3,
            update_by = `+this.state.myProfile.id+`,
            update_date = timezone('utc-7', now())
            where id = `+this.props.editData.cff_id+`
        returning id as return_id
        )
            update df_ss
            set
            ss_kategori_id = `+this.state.kategoriSelected+`,
            ss_status_id = 3,
            update_by = `+this.state.myProfile.id+`,
            update_date = timezone('utc-7', now())
            where id = `+this.props.editData.ds_id+`
        `
        // console.log('sql : ', sql)

        var result = await axios.post(api_query, {
                                    query : sql
                                })
                                    .then(async(result) => {
                                    let res = result.data.response
                                    // Beda dgn sweetAlert yg lain
                                    return await this.handleAlertConfirm('isSweetAlertConfirm', true, 'Success', 'Berhasil Approve SS', 'success')
                                    // this.props.changeViewPage('page')
                                }).catch(async(err) => {
                                    console.log('error : ', err)
                                    return await this.handleAlertConfirm('isSweetAlertConfirm', true, 'Danger', 'Gagal Approve SS', 'danger')
                                    // return []
                                })

  }else{
    console.log('not Checked')
    let sql = `
        with ins1 as(
            update df_cff
            set
            change_control = 'N',
            status_cff_id = 3,
            update_by = `+this.state.myProfile.id+`,
            update_date = timezone('utc-7', now())
            where id = `+this.props.editData.cff_id+`
        returning id as return_id
        )
            update df_ss
            set
            ss_kategori_id = `+this.state.kategoriSelected+`,
            ss_status_id = 3,
            update_by = `+this.state.myProfile.id+`,
            update_date = timezone('utc-7', now())
            where id = `+this.props.editData.ds_id+`
        `
        // console.log('sql : ', sql)

        var result = await axios.post(api_query, {
                                    query : sql
                                })
                                    .then(async(result) => {
                                    let res = result.data.response
                                    // Beda dgn sweetAlert yg lain
                                    return await this.handleAlertConfirm('isSweetAlertConfirm', true, 'Success', 'Berhasil Approve SS', 'success')
                                    // this.props.changeViewPage('page')
                                }).catch(async(err) => {
                                    console.log('error : ', err)
                                    return await this.handleAlertConfirm('isSweetAlertConfirm', true, 'Danger', 'Gagal Approve SS', 'danger')
                                    // return []
                                })
  }

}

toggleModalReject = () => {
  this.setState(prevState => ({
    modalReject: !prevState.modalReject
  }))
}

toggleModalRejectFix = async() => {
  this.setState(prevState => ({
    modalReject: !prevState.modalReject
  }))

  if (this.state.alasanReject == '' || this.state.alasanReject == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Alasan Reject Tidak Boleh Kosong', 'warning')}
  else{
    let sql = `
        with ins1 as(
            update df_cff
            set
            status_cff_id = 8,
            update_by = `+this.state.myProfile.id+`,
            update_date = timezone('utc-7', now())
            where id = `+this.props.editData.cff_id+`
        returning id as return_id
        )
            update df_ss
            set
            catatan_reject_delete = '`+this.state.alasanReject+`',
            ss_status_id = 8,
            update_by = `+this.state.myProfile.id+`,
            update_date = timezone('utc-7', now())
            where id = `+this.props.editData.ds_id+`
        `
        // console.log('sql : ', sql)

        var result = await axios.post(api_query, {
                                    query : sql
                                })
                                    .then(async(result) => {
                                    let res = result.data.response
                                    // Beda dgn sweetAlert yg lain
                                    return await this.handleAlertConfirm('isSweetAlertConfirm', true, 'Success', 'Berhasil Reject SS', 'success')
                                    // this.props.changeViewPage('page')
                                }).catch(async(err) => {
                                    console.log('error : ', err)
                                    return await this.handleAlertConfirm('isSweetAlertConfirm', true, 'Danger', 'Gagal Reject SS', 'danger')
                                    // return []
                                })

      }
}

saveForm = async() =>{

  var title = ''
  var text = ''
  var type = ''
  // console.log('SUBMIT : ', this.state.first_name)
  // console.log('SUBMIT : ', this.state.last_name)
  // console.log('event : ', e)


  if (this.state.newPassword == '' || this.state.newPassword == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Password Tidak Boleh Kosong', 'warning')}
  if (this.state.valPassword == '' || this.state.valPassword == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Validasi Password Tidak Boleh Kosong', 'warning')}
  if (this.state.newPassword != this.state.valPassword) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Password & Validasi Password Tidak Sama', 'warning')}
  // if (this.state.isChecked == '' || this.state.isChecked == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Status Karyawan Tidak Boleh Kosong', 'warning')}
  else {


      let sql = `
          update df_master_user
          set
          "password" = (select * from df_encrypt('`+this.state.newPassword+`'))
          where nik = '`+this.state.myProfile.nik+`'
      `
      // console.log('sql : ', sql)

      var result = await axios.post(api_query, {
                                  query : sql
                              })
                                  .then(async(result) => {
                                  let res = result.data.response
                                  // Beda dgn sweetAlert yg lain
                                  return await this.handleAlertConfirm('isSweetAlertConfirm', true, 'Success', 'Berhasil edit profile', 'success')
                                  // this.props.changeViewPage('page')
                              }).catch(async(err) => {
                                  console.log('error : ', err)
                                  return await this.handleAlertConfirm('isSweetAlertConfirm', true, 'Danger', 'Gagal edit profile', 'danger')
                                  // return []
                              })

  }

}

isLogin = async() =>{
  if (localStorage.getItem('account') == undefined || localStorage.getItem('account') == null) {
    history.push("/pages/login")
  }
  else{
    var myProfile = JSON.parse(localStorage.getItem('account'))
    console.log('myProfile ss : ', myProfile)
    this.setState({myProfile: myProfile})
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
                                console.log('result query kategori : ', res)
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


tarikProfile = async() =>{
  let sql = `
      select *, convert_from(df_decrypt(dmu.password), 'UTF8') as my_pass
      from df_master_user dmu
      where nik = '`+this.state.myProfile.nik+`'
  `
  var result = await axios.post(api_query, {
                              query : sql
                          })
                              .then(async(result) => {
                                var res = result.data.response.rows[0]
                                console.log('result query profile : ', res)
                                if (res.length == '') {
                                    return
                                }else{

                                  await this.setState({
                                    currentPass: res.my_pass,
                                  })
                                }

                                // await this.setState({dataAtasan: res})

                              }).catch(err => {
                                  console.log('error : ', err)
                                  return []
                              })
    // await this.setState({data: result})
}


handleAlertConfirm = (state, value, title, text, type) => {

  if (value) {
    this.setState({ [state] : value })
    this.setState({sweetAlertTitleConfirm: title, sweetAlertTextConfirm: text, sweetAlertTypeConfirm: type});
  }else{
    this.setState({ [state] : value })
    history.push("/home")
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

  render() {
    // const [centeredModal, setCenteredModal] = useState(false)
    return (
      <>
      {/* <Button.Ripple color="none" className="bg-gradient-warning mb-1" onClick={() => this.props.changeViewPage()}>Back</Button.Ripple> */}
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardBody>
            {/* <h4>Password</h4> */}
            <Form>
              <Row>
                <Col sm="12">
                  <FormGroup>
                    <Label for="ssTema">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={this.state.currentPass}
                      onChange={(val)=>this.setState({currentPass: val.target.value})}
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Label for="ssTema">Password Baru</Label>
                    <Input
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      placeholder="Ketik password baru"
                      value={this.state.newPassword}
                      onChange={(val)=>this.setState({newPassword: val.target.value})}
                      // disabled
                    />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Label for="ssTema">Validasi Password</Label>
                    <Input
                      type="password"
                      name="valPassword"
                      id="valPassword"
                      placeholder="Ketik ulang password baru"
                      value={this.state.valPassword}
                      onChange={(val)=>this.setState({valPassword: val.target.value})}
                      // disabled
                    />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                      <div className="d-flex justify-content-end">
                        <Button color="none" className="bg-gradient-success" onClick={() => this.saveForm()}>
                          <span className='align-middle ml-25'>Simpan </span>
                          <Check size={14}/>
                        </Button>
                      </div>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>

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
export default EditProfile
