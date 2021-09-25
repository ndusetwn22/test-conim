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
  CardImg,
  CustomInput,
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
import logo from "../../../../assets/img/logo/dankos-logo.png"
import { PDFDownloadLink, Document, Page, View, Text, Link, Font, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    title: {
      // margin: 20,
      marginTop: 30,
      marginLeft: 20,
      marginRight: 20,
      fontSize: 20,
      textAlign: 'center',
      // backgroundColor: '#e4e4e4',
      fontWeight: 'bold',
      textDecoration: 'underline'
      // fontFamily: 'Oswald',
      // textTransform: 'uppercase',
      // fontFamily: 'Oswald',
    },
    image: {
      marginLeft: 40,
      marginTop: -20,
      // width: 50, //kesamping
      height: 35 //kebawah
    },
    body: {
      flexGrow: 1,
    },
    body2: {
      flexGrow: 1,
    },
    row: {
      // flexGrow: 1,
      flexDirection: 'row',
    },
    row2: {
      flexGrow: 1,
      // marginLeft: 20,
      // marginRight: 20,
      flexDirection: 'row',
      // border: '2px solid rgba(0, 0, 0, 0.05)', 
    },
    row3: {
      // flexGrow: 1,
      // marginLeft: 20,
      // marginRight: 20,
      flexDirection: 'row',
    },
    border: {
      border: '2px solid rgba(0, 0, 0, 0.05)', 
      marginLeft: 20,
      marginRight: 20,
      marginTop: 10
    },
    border2: {
      border: '2px solid rgba(0, 0, 0, 0.05)', 
      marginLeft: 20,
      marginRight: 10,
      marginTop: 50
    },
    border3: {
      border: '2px solid rgba(0, 0, 0, 0.05)', 
      marginLeft: 10,
      marginRight: 20,
      marginTop: 50
    },
    border4: {
      border: '2px solid rgba(0, 0, 0, 0.05)', 
    },
    block: {
      flexGrow: 1,
    },
    text: {
      width: '60%',
      margin: 10,
      // fontFamily: 'Oswald',
      textAlign: 'justify',
    },
    textNoMargin: {
      width: '50%',
      // fontFamily: 'Oswald',
      textAlign: 'justify',
    },
    fill1: {
      width: '40%',
      backgroundColor: '#e14427',
    },
    fill2: {
      flexGrow: 2,
      backgroundColor: '#e6672d',
    },
    fill3: {
      flexGrow: 2,
      backgroundColor: '#e78632',
    },
    fill4: {
      flexGrow: 2,
      backgroundColor: '#e29e37',
    },
  });

  Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
  });

  export const MyDoc = (props) => (
    <Document>
    <Page size="A4">
      <Text style={styles.title}>Lembar Laporan SS</Text>
      <View style={styles.body}>
        <View style={styles.row}>
          <Image
            src={logo}
            style={styles.image}
          />
          <Text style={[styles.text],{fontWeight: 'bold', marginLeft: 330, fontSize: 8}}>
            *Nomor SS: &nbsp; {props.editData.nomor_ss}
          </Text>
        </View>
        <View style={styles.border}>
        {/* <View style={styles.body}> */}
          <View style={styles.row}>
            <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontSize: 8, marginLeft: 5, marginTop: 3, marginRight: 5, width: '50%', textAlign: 'justify'}]}>
              Tema &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {props.editData.tema}
            </Text>
            {/* <View/> */}
            <Text style={[styles.textNoMargin, {fontWeight: 'bold', fontSize: 8, marginLeft: 5, marginTop: 3, marginRight: 5, width: '50%'}]}>
              Kategori** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {props.editData.nama_kategori}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.textNoMargin, {fontWeight: 'bold', fontSize: 8, marginLeft: 5, marginTop: 3}]}>
              Dibuat Oleh (Nama Lengkap): {"\n"} &nbsp;&nbsp;{"1. "+props.editData.pengusul_1} {"\n"}&nbsp;&nbsp;{"2. "}{props.editData.pengusul_id_2 == '0'?"-":props.editData.pengusul_2}
            </Text>
            {/* <View/> */}
            <Text style={[styles.textNoMargin, {fontWeight: 'bold', fontSize: 8, marginLeft: 8, marginTop: 3, marginRight: 5, width: '50%'}]}>
              Change Control** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {props.editData.change_control == 'Y'?"Diperlukan CC":"Tidak Diperlukan CC"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.textNoMargin],{fontWeight: 'bold', fontSize: 8, marginLeft: 5, marginTop: 3}}>
              Fasilitator &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {props.atasanNama}
            </Text>
            {/* <View/> */}
            <Text style={[styles.textNoMargin, {fontWeight: 'bold', fontSize: 8, marginLeft: 185, marginTop: 3, marginRight: 5, width: '50%'}]}>
              Nomor CC** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {props.editData.nomor_cc == '' || props.editData.nomor_cc == null ? '-':props.editData.nomor_cc}
            </Text>
          </View>
          <View style={styles.row2}>
            <Text style={[styles.textNoMargin],{fontWeight: 'bold', fontSize: 8, marginLeft: 5, marginTop: 3}}>
              Departemen &nbsp;&nbsp;: {props.editData.departement_terdampak}
            </Text>
            <View/>
          </View>
          <View style={styles.row2}>
            <Text style={[styles.textNoMargin],{fontWeight: 'bold', fontSize: 8, marginLeft: 5, marginTop: 3}}>
              Tgl. dibuat &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {props.editData.tgl}
            </Text>
            <View/>
          </View>
          <View style={styles.row2}>
            <Text style={[styles.textNoMargin],{fontWeight: 'bold', fontSize: 8, marginLeft: 5, marginTop: 3}}>
              Tgl. tutup &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {props.editData.closed_date}
            </Text>
            <View/>
          </View>
          <View style={styles.row2}>
            <Text style={[styles.textNoMargin],{fontWeight: 'bold', fontSize: 8, marginLeft: 5, marginTop: 3, marginBottom: 3}}>
              Lokasi &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {props.editData.lokasi}
            </Text>
            <View/>
          </View>
        {/* </View> */}
        </View>
      </View>
      
      {/* body tester -95*/}
      <View style={[styles.body, {top: -50}]}>
        <View style={styles.row}>
            <View style={[styles.border2, {width: '50%', height: 150}]}>  
              <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontStyle: 'italic', fontSize: 10, marginLeft: 5, marginTop: -13, marginRight: 5, width: '100%', textAlign: 'justify'}]}>
                Permasalahan yang ada
              </Text> 
              <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontSize: 8, marginLeft: 5, marginTop: 5, marginRight: 5, paddingRight: 10, width: '100%', textAlign: 'justify'}]}>
                {props.editData.permasalahan}
              </Text>        
            </View>
            <View style={[styles.border3, {width: '50%', height: 150}]}>
              <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontStyle: 'italic', fontSize: 10, marginLeft: 5, marginTop: -13, marginRight: 5, width: '100%', textAlign: 'justify'}]}>
                Improvement yang dilakukan
              </Text> 
              <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontSize: 8, marginLeft: 5, marginTop: 5, marginRight: 5, paddingRight: 10, width: '100%', textAlign: 'justify'}]}>
                {props.editData.improvement}
              </Text>           
            </View>
        </View>
      </View>
      
      {/* body tester 2 -190*/}
      <View style={[styles.body2, {top: -100}]}>
        <View style={styles.row}>
            <View style={[styles.border2, {width: '50%', height: 200}]}>  
              <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontStyle: 'italic', fontSize: 10, marginLeft: 5, marginTop: -13, marginRight: 5, width: '100%', textAlign: 'justify'}]}> 
                Biaya Uraian
              </Text> 
              <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontSize: 8, marginLeft: 5, marginTop: 5, marginRight: 5, paddingRight: 10, width: '100%', textAlign: 'justify'}]}>
                  <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontStyle: 'italic', fontSize: 6, marginLeft: 5, marginTop: -13, marginRight: 5, width: '100%', textAlign: 'justify'}]}>
                    Ket: Hitungan setiap biaya/manhours yang dibutuhkan untuk improvement harus terlampir {"\n\n"}
                  </Text>
                {props.editData.biaya_uraian}
              </Text>
              <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontStyle: 'italic', fontSize: 6, marginLeft: 5, marginTop: 125, marginRight: 5, paddingRight: 10, width: '100%', textAlign: 'justify'}]}>
                  Noted: Setiap biaya/manhours yang dibutuhkan untuk improvement dikurangi terhadap total saving yang diperoleh
              </Text>  
              <Text style={[styles.textNoMargin ,{textDecoration: 'underline',fontWeight: 'bold', fontStyle: 'italic', fontSize: 8, marginLeft: 5, bottom: 5, marginTop: 10, marginRight: 5, width: '100%', textAlign: 'justify'}]}> 
                Total Biaya: {"\n"}
              </Text> 
              <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontStyle: 'italic', fontSize: 8, marginLeft: 5, marginTop: 5, bottom: 5, marginRight: 5, width: '100%', textAlign: 'justify'}]}> 
                  Rp. {props.editData.biaya.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Text>      
            </View>
            <View style={[styles.border3, {width: '50%', height: 200}]}>
              <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontStyle: 'italic', fontSize: 10, marginLeft: 5, marginTop: -13, marginRight: 5, width: '100%', textAlign: 'justify'}]}>
                Keuntungan <i>(Cost Saving)</i> Uraian
              </Text>
              <View style={styles.row}>
                <View style={[styles.border4, {width: '50%', height: 50}]}>
                  <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontSize: 4, marginTop: 5, marginLeft: 5, marginRight: 5, paddingRight: 10,  width: '100%', textAlign: 'justify'}]}>
                    Soft saving/potential saving: penghemematan yang didapet secara tidak langsung (waktu/jumlah kasus). {"\n"}
                    Cara Hitung 1: **Jam (Penghematan improvement) * jumlah orang * Proses/Kegiatan 1 bulan x harga manhours (23.175) x sisa bulan berjalan sampai akhir tahun (contoh buat conim di Maret maka dikali 9 bulan). {"\n"}
                    Cara Hitung 2: **Jumlah kasus dalam satu tahun (Penghematan improvement) x biaya kerugian yang disebabkan oleh setiap kasus tersebut.
                  </Text>
                </View>
                <View style={[styles.border4, {width: '50%', height: 50}]}>
                  <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontSize: 4, marginTop: 5, marginLeft: 5, marginRight: 5, paddingRight: 10,  width: '100%', textAlign: 'justify'}]}>
                    Hard Saving: Penghematan yang di dapat secara langsung, (Contoh: Penghematan harga bahan/reagen/material/energi). {"\n"}
                    Cara Hitung: Selisih harga per pcs/bahan/reagen/energi (Penghematan improvement) * proses/kegiatan 1 bulan * sisa bulan berjalan sampai akhir tahun (contoh buat conim di maret Maret maka dikali 9 bulan). {"\n"}
                    Jika menggunakan jumlah BN, maka gunakan ROFO 1 tahun.
                  </Text>
                </View> 
              </View>
              <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontStyle: 'italic', fontSize: 6, marginLeft: 5, marginTop: 3, marginRight: 5, width: '100%', textAlign: 'justify'}]}>
                {props.editData.jenis_saving == 'PS'? 'Soft Saving': props.editData.jenis_saving == 'HS'? 'Hard Saving':'Soft Saving / Hard Saving'}
              </Text>
              <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontSize: 8, marginLeft: 5, marginTop: 5, marginRight: 5, paddingRight: 10, width: '100%', textAlign: 'justify'}]}>
                {props.editData.keuntungan_uraian}
              </Text>
              <Text style={[styles.textNoMargin ,{textDecoration: 'underline',fontWeight: 'bold', fontStyle: 'italic', fontSize: 8, marginLeft: 5, bottom: -100, marginTop: -5, marginRight: 5, width: '100%', textAlign: 'justify'}]}> 
                Total Keuntungan: {"\n"}
              </Text> 
              <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontStyle: 'italic', fontSize: 8, marginLeft: 5, marginTop: 0, bottom: -105, marginRight: 5, width: '100%', textAlign: 'justify'}]}> 
                  Rp. {props.editData.keuntungan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Text>    
              {/* <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontSize: 8, marginLeft: 5, marginTop: 5, marginRight: 5, paddingRight: 10, width: '100%', textAlign: 'justify'}]}>
                {props.editData.keuntungan_uraian}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vestibulum blandit ipsum, in vulputate nibh vestibulum et. Etiam aliquet, lorem at auctor convallis, dui justo auctor elit, sit amet molestie est orci non metus. Sed nec metus feugiat, bibendum nulla ac, tincidunt ex. Quisque ante diam, tempus mattis eros nec, ultrices interdum magna. Donec convallis elit id sapien feugiat, id sagittis arcu faucibus.
              </Text>            */}
            </View>
        </View>
      </View>
      
      {/* catatan */}
      <View style={[styles.body, {top: -110}]}>
        {/* <View style={styles.row}>
        </View> */}
        <View style={[styles.border, {height: 80}]}>
          <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontStyle: 'italic', fontSize: 10, marginLeft: 5, marginTop: -13, marginRight: 5, width: '100%', textAlign: 'justify'}]}>
            Catatan ** 
          </Text>
          <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontSize: 8, marginLeft: 5, marginTop: 5, marginRight: 5, width: '100%', textAlign: 'justify'}]}>
              {props.editData.catatan_reject_delete == null || props.editData.catatan_reject_delete == ''?'':props.editData.catatan_reject_delete} {"\n\n"}
              {props.editData.catatan_return == null || props.editData.catatan_return == ''?'':props.editData.catatan_return}
          </Text>
          <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontStyle: 'italic', fontSize: 6, marginLeft: 10, marginTop: 90, marginRight: 5, width: '100%', textAlign: 'justify'}]}>
            * Diisi oleh MSTD 
          </Text>
          <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontStyle: 'italic', fontSize: 6, marginLeft: 100, marginTop: 0, marginRight: 5, width: '100%', textAlign: 'justify'}]}>
            ** Diisi oleh Spv/Mgr Area 
          </Text>
          <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontStyle: 'italic', fontSize: 8, marginLeft: 5, marginTop: 20, marginRight: 5, width: '100%', textAlign: 'justify'}]}>
            Dibuat oleh :
          </Text>
          <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontStyle: 'italic', fontSize: 8, marginLeft: 400, marginTop: 0, marginRight: 5, width: '100%', textAlign: 'justify'}]}>
            Disetujui oleh :
          </Text>

          <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontStyle: 'italic', fontSize: 8, marginLeft:5, marginTop: 25, marginRight: 5, width: '100%', textAlign: 'justify'}]}>
            Signed by System
          </Text>

          <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontStyle: 'italic', fontSize: 8, marginLeft: 400, marginTop: 0, marginRight: 5, width: '100%', textAlign: 'justify'}]}>
            Signed by System
          </Text>

          <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontStyle: 'italic', fontSize: 8, marginLeft: 5, marginTop: 25, marginRight: 5, width: '100%', textAlign: 'justify'}]}>
            ___________________________
          </Text>
          <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontStyle: 'italic', fontSize: 8, marginLeft: 400, marginTop: 0, marginRight: 5, width: '100%', textAlign: 'justify'}]}>
            ___________________________
          </Text>
          <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontStyle: 'italic', fontSize: 8, marginLeft: 5, marginTop: 12, marginRight: 5, width: '100%', textAlign: 'justify'}]}>
            {props.editData.pengusul_1}
          </Text>
          <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontStyle: 'italic', fontSize: 8, marginLeft: 400, marginTop: 0, marginRight: 5, width: '100%', textAlign: 'justify'}]}>
            {props.atasanNama}
          </Text>

          {/* Tanpa signed by system */}
          {/* <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontStyle: 'italic', fontSize: 8, marginLeft: 5, marginTop: 50, marginRight: 5, width: '100%', textAlign: 'justify'}]}>
            ___________________________
          </Text>
          <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontStyle: 'italic', fontSize: 8, marginLeft: 400, marginTop: 0, marginRight: 5, width: '100%', textAlign: 'justify'}]}>
            ___________________________
          </Text>
          <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontStyle: 'italic', fontSize: 8, marginLeft: 5, marginTop: 12, marginRight: 5, width: '100%', textAlign: 'justify'}]}>
            {props.editData.pengusul_1}
          </Text>
          <Text style={[styles.textNoMargin ,{fontWeight: 'bold', fontStyle: 'italic', fontSize: 8, marginLeft: 400, marginTop: 0, marginRight: 5, width: '100%', textAlign: 'justify'}]}>
            {props.atasanNama}
          </Text> */}
        </View>
      </View>
    
      {/* TTD */}
    </Page>
  </Document>
);

