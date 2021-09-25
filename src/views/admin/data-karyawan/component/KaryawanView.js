import React, { useState } from "react"
import { api_query } from "../../../../api/ApiConstant"
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
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Check, Star, Save, Send, X } from "react-feather"
// import { history } from "../../../../../src/history"
import Select from "react-select"
import SweetAlert from "react-bootstrap-sweetalert"
import Toggle from "react-toggle"
import { history } from "../../../../../src/history"
import "react-toggle/style.css"
import "../../../../assets/scss/plugins/forms/switch/react-toggle.scss"

class KaryawanView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      myProfile:null,
      step: 0,
      modal: false,
      modalReject: false,
      alasanReject: '',
      dataDepartemen: [],
      departemenSelected: this.props.editData.departement_id,
      isChecked: this.props.editData.active == 'N' ? false:true,
      catatanCC: '',
      isSweetAlert: false,
      sweetAlertTitle: 'Judul',
      sweetAlertText: 'Text',
      sweetAlertType: 'warning',
      isSweetAlertConfirm: false,
      sweetAlertTitleConfirm: 'Judul',
      sweetAlertTextConfirm: 'Text',
      sweetAlertTypeConfirm: 'warning',
      dataAtasan: [],
      /////////
      // cffNik: '',
      // cffName: '',
      // cffKondisiSaatIni: this.props.editData.kondisi_sekarang,
      // cffKondisiDiusulkan: this.props.editData.kondisi_diusulkan,
      // cffAlasanPerubahan: this.props.editData.alasan_perubahan,
      // cffDampakPerubahan: this.props.editData.dampak_perubahan,
      nik: this.props.editData.nik,
      nama: this.props.editData.name,
      statusAktif: this.props.editData.active,
      jobLevel : this.props.editData.job_level
    }
}

componentDidMount = async() => {
  await this.isLogin('super_admin');
  await this.tarikDepartemen();
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


  if (this.state.nama == '' || this.state.nama == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Nama Tidak Boleh Kosong', 'warning')}
  if (this.state.jobLevel == '' || this.state.jobLevel == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Job Level Tidak Boleh Kosong', 'warning')}
  if (this.state.departemenSelected == '' || this.state.departemenSelected == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Departemen Tidak Boleh Kosong', 'warning')}
  // if (this.state.isChecked == '' || this.state.isChecked == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Status Karyawan Tidak Boleh Kosong', 'warning')}
  else {

      var aktif = this.state.isChecked? 'Y':'N'

      let sql = `
          update df_master_user
          set
          name = '`+this.state.nama+`',
          job_level = '`+this.state.jobLevel+`',
          active = '`+aktif+`',
          departement_id = `+this.state.departemenSelected+`,
          update_by = `+this.state.myProfile.id+`,
          update_date = timezone('utc-7', now())
          where nik = '`+this.state.nik+`'
      `
      // console.log('sql : ', sql)

      var result = await axios.post(api_query, {
                                  query : sql
                              })
                                  .then(async(result) => {
                                  let res = result.data.response
                                  // Beda dgn sweetAlert yg lain
                                  return await this.handleAlertConfirm('isSweetAlertConfirm', true, 'Success', 'Berhasil edit karyawan', 'success')
                                  // this.props.changeViewPage('page')
                              }).catch(async(err) => {
                                  console.log('error : ', err)
                                  return await this.handleAlertConfirm('isSweetAlertConfirm', true, 'Danger', 'Gagal edit karyawan', 'danger')
                                  // return []
                              })

      // this.setState({isLoading: true});
      // console.log('result query : ', result)
      // this.props.changeViewPage('page')
      // // return await this.handleAlert('isSweetAlert', true, 'Success', 'Data Berhasil Ditambahkan '+this.state.first_name+ " "+ this.state.last_name, 'success')
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


tarikDataProfile = async() =>{
  let sql = `
      select nik, name, departement_id, nama_departemen, job_level from df_master_user dmu
      join df_master_departement dmd
      on dmu.departement_id = dmd.id
      where dmu.id = `+this.props.editData.pengusul_id+`
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

                                  await this.tarikAtasan(res.departement_id);
                                  await this.setState({
                                    cffNik: res.nik,
                                    cffName: res.name,
                                    cffNamaDepartemen: res.nama_departemen,
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
    // const [centeredModal, setCenteredModal] = useState(false)
    return (
      <>
      <Button.Ripple color="none" className="bg-gradient-warning mb-1" onClick={() => this.props.changeViewPage()}>Back</Button.Ripple>
        <Card>
          <CardHeader>
            <CardTitle>Data Karyawan</CardTitle>
          </CardHeader>
          <CardBody>
            <Form>
              <Row>
                <Col sm="12">
                  <FormGroup>
                    <Label for="ssTema">NIK</Label>
                    <Input
                      type="text"
                      name="nik"
                      id="nik"
                      placeholder="NIK"
                      value={this.state.nik}
                      onChange={(val)=>this.setState({nik: val.target.value})}
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Label for="ssTema">Nama lengkap</Label>
                    <Input
                      type="text"
                      name="nama"
                      id="nama"
                      placeholder="Nama lengkap"
                      value={this.state.nama}
                      onChange={(val)=>this.setState({nama: val.target.value})}
                      // disabled
                    />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Label for="">Pilih Departemen</Label>
                    <Select
                      className="React"
                      classNamePrefix="select"
                      value={this.state.dataDepartemen.filter(option => option.value == this.state.departemenSelected)}
                      // defaultValue={this.state.kategoriSelected != null? this.state.kategoriSelected:null}
                      name="clear"
                      options={this.state.dataDepartemen}
                      // isClearable={true}
                      onChange={(val)=>this.setState({departemenSelected: val.value})}
                      // onChange={(val)=>this.setState({ssAtasanSelected: val.target.value})}
                    />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Label for="ssTema">Job Level</Label>
                    <Input
                      type="text"
                      name="jobLevel"
                      id="jobLevel"
                      placeholder="Job Level"
                      value={this.state.jobLevel}
                      onChange={(val)=>this.setState({jobLevel: val.target.value})}
                      // disabled
                    />
                  </FormGroup>
                </Col>
                <Col sm="3">
                  <FormGroup>
                    <label className="react-toggle-wrapper">
                      Status Karyawan :
                      <Toggle
                        checked={this.state.isChecked}
                        // onChange={this.handleSwitchChange}
                        onChange={()=> this.setState({isChecked: !this.state.isChecked})}
                        name="controlledSwitch"
                        className={"ml-1"}
                        // value="yes"
                      />
                    </label>
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
                {/* <Col sm="12">
                  <FormGroup>
                    <div className="d-flex flex-wrap justify-content-between">
                      <div>
                        <Button color="none" className="bg-gradient-warning" onClick={() => this.setState({step: 0})}>Prev</Button>
                      </div>
                      <div className="justify-content-end">
                        <Button color="none" className="bg-gradient-warning mr-1" onClick={() => this.saveForm()}>
                          <span className='align-middle ml-25'>Simpan  </span>
                          <Save size={14}/>
                        </Button>
                        <Button color="none" className="bg-gradient-success" onClick={() => this.submitForm()}>
                          <span className='align-middle ml-25'>Kirim  </span>
                          <Send size={14}/>
                        </Button>
                      </div>
                    </div>
                  </FormGroup>
                </Col> */}
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
export default KaryawanView
