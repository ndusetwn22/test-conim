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
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Check, Star, Save, Send } from "react-feather"
import { history } from "../../../../../src/history"
import Select from "react-select"
import SweetAlert from "react-bootstrap-sweetalert"
import Spinner from "../../../../components/@vuexy/spinner/Fallback-spinner"
import { Alert } from "reactstrap"
import Toggle from "react-toggle"
import "react-toggle/style.css"
import "../../../../assets/scss/plugins/forms/switch/react-toggle.scss"
import img1 from "../../../../assets/img/pages/1.png"
import img2 from "../../../../assets/img/pages/2.png"

class OpSsEdit extends React.Component {
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
      isChecked: this.props.editData.pengusul_id_2 == 0 ? false:true,
      ssPartner: this.props.editData.pengusul_id_2,
      isSweetAlert: false,
      sweetAlertTitle: 'Judul',
      sweetAlertText: 'Text',
      sweetAlertType: 'warning',
      isSweetAlertConfirm: false,
      sweetAlertTitleConfirm: 'Judul',
      sweetAlertTextConfirm: 'Text',
      sweetAlertTypeConfirm: 'warning',
      dataAtasan: [],
      dataPartner: [],
      // cffNik: '',
      // cffName: '',
      // cffKondisiSaatIni: '',
      // cffKondisiDiusulkan: '',
      // cffAlasanPerubahan: '',
      // cffDampakPerubahan: '',
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
      cffNik: '',
      cffName: '',
      cffKondisiSaatIni: this.props.editData.kondisi_sekarang,
      cffKondisiDiusulkan: this.props.editData.kondisi_diusulkan,
      cffAlasanPerubahan: this.props.editData.alasan_perubahan,
      cffDampakPerubahan: this.props.editData.dampak_perubahan,
      ssAtasanSelected: this.props.editData.fasilitator_id,
      ssTema: this.props.editData.tema,
      ssLokasi: this.props.editData.lokasi,
      // ssKondisiSebelum: this.props.editData.kondisi_sebelum,
      // ssKondisiSesudah: this.props.editData.kondisi_sesudah,
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
  await this.isLogin('op_df');
  await this.tarikPartner();
  await this.tarikAtasan();
  // await this.setState({dataAtasan: this.props.dataAtasan})

  // setTimeout(async() => {
  //   await this.tarikAtasan();
  // }, 3000);