class OfficerListSsView extends React.Component {
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
      alasanReject: '',
      alasanReturn: '',
      //old
      dataKategori: [],
      kategoriSelected: null,
      kategoriSelected2: null,
      isChecked: false,
      catatanCC: '',
      //baru
      noCFF: '',
      noSS: '',
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
      // ssKondisiSebelum: this.props.editData.kondisi_sebelum,
      // ssKondisiSesudah: this.props.editData.kondisi_sesudah,
      ssPermasalahan: this.props.editData.permasalahan,
      ssImprovement: this.props.editData.improvement,
      ssBiaya: parseInt(this.props.editData.biaya),
      ssBiayaUraian: this.props.editData.biaya_uraian,
      ssKeuntungan: parseInt(this.props.editData.keuntungan),
      ssKeuntunganUraian: this.props.editData.keuntungan_uraian,
      nomorSS: 0,
      atasanNama: '-'
    }
}

componentDidMount = async() => {
  await this.setState({isLoading: true})
  await this.isLogin('officer_df');
  await this.tarikDataProfile();
  // await this.tarikDataFormCff();
  await this.tarikKategori2();
  await this.tarikPartner2();
  // await this.tarikNomorSS();
  var tmp = this.state.dataAtasan.filter(x => x.value === this.state.ssAtasanSelected)
  tmp = tmp[0].label === '0' || tmp[0].label == null || tmp[0].label === undefined ? "-": tmp[0].label
  this.setState({atasanNama: tmp})
  // console.log('temp : ', tmp[0].label)
  // this.state.dataAtasan.filter(x => x.value === this.state.ssAtasanSelected)


//   console.log('state biaya : ', this.state.ssBiaya)
//   console.log('state keuntungan : ', this.state.ssKeuntungan)

  await this.setState({isLoading: false})

  console.log('props edit : ', this.props)
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

tarikPartner2 = async() =>{

  let sql = `
  select id as value,
    name as label,
    departement_id
  from df_master_user dmu
  where dmu.id = `+this.props.editData.pengusul_id_2+`
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

  // if (this.state.noCFF == '' || this.state.noCFF == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'No CFF Tidak Boleh Kosong', 'warning')}
  if (this.state.noSS == '' || this.state.noSS == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'No SS Tidak Boleh Kosong', 'warning')}
  else{

    // Ngecek jika ada cost saving maka lanjut ke FA, jika tidak maka ke MSTD Spv

    if(this.state.ssBiaya == 0 && this.state.ssKeuntungan == 0){
        // Tidak ada cost saving gausah kategori 2 

          // var sql = `
          // with ins1 as(
          //     update df_cff
          //     set
          //     nomor_cff = '`+this.state.noCFF+`',
          //     status_cff_id = 5,
          //     update_by = `+this.state.myProfile.id+`,
          //     update_date = now()
          //     where id = `+this.props.editData.cff_id+`
          // returning id as return_id
          // )
          //     update df_ss
          //     set
          //     nomor_ss = '`+this.state.noSS+`',
          //     ss_status_id = 5,
          //     update_by = `+this.state.myProfile.id+`,
          //     update_date = now()
          //     where id = `+this.props.editData.ds_id+`
          // `

          // kalo cost saving 0 -> nggausah masukin kategori_2
          var sql = `
            with ins1 as (
              update df_suggestion_system
              set
              nomor_ss = '`+this.state.noSS+`',
              ss_status_id = 5,
              closed_date = now(),
              update_by = `+this.state.myProfile.id+`,
              update_date = timezone('utc-7', now())
              where id = `+this.props.editData.ds_id+`
            returning id as return_id)

              INSERT INTO df_ss_history_approval
              (ss_id, approved_rejected_by_id, approval_rejected_status, create_by, create_date)
              VALUES((select return_id from ins1), `+this.state.myProfile.id+`, 'Approved', `+this.state.myProfile.id+`, timezone('utc-7', now()));
          `
    }else{
      // Ada cost saving
    // var sql = `
    //     with ins1 as(
    //         update df_cff
    //         set
    //         nomor_cff = '`+this.state.noCFF+`',
    //         status_cff_id = 4,
    //         update_by = `+this.state.myProfile.id+`,
    //         update_date = now()
    //         where id = `+this.props.editData.cff_id+`
    //     returning id as return_id
    //     )
    //         update df_ss
    //         set
    //         nomor_ss = '`+this.state.noSS+`',
    //         ss_status_id = 4,
    //         update_by = `+this.state.myProfile.id+`,
    //         update_date = now()
    //         where id = `+this.props.editData.ds_id+`
    //     `

        var sql = `
          with ins1 as(
            update df_suggestion_system
            set
            nomor_ss = '`+this.state.noSS+`',
            ss_status_id = 4,
            ss_kategori_2_id = `+this.state.kategoriSelected2+`,
            closed_date = now(),
            update_by = `+this.state.myProfile.id+`,
            update_date = timezone('utc-7', now())
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
                                    // await this.nomorPlusOne();
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
  where job_level = '4'
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

  tarikNomorSS = async() =>{

    let sql = `
      select  id, nomor
      from df_nomor_ss
    `
    
    var result = await axios.post(api_query, {
                                query : sql
                            })
                                .then(async(result) => {
                                  var res = result.data.response.rows[0]
                                  console.log('result query kategori : ', res)
                                  if (res.length == '') {
                                      return []
                                  }
                                  
                                    // var myTmp = null
                                    // Return today's date and time
                                    var currentTime = new Date()

                                    // returns the year (four digits)
                                    var year = currentTime.getFullYear()
                                    
                                    // var tmp = 'SS/'+toString(year)+toString(this.state.nomorSS.nomor)
                                    var tmp = 'SS/'+year+'/'+res.nomor
                                    // setTimeout(async() => {
                                    //   console.log('SS : ', tmp)
                                    // }, 3000);
                                    console.log('nomor ss: ', tmp)
                                    // console.log('year : ', year)
                                    // console.log('nomor : ', res.nomor)
                                    await this.setState({noSS: tmp})
    
                                }).catch(err => {
                                    console.log('error : ', err)
                                    return []
                                })
      // await this.setState({data: result})
    }

tarikKategori2 = async() =>{

let sql = `
  select  id as value,
          nama_kategori_2 as label
  from df_ss_kategori_2
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


  render() {
    // const [centeredModal, setCenteredModal] = useState(false)
    return (
      <>
      {this.state.isLoading?
        <Spinner/>
      : 
        <div>
        <div className="justify-content-start">
          <Button.Ripple color="none" className="bg-gradient-warning mb-1 ml-1" onClick={() => this.props.changeViewPage()}>Back</Button.Ripple>
            <Button.Ripple color="none" className="bg-gradient-success mb-1 ml-1">
                <PDFDownloadLink document={<MyDoc {...this.state} {...this.props}/>} fileName="ss-file.pdf" style={{color: 'white'}}>
                {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : 'Download pdf'
                }
                </PDFDownloadLink>
            </Button.Ripple>
        </div>
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
                {/* <Col sm="12">
                  <FormGroup>
                    <Label for="catatan">No CFF</Label>
                    <Input
                      type="text"
                      name="noCFF"
                      id="noCFF"
                      placeholder="No CFF"
                      value={this.state.noCFF}
                      onChange={(val)=>this.setState({noCFF: val.target.value})}
                      // required
                    />
                  </FormGroup>
                </Col> */}
              {this.state.ssBiaya == 0 && this.state.ssKeuntungan == 0?
                null
              :
                <Col sm="12">
                  <FormGroup>
                    <Label for="">Pilih Kategori Suggestion System 2</Label>
                    <Select
                      className="React"
                      classNamePrefix="select"
                      value={this.state.dataKategori.filter(option => option.value == this.state.kategoriSelected2)}
                      name="clear"
                      options={this.state.dataKategori}
                      // isClearable={true}
                      onChange={(val)=>this.setState({kategoriSelected2: val.value})}
                      // onChange={(val)=>this.setState({ssAtasanSelected: val.target.value})}
                    />
                  </FormGroup>
                </Col>}
                <Col sm="12">
                  <FormGroup>
                    <Label for="catatan">No SS</Label>
                    <Input
                      type="text"
                      name="noSS"
                      id="noSS"
                      placeholder="No SS"
                      value={this.state.noSS}
                      onChange={(val)=>this.setState({noSS: val.target.value})}
                      // required
                      disabled
                    />
                  </FormGroup>
                </Col>
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
export default OfficerListSsView
