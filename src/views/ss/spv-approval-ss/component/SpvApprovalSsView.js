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
  CustomInput,
  CardImg,
  Label, Modal, ModalHeader, ModalBody, ModalFooter, Alert
} from "reactstrap"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Check, Star, Save, Send, X, RotateCcw } from "react-feather"
import { history } from "../../../../../src/history"
import Select from "react-select"
import SweetAlert from "react-bootstrap-sweetalert"
import Toggle from "react-toggle"
import "react-toggle/style.css"
import "../../../../assets/scss/plugins/forms/switch/react-toggle.scss"
import Spinner from "../../../../components/@vuexy/spinner/Fallback-spinner"
import img1 from "../../../../assets/img/pages/1.png"
import img2 from "../../../../assets/img/pages/2.png"


class SpvApprovalSsView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fotoKondisiSebelum: this.props.editData.foto_kondisi_sebelum != ''? this.props.editData.foto_kondisi_sebelum:img1,
      fotoKondisiSebelumFile: null,
      fotoKondisiSesudah: this.props.editData.foto_kondisi_sesudah != ''? this.props.editData.foto_kondisi_sesudah:img2,
      fotoKondisiSesudahFile: null,
      isCheckedFoto: this.props.editData.foto_kondisi_sebelum != '' || this.props.editData.foto_kondisi_sesudah != '' ? true:false,
      img: img2,
      isLoading: false,
      myProfile:null,
      step: 0,
      isCheckedPartner: this.props.editData.pengusul_id_2 == 0 ? false:true,
      ssPartner: this.props.editData.pengusul_id_2,
      dataPartner: [],
      modal: false,
      modalReject: false,
      modalReturn: false,
      alasanReturn: '',

      alasanReject: '',
      dataKategori: [],
      kategoriSelected: null,
      isChecked: false,
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
      cffNik: '',
      cffName: '',
      cffNamaDepartemen: '',
      cffKondisiSaatIni: '',
      cffKondisiDiusulkan: '',
      cffAlasanPerubahan: '',
      cffDampakPerubahan: '',
      // ssAtasanSelected: null,
      // ssTema: '',
      // ssLokasi: '',
      // ssKondisiSebelum: '',
      // ssKondisiSesudah: '',
      // ssPermasalahan: '',
      // ssImprovement: '',
      // ssBiaya: 0,
      // ssBiayaUraian: '',
      // ssKeuntungan: 0,
      // ssKeuntunganUraian: '',
      /////////
      // cffNik: '',
      // cffName: '',
      // cffKondisiSaatIni: this.props.editData.kondisi_sekarang,
      // cffKondisiDiusulkan: this.props.editData.kondisi_diusulkan,
      // cffAlasanPerubahan: this.props.editData.alasan_perubahan,
      // cffDampakPerubahan: this.props.editData.dampak_perubahan,
      ssAtasanSelected: this.props.editData.fasilitator_id,
      ssTema: this.props.editData.tema,
      ssLokasi: this.props.editData.lokasi,
      ssKondisiSebelum: this.props.editData.kondisi_sebelum,
      ssKondisiSesudah: this.props.editData.kondisi_sesudah,
      ssPermasalahan: this.props.editData.permasalahan,
      ssImprovement: this.props.editData.improvement,
      ssBiaya: parseInt(this.props.editData.biaya),
      ssBiayaUraian: this.props.editData.biaya_uraian,
      ssKeuntungan: parseInt(this.props.editData.keuntungan),
      ssKeuntunganUraian: this.props.editData.keuntungan_uraian,
    }
}

componentDidMount = async() => {
  await this.setState({isLoading: true})
  await this.isLogin('spv_df');
  await this.tarikDataProfile();
  // await this.tarikDataFormCff();
  await this.tarikPartner();
  await this.tarikKategori();
  await this.setState({isLoading: false})
  // await this.tarikAtasan();

  console.log('props edit : ', this.props)
}