  console.log('props edit : ', this.props)
  await this.setState({isLoading: false})
  // console.log('atasan : ', this.props.editData.fasilitator_id)
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

tarikAtasan = async() =>{



  let sql = `
  select id as value,
    name as label,
    departement_id
  from df_master_user dmu
  where departement_id = `+this.state.myProfile.departement_id+`
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

submitForm = async() =>{

  var title = ''
  var text = ''
  var type = ''
  // console.log('SUBMIT : ', this.state.first_name)
  // console.log('SUBMIT : ', this.state.last_name)
  // console.log('event : ', e)


  // if (this.state.cffKondisiSaatIni == '' || this.state.cffKondisiSaatIni == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'CFF Kondisi Saat Ini Tidak Boleh Kosong', 'warning')}
  // if (this.state.cffKondisiDiusulkan == '' || this.state.cffKondisiDiusulkan == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'CFF Kondisi Diusulkan Tidak Boleh Kosong', 'warning')}
  // if (this.state.cffAlasanPerubahan == '' || this.state.cffAlasanPerubahan == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'CFF Alasan Perubahan Tidak Boleh Kosong', 'warning')}
  // if (this.state.cffDampakPerubahan == '' || this.state.cffDampakPerubahan == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'CFF Dampak Perubahan Tidak Boleh Kosong', 'warning')}
  if (this.state.ssAtasanSelected == '' || this.state.ssAtasanSelected == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Fasilitator Tidak Boleh Kosong', 'warning')}
  if (this.state.ssTema == '' || this.state.ssTema == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Tema Tidak Boleh Kosong', 'warning')}
  if (this.state.ssLokasi == '' || this.state.ssLokasi == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Lokasi Tidak Boleh Kosong', 'warning')}
  // if (this.state.ssKondisiSebelum == '' || this.state.ssKondisiSebelum == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Kondisi Sebelum Tidak Boleh Kosong', 'warning')}
  // if (this.state.ssKondisiSesudah == '' || this.state.ssKondisiSesudah == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Kondisi Sesudah Tidak Boleh Kosong', 'warning')}
  if (this.state.ssPermasalahan == '' || this.state.ssPermasalahan == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Permasalahan Tidak Boleh Kosong', 'warning')}
  if (this.state.ssImprovement == '' || this.state.ssImprovement == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Improvement Tidak Boleh Kosong', 'warning')}
  if (this.state.ssBiayaUraian == '' || this.state.ssBiayaUraian == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Biaya Uraian Tidak Boleh Kosong', 'warning')}
  if (this.state.ssBiaya == '' || this.state.ssBiaya == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Biaya Tidak Boleh Kosong', 'warning')}
  if (this.state.ssKeuntunganUraian == '' || this.state.ssKeuntunganUraian == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Keuntungan Uraian Tidak Boleh Kosong', 'warning')}
  if (this.state.ssKeuntungan == '' || this.state.ssKeuntungan == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Keuntungan Tidak Boleh Kosong', 'warning')}
  else {

      this.setState({isLoading: true})

      let r = (Math.random() + 5).toString(36).substring(2);
      let r2 = (Math.random() + 10).toString(36).substring(2);
      // console.log("random", r);
      // console.log("random", r2);
      var myurl = this.props.editData.foto_kondisi_sebelum
      var myurl2 = this.props.editData.foto_kondisi_sesudah

      if (this.state.fotoKondisiSebelum != img1 && this.state.fotoKondisiSebelumFile != null) {
        var bucketName = project
        var file = this.state.fotoKondisiSebelumFile[0]
        var storageRef = await firebase.storage().ref(`${bucketName}/ss/${this.state.myProfile.id}/KondisiSebelum-${r}`)
        let uploadTask = await storageRef.put(file)
        myurl = await storageRef.getDownloadURL().catch((error)=>{throw error});
        console.log('myurl : ', myurl)
      }
      
      if (this.state.fotoKondisiSesudah != img2 && this.state.fotoKondisiSesudahFile != null){
        var bucketName2 = project
        var file2 = this.state.fotoKondisiSesudahFile[0]
        var storageRef2 = await firebase.storage().ref(`${bucketName2}/ss/${this.state.myProfile.id}/KondisiSesudah-${r2}`)
        let uploadTask2 = await storageRef2.put(file2)
        myurl2 = await storageRef2.getDownloadURL().catch((error)=>{throw error});
        console.log('myurl : ', myurl2)
      }

      if (!this.state.isCheckedFoto) {
        myurl = ''
        myurl2 = ''
      }


      //news 
      // let sql = `
      //   UPDATE df_suggestion_system
      //   SET tema='`+this.state.ssTema+`', 
      //   pengusul_id=`+this.state.myProfile.id+`,
      //   fasilitator_id='`+this.state.ssAtasanSelected+`', 
      //   lokasi='`+this.state.ssLokasi+`', 
      //   permasalahan='`+this.state.ssPermasalahan+`', 
      //   improvement='`+this.state.ssImprovement+`', 
      //   biaya=`+this.state.ssBiaya+`, 
      //   biaya_uraian='`+this.state.ssBiayaUraian+`', 
      //   keuntungan=`+this.state.ssKeuntungan+`, 
      //   keuntungan_uraian='`+this.state.ssKeuntunganUraian+`', 
      //   ss_status_id=2, 
      //   update_by=`+this.state.myProfile.id+`, 
      //   update_date=now()
      //   where id = `+this.props.editData.ds_id+`
      // `

      if (this.state.isChecked) {
          if (this.state.ssPartner == '' || this.state.ssPartner == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Pengusul 2 Tidak Boleh Kosong', 'warning')}
          else{
            var sql = `
            with ins1 as (
              UPDATE df_suggestion_system
              SET tema='`+this.state.ssTema+`', 
              pengusul_id=`+this.state.myProfile.id+`,
              pengusul_id_2=`+this.state.ssPartner+`,
              fasilitator_id='`+this.state.ssAtasanSelected+`', 
              lokasi='`+this.state.ssLokasi+`', 
              permasalahan='`+this.state.ssPermasalahan+`', 
              improvement='`+this.state.ssImprovement+`', 
              biaya=`+this.state.ssBiaya+`, 
              biaya_uraian='`+this.state.ssBiayaUraian+`', 
              keuntungan=`+this.state.ssKeuntungan+`, 
              keuntungan_uraian='`+this.state.ssKeuntunganUraian+`', 
              ss_status_id=2,
              foto_kondisi_sebelum = '`+myurl+`',
              foto_kondisi_sesudah = '`+myurl2+`',
              update_by=`+this.state.myProfile.id+`, 
              update_date=timezone('utc-7', now())
              where id = `+this.props.editData.ds_id+`
            returning id as return_id)

            INSERT INTO df_ss_history_approval
            (ss_id, approved_rejected_by_id, approval_rejected_status, create_by, create_date)
            VALUES((select return_id from ins1), `+this.state.myProfile.id+`, 'Approved', `+this.state.myProfile.id+`, timezone('utc-7', now()));
            `
          }
        }else{
          var sql = `
          with ins1 as (
              UPDATE df_suggestion_system
              SET tema='`+this.state.ssTema+`', 
              pengusul_id=`+this.state.myProfile.id+`,
              pengusul_id_2= 0,
              fasilitator_id='`+this.state.ssAtasanSelected+`', 
              lokasi='`+this.state.ssLokasi+`', 
              permasalahan='`+this.state.ssPermasalahan+`', 
              improvement='`+this.state.ssImprovement+`', 
              biaya=`+this.state.ssBiaya+`, 
              biaya_uraian='`+this.state.ssBiayaUraian+`', 
              keuntungan=`+this.state.ssKeuntungan+`, 
              keuntungan_uraian='`+this.state.ssKeuntunganUraian+`', 
              ss_status_id=2, 
              foto_kondisi_sebelum = '`+myurl+`',
              foto_kondisi_sesudah = '`+myurl2+`',
              update_by=`+this.state.myProfile.id+`, 
              update_date=timezone('utc-7', now())
              where id = `+this.props.editData.ds_id+`
          returning id as return_id)

              INSERT INTO df_ss_history_approval
              (ss_id, approved_rejected_by_id, approval_rejected_status, create_by, create_date)
              VALUES((select return_id from ins1), `+this.state.myProfile.id+`, 'Approved', `+this.state.myProfile.id+`, timezone('utc-7', now()));
            `
        }
      // console.log('sql : ', sql)

      var result = await axios.post(api_query, {
                                  query : sql
                              })
                                  .then(async(result) => {
                                  let res = result.data.response
                                  // Beda dgn sweetAlert yg lain
                                  return await this.handleAlertConfirm('isSweetAlertConfirm', true, 'Success', 'Berhasil edit & kirim SS', 'success')
                                  // this.props.changeViewPage('page')
                              }).catch(async(err) => {
                                  console.log('error : ', err)
                                  return await this.handleAlertConfirm('isSweetAlertConfirm', true, 'Danger', 'Gagal edit & kirim SS', 'danger')
                                  // return []
                              })

     this.setState({isLoading: false})
  }

}

saveForm = async() =>{

  var title = ''
  var text = ''
  var type = ''
  // console.log('SUBMIT : ', this.state.first_name)
  // console.log('SUBMIT : ', this.state.last_name)
  // console.log('event : ', e)


  // if (this.state.cffKondisiSaatIni == '' || this.state.cffKondisiSaatIni == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'CFF Kondisi Saat Ini Tidak Boleh Kosong', 'warning')}
  // if (this.state.cffKondisiDiusulkan == '' || this.state.cffKondisiDiusulkan == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'CFF Kondisi Diusulkan Tidak Boleh Kosong', 'warning')}
  // if (this.state.cffAlasanPerubahan == '' || this.state.cffAlasanPerubahan == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'CFF Alasan Perubahan Tidak Boleh Kosong', 'warning')}
  // if (this.state.cffDampakPerubahan == '' || this.state.cffDampakPerubahan == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'CFF Dampak Perubahan Tidak Boleh Kosong', 'warning')}
  if (this.state.ssAtasanSelected == '' || this.state.ssAtasanSelected == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Fasilitator Tidak Boleh Kosong', 'warning')}
  if (this.state.ssTema == '' || this.state.ssTema == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Tema Tidak Boleh Kosong', 'warning')}
  if (this.state.ssLokasi == '' || this.state.ssLokasi == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Lokasi Tidak Boleh Kosong', 'warning')}
  // if (this.state.ssKondisiSebelum == '' || this.state.ssKondisiSebelum == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Kondisi Sebelum Tidak Boleh Kosong', 'warning')}
  // if (this.state.ssKondisiSesudah == '' || this.state.ssKondisiSesudah == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Kondisi Sesudah Tidak Boleh Kosong', 'warning')}
  if (this.state.ssPermasalahan == '' || this.state.ssPermasalahan == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Permasalahan Tidak Boleh Kosong', 'warning')}
  if (this.state.ssImprovement == '' || this.state.ssImprovement == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Improvement Tidak Boleh Kosong', 'warning')}
  if (this.state.ssBiayaUraian == '' || this.state.ssBiayaUraian == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Biaya Uraian Tidak Boleh Kosong', 'warning')}
  if (this.state.ssBiaya == '' || this.state.ssBiaya == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Biaya Tidak Boleh Kosong', 'warning')}
  if (this.state.ssKeuntunganUraian == '' || this.state.ssKeuntunganUraian == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Keuntungan Uraian Tidak Boleh Kosong', 'warning')}
  if (this.state.ssKeuntungan == '' || this.state.ssKeuntungan == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Keuntungan Tidak Boleh Kosong', 'warning')}
  else {

    this.setState({isLoading: true})

    let r = (Math.random() + 5).toString(36).substring(2);
    let r2 = (Math.random() + 10).toString(36).substring(2);
    // console.log("random", r);
    // console.log("random", r2);
    var myurl = this.props.editData.foto_kondisi_sebelum
    var myurl2 = this.props.editData.foto_kondisi_sesudah

    if (this.state.fotoKondisiSebelum != img1 && this.state.fotoKondisiSebelumFile != null) {
      var bucketName = project
      var file = this.state.fotoKondisiSebelumFile[0]
      var storageRef = await firebase.storage().ref(`${bucketName}/ss/${this.state.myProfile.id}/KondisiSebelum-${r}`)
      let uploadTask = await storageRef.put(file)
      myurl = await storageRef.getDownloadURL().catch((error)=>{throw error});
      console.log('myurl : ', myurl)
    }
    
    if (this.state.fotoKondisiSesudah != img2 && this.state.fotoKondisiSesudahFile != null){
      var bucketName2 = project
      var file2 = this.state.fotoKondisiSesudahFile[0]
      var storageRef2 = await firebase.storage().ref(`${bucketName2}/ss/${this.state.myProfile.id}/KondisiSesudah-${r2}`)
      let uploadTask2 = await storageRef2.put(file2)
      myurl2 = await storageRef2.getDownloadURL().catch((error)=>{throw error});
      console.log('myurl : ', myurl2)
    }

    if (!this.state.isCheckedFoto) {
      myurl = ''
      myurl2 = ''
    }


      //news
      // let sql = `
      //   UPDATE df_suggestion_system
      //   SET tema='`+this.state.ssTema+`', 
      //   pengusul_id=`+this.state.myProfile.id+`,
      //   fasilitator_id='`+this.state.ssAtasanSelected+`', 
      //   lokasi='`+this.state.ssLokasi+`', 
      //   permasalahan='`+this.state.ssPermasalahan+`', 
      //   improvement='`+this.state.ssImprovement+`', 
      //   biaya=`+this.state.ssBiaya+`, 
      //   biaya_uraian='`+this.state.ssBiayaUraian+`', 
      //   keuntungan=`+this.state.ssKeuntungan+`, 
      //   keuntungan_uraian='`+this.state.ssKeuntunganUraian+`', 
      //   ss_status_id=1, 
      //   update_by=`+this.state.myProfile.id+`, 
      //   update_date=now()
      //   where id = `+this.props.editData.ds_id+`
      // `

      if (this.state.isChecked) {
        if (this.state.ssPartner == '' || this.state.ssPartner == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Pengusul 2 Tidak Boleh Kosong', 'warning')}
        else{
          var sql = `
            UPDATE df_suggestion_system
            SET tema='`+this.state.ssTema+`', 
            pengusul_id=`+this.state.myProfile.id+`,
            pengusul_id_2 = `+this.state.ssPartner+`,
            fasilitator_id='`+this.state.ssAtasanSelected+`', 
            lokasi='`+this.state.ssLokasi+`', 
            permasalahan='`+this.state.ssPermasalahan+`', 
            improvement='`+this.state.ssImprovement+`', 
            biaya=`+this.state.ssBiaya+`, 
            biaya_uraian='`+this.state.ssBiayaUraian+`', 
            keuntungan=`+this.state.ssKeuntungan+`, 
            keuntungan_uraian='`+this.state.ssKeuntunganUraian+`', 
            ss_status_id=1, 
            foto_kondisi_sebelum = '`+myurl+`',
            foto_kondisi_sesudah = '`+myurl2+`',
            update_by=`+this.state.myProfile.id+`, 
            update_date=timezone('utc-7', now())
            where id = `+this.props.editData.ds_id+`
          `
        }
      }else{
        var sql = `
            UPDATE df_suggestion_system
            SET tema='`+this.state.ssTema+`', 
            pengusul_id=`+this.state.myProfile.id+`,
            pengusul_id_2 = 0,
            fasilitator_id='`+this.state.ssAtasanSelected+`', 
            lokasi='`+this.state.ssLokasi+`', 
            permasalahan='`+this.state.ssPermasalahan+`', 
            improvement='`+this.state.ssImprovement+`', 
            biaya=`+this.state.ssBiaya+`, 
            biaya_uraian='`+this.state.ssBiayaUraian+`', 
            keuntungan=`+this.state.ssKeuntungan+`, 
            keuntungan_uraian='`+this.state.ssKeuntunganUraian+`', 
            ss_status_id=1, 
            foto_kondisi_sebelum = '`+myurl+`',
            foto_kondisi_sesudah = '`+myurl2+`',
            update_by=`+this.state.myProfile.id+`, 
            update_date=timezone('utc-7', now())
            where id = `+this.props.editData.ds_id+`
          `
      }


      // console.log('sql : ', sql)

      var result = await axios.post(api_query, {
                                  query : sql
                              })
                                  .then(async(result) => {
                                  let res = result.data.response
                                  // Beda dgn sweetAlert yg lain
                                  return await this.handleAlertConfirm('isSweetAlertConfirm', true, 'Success', 'Berhasil edit SS', 'success')
                                  // this.props.changeViewPage('page')
                              }).catch(async(err) => {
                                  console.log('error : ', err)
                                  return await this.handleAlertConfirm('isSweetAlertConfirm', true, 'Danger', 'Gagal edit SS', 'danger')
                                  // return []
                              })

  }

  this.setState({isLoading: false})
}

  render() {
    return (
      <>
    {this.state.isLoading? 
      <Spinner/>
      :     
      this.props.editData.ss_status_id == 1 || this.props.editData.ss_status_id == 7?
          <div>
            <Button.Ripple color="none" className="bg-gradient-warning mb-1" onClick={() => this.props.changeViewPage()}>Back</Button.Ripple>
              {this.props.editData.ss_status_id == 7 ?
                <Alert color="primary">Note return : {this.props.editData.catatan_return}</Alert>:null}
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
                          value={this.state.myProfile == null ? '':this.state.myProfile.nik}
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
                          value={this.state.myProfile == null ? '':this.state.myProfile.name}
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
                          value={this.state.myProfile == null ? '':this.state.myProfile.nama_departemen}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="3">
                      <FormGroup>
                          Pengusul 2 : &nbsp;<i>*optional</i>{"\n"}
                        <label className="react-toggle-wrapper">
                          <Toggle
                            checked={this.state.isChecked}
                            // onChange={this.handleSwitchChange}
                            onChange={()=> this.setState({isChecked: !this.state.isChecked})}
                            name="controlledSwitch"
                            className={"mt-1"}
                            // value="yes"
                          />
                        </label>
                      </FormGroup>
                  </Col>
                  {this.state.isChecked?
                  <Col sm="12">
                    <FormGroup>
                      <Label for="">Pilih Pengusul 2</Label>
                      <Select
                        className="React"
                        classNamePrefix="select"
                        defaultValue={this.state.dataPartner.filter(x => x.value == this.state.ssPartner)}
                        name="clear"
                        options={this.state.dataPartner}
                        // isClearable={true}
                        onChange={(val)=>this.setState({ssPartner: val.value})}
                        // onChange={(val)=>this.setState({ssPartner: val.target.value})}
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
                          defaultValue={this.state.dataAtasan.filter(x => x.value == this.state.ssAtasanSelected)}
                          // defaultValue={this.state.dataAtasan.filter(x => x.value == this.props.editData.fasilitator_id)}
                          name="clear"
                          options={this.state.dataAtasan}
                          // isClearable={true}
                          onChange={(val)=>this.setState({ssAtasanSelected: val.value})}
                          // onChange={(val)=>this.setState({ssAtasanSelected: val.target.value})}
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
                                // onContextMenu="return false;"
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
                            <Button color="none" className="bg-gradient-warning mr-1" onClick={() => this.saveForm()}>
                              <span className='align-middle ml-25'>Simpan  </span>
                              <Save size={14}/>
                            </Button>
                            <Button color="none" className="bg-gradient-success" onClick={() => this.submitForm()}>
                              {/* Kirim */}
                              <span className='align-middle ml-25'>Kirim  </span>
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
      :
        this.props.editData.ss_status_id != 1?
          <div>
          <Button.Ripple color="none" className="bg-gradient-warning mb-1" onClick={() => this.props.changeViewPage()}>Back</Button.Ripple>
          {this.props.editData.ss_status_id == 8 ?
                <Alert color="danger">Note reject / delete: {this.props.editData.catatan_reject_delete}</Alert>:null}
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
                        value={this.state.myProfile == null ? '':this.state.myProfile.nik}
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
                        value={this.state.myProfile == null ? '':this.state.myProfile.name}
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
                        value={this.state.myProfile == null ? '':this.state.myProfile.nama_departemen}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="3">
                      <FormGroup>
                          Pengusul 2 : &nbsp;<i>*optional</i>{"\n"}
                        <label className="react-toggle-wrapper">
                          <Toggle
                            checked={this.state.isChecked}
                            // onChange={this.handleSwitchChange}
                            onChange={()=> this.setState({isChecked: !this.state.isChecked})}
                            name="controlledSwitch"
                            className={"mt-1"}
                            disabled={true}
                            // value="yes"
                          />
                        </label>
                      </FormGroup>
                  </Col>
                  {this.state.isChecked?
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
                        defaultValue={this.state.dataAtasan.filter(x => x.value == this.state.ssAtasanSelected)}
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
                        </div>
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </div>
      : null}


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
export default OpSsEdit