toggleModalReturn = () => {
  this.setState(prevState => ({
    modalReturn: !prevState.modalReturn
  }))
}

toggleModalReturnFix = async() => {
  this.setState(prevState => ({
    modalReturn: !prevState.modalReturn
  }))


  if (this.state.alasanReturn == '' || this.state.alasanReturn == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Alasan Return Tidak Boleh Kosong', 'warning')}
  else{
    // let sql = `
    //     with ins1 as(
    //         update df_cff
    //         set
    //         status_cff_id = 7,
    //         update_by = `+this.state.myProfile.id+`,
    //         update_date = now()
    //         where id = `+this.props.editData.cff_id+`
    //     returning id as return_id
    //     )
    //         update df_ss
    //         set
    //         catatan_return = '`+this.state.alasanReturn+`',
    //         ss_status_id = 7,
    //         update_by = `+this.state.myProfile.id+`,
    //         update_date = now()
    //         where id = `+this.props.editData.ds_id+`
    //     `

    let sql = `
          with ins1 as (
            update df_suggestion_system
            set
            catatan_return = '`+this.state.alasanReturn+`',
            ss_status_id = 7,
            update_by = `+this.state.myProfile.id+`,
            update_date = timezone('utc-7', now())
            where id = `+this.props.editData.ds_id+`
          returning id as return_id)

            INSERT INTO df_ss_history_approval
            (ss_id, approved_rejected_by_id, approval_rejected_status, create_by, create_date)
            VALUES((select return_id from ins1), `+this.state.myProfile.id+`, 'Returned', `+this.state.myProfile.id+`, timezone('utc-7', now()));
        `
        // console.log('sql : ', sql)

        var result = await axios.post(api_query, {
                                    query : sql
                                })
                                    .then(async(result) => {
                                    let res = result.data.response
                                    // Beda dgn sweetAlert yg lain
                                    return await this.handleAlertConfirm('isSweetAlertConfirm', true, 'Success', 'Berhasil Return SS', 'success')
                                    // this.props.changeViewPage('page')
                                }).catch(async(err) => {
                                    console.log('error : ', err)
                                    return await this.handleAlertConfirm('isSweetAlertConfirm', true, 'Danger', 'Gagal Return SS', 'danger')
                                    // return []
                                })
      }
}

onImageChange = async(event) => {
  this.setState({fotoKondisiSebelumFile: event.target.files})
  if (event.target.files && event.target.files[0]) {
    let reader = new FileReader();
    reader.onload = (e) => {
      this.setState({fotoKondisiSebelum: e.target.result});
    };
    reader.readAsDataURL(event.target.files[0]);
  }
}

onImageChange2 = async(event) => {
  this.setState({fotoKondisiSesudahFile: event.target.files})
  if (event.target.files && event.target.files[0]) {
    let reader = new FileReader();
    reader.onload = (e) => {
      this.setState({fotoKondisiSesudah: e.target.result});
    };
    reader.readAsDataURL(event.target.files[0]);
  }
}

tarikPartner = async() =>{

  let sql = `
  select id as value,
    name as label,
    departement_id
  from df_master_user dmu
  where departement_id = `+this.state.myProfile.departement_id+`
  and job_level != '4'
  and job_level != '5'
  and dmu.id != `+this.state.myProfile.id+`
  order by dmu.name asc
  `

  var result = await axios.post(api_query, {
                              query : sql
                          })
                              .then(async(result) => {
                                var res = result.data.response.rows
                                console.log('result query atasan : ', res)
                                if (res.length == '') {
                                    return []
                                }

                                await this.setState({dataPartner: res})

                              }).catch(err => {
                                  console.log('error : ', err)
                                  return []
                              })
    // await this.setState({data: result})
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
        if (this.state.catatanCC == '' || this.state.catatanCC == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'No CC Tidak Boleh Kosong', 'warning')}
      }
  }

  if (this.state.isChecked) {
    console.log('isChecked')
    // let sql = `
    //     with ins1 as(
    //         update df_cff
    //         set
    //         change_control = 'Y',
    //         catatan_cc = '`+this.state.catatanCC+`',
    //         status_cff_id = 3,
    //         update_by = `+this.state.myProfile.id+`,
    //         update_date = now()
    //         where id = `+this.props.editData.cff_id+`
    //     returning id as return_id
    //     )
    //         update df_ss
    //         set
    //         ss_kategori_id = `+this.state.kategoriSelected+`,
    //         ss_status_id = 3,
    //         update_by = `+this.state.myProfile.id+`,
    //         update_date = now()
    //         where id = `+this.props.editData.ds_id+`
    //     `

    let sql = `
          with ins1 as ( 
            update df_suggestion_system
            set
            change_control = 'Y',
            nomor_cc = '`+this.state.catatanCC+`',
            ss_kategori_id = `+this.state.kategoriSelected+`,
            ss_status_id = 3,
            update_by = `+this.state.myProfile.id+`,
            update_date = timezone('utc-7', now())
            where id = `+this.props.editData.ds_id+`
          returning id as return_id)

            INSERT INTO df_ss_history_approval
            (ss_id, approved_rejected_by_id, approval_rejected_status, create_by, create_date)
            VALUES((select return_id from ins1), `+this.state.myProfile.id+`, 'Approved', `+this.state.myProfile.id+`, timezone('utc-7', now()));
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
    // let sql = `
    //     with ins1 as(
    //         update df_cff
    //         set
    //         change_control = 'N',
    //         status_cff_id = 3,
    //         update_by = `+this.state.myProfile.id+`,
    //         update_date = now()
    //         where id = `+this.props.editData.cff_id+`
    //     returning id as return_id
    //     )
    //         update df_ss
    //         set
    //         ss_kategori_id = `+this.state.kategoriSelected+`,
    //         ss_status_id = 3,
    //         update_by = `+this.state.myProfile.id+`,
    //         update_date = now()
    //         where id = `+this.props.editData.ds_id+`
    //     `

    let sql = `
            with ins1 as ( 
              update df_suggestion_system
              set
              change_control = 'N',
              ss_kategori_id = `+this.state.kategoriSelected+`,
              ss_status_id = 3,
              update_by = `+this.state.myProfile.id+`,
              update_date = timezone('utc-7', now())
              where id = `+this.props.editData.ds_id+`
            returning id as return_id)

            INSERT INTO df_ss_history_approval
            (ss_id, approved_rejected_by_id, approval_rejected_status, create_by, create_date)
            VALUES((select return_id from ins1), `+this.state.myProfile.id+`, 'Approved', `+this.state.myProfile.id+`, timezone('utc-7', now()));
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
    // let sql = `
    //     with ins1 as(
    //         update df_cff
    //         set
    //         status_cff_id = 8,
    //         update_by = `+this.state.myProfile.id+`,
    //         update_date = now()
    //         where id = `+this.props.editData.cff_id+`
    //     returning id as return_id
    //     )
    //         update df_ss
    //         set
    //         catatan_reject_delete = '`+this.state.alasanReject+`',
    //         ss_status_id = 8,
    //         update_by = `+this.state.myProfile.id+`,
    //         update_date = now()
    //         where id = `+this.props.editData.ds_id+`
    //     `

        let sql = `
          with ins1 as (  
            update df_suggestion_system
            set
            catatan_reject_delete = '`+this.state.alasanReject+`',
            ss_status_id = 8,
            update_by = `+this.state.myProfile.id+`,
            update_date = timezone('utc-7', now())
            where id = `+this.props.editData.ds_id+`
          returning id as return_id)
          
            INSERT INTO df_ss_history_approval
            (ss_id, approved_rejected_by_id, approval_rejected_status, create_by, create_date)
            VALUES((select return_id from ins1), `+this.state.myProfile.id+`, 'Rejected', `+this.state.myProfile.id+`, timezone('utc-7', now()));  
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

tarikAtasan = async(departement_id) =>{



  let sql = `
  select id as value,
    name as label,
    departement_id
  from df_master_user dmu
  where departement_id = `+departement_id+`
  and job_level = '4'
  `

  var result = await axios.post(api_query, {
                              query : sql
                          })
                              .then(async(result) => {
                                var res = result.data.response.rows
                                console.log('result query atasan : ', res)
                                if (res.length == '') {
                                    return []
                                }

                                await this.setState({dataAtasan: res})

                              }).catch(err => {
                                  console.log('error : ', err)
                                  return []
                              })
    // await this.setState({data: result})
  }

tarikKategori = async() =>{

let sql = `
  select  id as value,
          nama_kategori as label
  from df_ss_kategori
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

                              await this.setState({dataKategori: res})

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

tarikDataFormCff = async() =>{
  let sql = `
      select * from df_cff dc where dc.id = `+this.props.editData.cff_id+`
  `
  var result = await axios.post(api_query, {
                              query : sql
                          })
                              .then(async(result) => {
                                var res = result.data.response.rows[0]
                                console.log('result query cff : ', res)
                                if (res.length == '') {
                                    return
                                }else{
                                  await this.setState({
                                    cffKondisiSaatIni: res.kondisi_sekarang,
                                    cffKondisiDiusulkan: res.kondisi_diusulkan,
                                    cffAlasanPerubahan: res.alasan_perubahan,
                                    cffDampakPerubahan: res.dampak_perubahan,
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


rejectForm = async() =>{

}

approveForm = async() =>{

}

  render() {
    // const [centeredModal, setCenteredModal] = useState(false)
    return (
      <>
      {this.state.isLoading?
        <Spinner/>
      : 
        <div>
          <Button.Ripple color="none" className="bg-gradient-warning mb-1" onClick={() => this.props.changeViewPage()}>Back</Button.Ripple>
          <Card>
          <CardHeader>
            <CardTitle>SS Form</CardTitle>
          </CardHeader>
          <CardBody>
            <Form>
              <Row>
              <Col sm="12">
                  <FormGroup>
                    <Label for="nik">NIK</Label>
                    <Input
                      type="text"
                      name="nik"
                      id="nik"
                      placeholder="NIK"
                      // value={this.state.myProfile == null ? '':this.state.myProfile.nik}
                      value={this.state.cffNik}
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name"
                      // value={this.state.myProfile == null ? '':this.state.myProfile.name}
                      value={this.state.cffName}
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Label for="departement">Departement</Label>
                    <Input
                      type="text"
                      name="departement"
                      id="departement"
                      placeholder="Departement"
                      // value={this.state.myProfile == null ? '':this.state.myProfile.nama_departemen}
                      value={this.state.cffNamaDepartemen}
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col sm="3">
                    <FormGroup>
                        Pengusul 2 : &nbsp;<i>*optional</i>{"\n"}
                      <label className="react-toggle-wrapper">
                        <Toggle
                          checked={this.state.isCheckedPartner}
                          // onChange={this.handleSwitchChange}
                          onChange={()=> this.setState({isCheckedPartner: !this.state.isCheckedPartner})}
                          name="controlledSwitch"
                          className={"mt-1"}
                          disabled={true}
                          // value="yes"
                        />
                      </label>
                    </FormGroup>
                </Col>
                {this.state.isCheckedPartner?
                <Col sm="12">
                  <FormGroup>
                    <Label for="">Pilih Pengusul 2</Label>
                    <Select
                      className="React"
                      classNamePrefix="select"
                      defaultValue={this.state.dataPartner.filter(x => x.value == this.state.ssPartner)}
                      name="clear"
                      options={this.state.dataPartner}
                      onChange={(val)=>this.setState({ssPartner: val.value})}
                      isDisabled={true}
                    />
                  </FormGroup>
                </Col>
                :null}
                <Col sm="12">
                  <FormGroup>
                    <Label for="">Pilih Fasilitator</Label>
                    <Select
                      className="React"
                      classNamePrefix="select"
                      // defaultValue={colourOptions[1]}
                      defaultValue={this.state.dataAtasan.filter(x => x.value === this.state.ssAtasanSelected)}
                      name="clear"
                      options={this.state.dataAtasan}
                      // isClearable={true}
                      onChange={(val)=>this.setState({ssAtasanSelected: val.value})}
                      isDisabled={true}
                      // disabled
                    />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Label for="ssTema">Tema</Label>
                    <Input
                      type="text"
                      name="ssTema"
                      id="ssTema"
                      placeholder="Tema"
                      value={this.state.ssTema}
                      onChange={(val)=>this.setState({ssTema: val.target.value})}
                      disabled
                      // required
                    />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Label for="ssLokasi">Lokasi</Label>
                    <Input
                      type="text"
                      name="ssLokasi"
                      id="ssLokasi"
                      placeholder="Lokasi Suggestion System"
                      value={this.state.ssLokasi}
                      onChange={(val)=>this.setState({ssLokasi: val.target.value})}
                      disabled
                      // required
                    />
                  </FormGroup>
                </Col>
                {/* <Col sm="12">
                  <FormGroup>
                    <Label for="">Kondisi Sebelum Perbaikan</Label>
                    <Input
                      type="textarea"
                      rows="3"
                      id='ssKondisiSebelum'
                      onChange={(val)=>this.setState({ssKondisiSebelum: val.target.value})}
                      value={this.state.ssKondisiSebelum}
                      placeholder={'Jelaskan kondisi sebelum perbaikan'}
                      disabled
                      // required
                      />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Label for="">Kondisi Sesudah Perbaikan</Label>
                    <Input
                      type="textarea"
                      rows="3"
                      id='ssKondisiSesudah'
                      onChange={(val)=>this.setState({ssKondisiSesudah: val.target.value})}
                      value={this.state.ssKondisiSesudah}
                      placeholder={'Jelaskan kondisi setelah perbaikan'}
                      disabled
                      // required
                      />
                  </FormGroup>
                </Col> */}
                <Col sm="12">
                  <FormGroup>
                    <Label for="">Permasalahan yang ada</Label>
                    <Input
                      type="textarea"
                      rows="3"
                      id='ssPermasalahan'
                      onChange={(val)=>this.setState({ssPermasalahan: val.target.value})}
                      value={this.state.ssPermasalahan}
                      placeholder={'Jelaskan permasalahan yang ada'}
                      disabled
                      // required
                      />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Label for="">Improvement yang dilakukan</Label>
                    <Input
                      type="textarea"
                      rows="3"
                      id='ssImprovement'
                      onChange={(val)=>this.setState({ssImprovement: val.target.value})}
                      value={this.state.ssImprovement}
                      placeholder={'Jelaskan improvement yang dilakukan'}
                      disabled
                      // required
                      />
                  </FormGroup>
                </Col>
                <Col sm="3">
                        <FormGroup>
                            Melampirkan foto : &nbsp;<i>*optional</i>{"\n"}
                          <label className="react-toggle-wrapper">
                            <Toggle
                              checked={this.state.isCheckedFoto}
                              // onChange={this.handleSwitchChange}
                              onChange={()=> this.setState({isCheckedFoto: !this.state.isCheckedFoto})}
                              name="controlledSwitch"
                              className={"mt-1"}
                              disabled={true}
                              // value="yes"
                            />
                          </label>
                        </FormGroup>
                    </Col>
                    {this.state.isCheckedFoto?
                    <div>
                        <Row  className="d-flex flex-wrap justify-content-center">
                        <Col lg="4" md="6" sm="6">
                          <Card>
                            <CardBody>
                              <CardImg
                                onContextMenu={(e)=> e.preventDefault()}
                                className="img-fluid mb-2"
                                // src={'https://firebasestorage.googleapis.com/v0/b/df-conim.appspot.com/o/dev%2Fss%2F2%2FKondisiSebelum?alt=media&token=4e77a992-3047-46d4-a141-f2dbe63b6b94'}
                                src={this.state.fotoKondisiSebelum}
                                alt="card image cap"
                                // style={{width: 400, height: 300}}
                              />
                              <p>Kondisi Sebelum</p>
                            </CardBody>
                          </Card>
                        </Col>
                        <Col lg="4" md="6" sm="6">
                          <Card>
                            <CardBody>
                              <CardImg
                                onContextMenu={(e)=> e.preventDefault()}
                                className="img-fluid mb-2"
                                src={this.state.fotoKondisiSesudah}
                                alt="card image cap"
                                // style={{width: 400, height: 300}}
                              />
                              <p>Kondisi Sesudah</p>
                            </CardBody>
                          </Card>
                        </Col>
                        </Row>
                        <Col sm="12">
                          <FormGroup className="has-icon-left position-relative">
                            <Label for="profileImage">Pilih Foto Kondisi Sebelum</Label>
                            <CustomInput
                              type="file"
                              id="exampleCustomFileBrowser"
                              name="profileImage"
                              accept="image/*"
                              onChange={(event)=> this.onImageChange(event)}
                              disabled={true}
                              // onChange={(val)=>this.setState({fotoKondisiSebelum:val.target.files})}
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="12">
                          <FormGroup className="has-icon-left position-relative">
                            <Label for="profileImage">Pilih Foto Kondisi Sesudah</Label>
                            <CustomInput
                              type="file"
                              id="exampleCustomFileBrowser"
                              name="profileImage"
                              accept="image/*"
                              onChange={(event)=> this.onImageChange2(event)}
                              disabled={true}
                              // onChange={(val)=>this.setState({fotoKondisiSebelum:val.target.files})}
                            />
                          </FormGroup>
                        </Col>
                        </div>
                      :null}
                <Col sm="12">
                  <FormGroup>
                    <Label for="">Biaya Uraian</Label>
                    <Input
                      type="textarea"
                      rows="3"
                      id='ssBiayaUraian'
                      onChange={(val)=>this.setState({ssBiayaUraian: val.target.value})}
                      value={this.state.ssBiayaUraian}
                      placeholder={'Jelaskan uraian biaya yang dibutuhkan'}
                      disabled
                      // required
                      />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Label for="ssBiaya">Total Biaya</Label>
                    <Input
                      type="number"
                      name="ssBiaya"
                      id="ssBiaya"
                      placeholder="Total biaya"
                      value={this.state.ssBiaya}
                      onChange={(val)=>this.setState({ssBiaya: val.target.value})}
                      disabled
                      // required
                    />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Label for="">Keuntungan (Cost Saving) Uraian</Label>
                    <Input
                      type="textarea"
                      rows="3"
                      id='ssKeuntunganUraian'
                      onChange={(val)=>this.setState({ssKeuntunganUraian: val.target.value})}
                      value={this.state.ssKeuntunganUraian}
                      placeholder={'Jelaskan uraian keuntungan (cost saving)'}
                      disabled
                      // required
                      />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Label for="ssKeuntungan">Total Keuntungan (cost saving)</Label>
                    <Input
                      type="number"
                      name="ssKeuntungan"
                      id="ssKeuntungan"
                      placeholder="Total keuntungan (cost saving)"
                      value={this.state.ssKeuntungan}
                      onChange={(val)=>this.setState({ssKeuntungan: val.target.value})}
                      disabled
                      // required
                    />
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <div className="d-flex flex-wrap justify-content-end">
                      {/* <div>
                        <Button color="none" className="bg-gradient-warning" onClick={() => this.setState({step: 0})}>Prev</Button>
                      </div> */}
                      <div className="justify-content-end">
                        <Button color="primary" className="mr-1" onClick={() => this.toggleModalReturn()}>
                          <span className='align-middle ml-25'>Return  </span>
                          <RotateCcw size={14}/>
                        </Button>
                        <Button color="none" className="bg-gradient-danger mr-1" onClick={() => this.toggleModalReject()}>
                          <span className='align-middle ml-25'>Reject  </span>
                          <X size={14}/>
                        </Button>
                        <Button color="none" className="bg-gradient-success" onClick={() => this.toggleModal()}>
                          <span className='align-middle ml-25'>Approve  </span>
                          <Check size={14}/>
                        </Button>
                      </div>
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

        </div>
      }

        {/* Approve */}
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.toggleModal} className="bg-success">
            Approve Suggestion System
          </ModalHeader>
          <ModalBody className="modal-dialog-centered">
            <Row>
                <Col sm="12">
                  <FormGroup>
                    <Label for="">Pilih Kategori Suggestion System</Label>
                    <Select
                      className="React"
                      classNamePrefix="select"
                      value={this.state.dataKategori.filter(option => option.value == this.state.kategoriSelected)}
                      // defaultValue={this.state.kategoriSelected != null? this.state.kategoriSelected:null}
                      name="clear"
                      options={this.state.dataKategori}
                      // isClearable={true}
                      onChange={(val)=>this.setState({kategoriSelected: val.value})}
                      // onChange={(val)=>this.setState({ssAtasanSelected: val.target.value})}
                    />
                  </FormGroup>
                </Col>
                <Col sm="6">
                  <FormGroup>
                    <label className="react-toggle-wrapper">
                      Diperlukan CC :
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
                {this.state.isChecked?
                <Col sm="12">
                  <FormGroup>
                    <Label for="catatan">Nomor CC</Label>
                    <Input
                      type="text"
                      name="catatan"
                      id="catatan"
                      placeholder="Nomor CC"
                      value={this.state.catatanCC}
                      onChange={(val)=>this.setState({catatanCC: val.target.value})}
                      // required
                    />
                  </FormGroup>
                </Col>: null}
              </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.toggleModalFix}>
              Approve
            </Button>{" "}
          </ModalFooter>
        </Modal>

        {/* Reject */}
        <Modal
          isOpen={this.state.modalReject}
          toggle={this.toggleModalReject}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.toggleModalReject} className="bg-danger">
            Reject Suggestion System
          </ModalHeader>
          <ModalBody className="modal-dialog-centered">
            <Col sm="12">
              <FormGroup>
                <Label for="nik">Alasan reject</Label>
                <Input
                  type="text"
                  name="reject"
                  id="reject"
                  placeholder="Jelaskan alasan reject"
                  value={this.state.alasanReject}
                  onChange={(val)=>this.setState({alasanReject: val.target.value})}
                  // disabled
                />
              </FormGroup>
            </Col>
          </ModalBody>
          <ModalFooter>
            <Button color="none" className="bg-gradient-danger" onClick={this.toggleModalRejectFix}>
              Reject
            </Button>{" "}
          </ModalFooter>
        </Modal>

        {/* Return */}
        <Modal
          isOpen={this.state.modalReturn}
          toggle={this.toggleModalReturn}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.toggleModalReturn} className="bg-primary">
            Return Suggestion System
          </ModalHeader>
          <ModalBody className="modal-dialog-centered">
            <Col sm="12">
              <FormGroup>
                <Label for="nik">Alasan return</Label>
                <Input
                  type="text"
                  name="return"
                  id="return"
                  placeholder="Jelaskan alasan return"
                  value={this.state.alasanReturn}
                  onChange={(val)=>this.setState({alasanReturn: val.target.value})}
                  // disabled
                />
              </FormGroup>
            </Col>
          </ModalBody>
          <ModalFooter>
            <Button color="none" className="bg-gradient-primary" onClick={this.toggleModalReturnFix}>
              Return
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
export default SpvApprovalSsView
