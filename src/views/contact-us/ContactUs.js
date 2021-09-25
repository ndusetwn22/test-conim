import React from "react"
import { api_query } from "../../api/ApiConstant"
import axios from 'axios'
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Form,
  Input,
  FormGroup,
  Label,
  Button
} from "reactstrap"
import SweetAlert from "react-bootstrap-sweetalert"
// import csImg from "../../assets/img/pages/rocket.png"
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb"
import csImg from "../../assets/img/pages/contact-us.png"
import "../../assets/scss/pages/coming-soon.scss"
import Countdown from "react-countdown-now"
import { history } from "../../../src/history"


class ContactUs extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          isLoading: false,
          myProfile:null,
          isSweetAlert: false,
          sweetAlertTitle: 'Judul',
          sweetAlertText: 'Text',
          sweetAlertType: 'warning',
          isSweetAlertConfirm: false,
          sweetAlertTitleConfirm: 'Judul',
          sweetAlertTextConfirm: 'Text',
          sweetAlertTypeConfirm: 'warning',
          feedback: ''
        }
    }


  componentDidMount = async()=>{
    await this.isLogin();

    
  }

  isLogin = async() =>{
    if (localStorage.getItem('account') == undefined || localStorage.getItem('account') == null) {
      history.push("/pages/login")
    }else{
      var myProfile = JSON.parse(localStorage.getItem('account'))
      console.log('myProfile', myProfile)
      this.setState({myProfile: myProfile})
    }
  }

  submitForm = async() =>{

    if (this.state.feedback == '' || this.state.feedback == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Saran Tidak Boleh Kosong', 'warning')}
    else{
        var sql = `insert into df_feedback(pengirim_saran_id, nama_pengirim_saran, saran)
                    values(`+this.state.myProfile.id+`, '`+this.state.myProfile.name+`', '`+this.state.feedback+`')
                   `

        // console.log('sql : ', sql)

        var result = await axios.post(api_query, {
                                    query : sql
                                })
                                    .then(async(result) => {
                                    let res = result.data.response
                                    // Beda dgn sweetAlert yg lain
                                    return await this.handleAlertConfirm('isSweetAlertConfirm', true, 'Success', 'Berhasil kirim saran', 'success')
                                    // this.props.changeViewPage('page')
                                }).catch(async(err) => {
                                    console.log('error : ', err)
                                    return await this.handleAlertConfirm('isSweetAlertConfirm', true, 'Danger', 'Gagal kirim saran', 'danger')
                                    // return []
                                })
    }
  }

  handleAlertConfirm = (state, value, title, text, type) => {

    if (value) {
      this.setState({ [state] : value })
      this.setState({sweetAlertTitleConfirm: title, sweetAlertTextConfirm: text, sweetAlertTypeConfirm: type});
    }else{
      this.setState({ [state] : value })
    //   this.props.changeViewPage('page')
    history.push("/home")
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
  

  renderTimer = ({ days, hours, minutes, seconds }) => {
    return (
      <React.Fragment>
        <div className="clockCard px-1">
          <p>{days}</p>
          <p className="bg-amber clockFormat lead px-1 black"> Days </p>
        </div>
        <div className="clockCard px-1">
          <p>{hours}</p>
          <p className="bg-amber clockFormat lead px-1 black"> Hours </p>
        </div>
        <div className="clockCard px-1">
          <p>{minutes}</p>
          <p className="bg-amber clockFormat lead px-1 black"> Minutes </p>
        </div>
        <div className="clockCard px-1">
          <p>{seconds}</p>
          <p className="bg-amber clockFormat lead px-1 black"> Seconds </p>
        </div>
      </React.Fragment>
    )
  }

  render() {
    return (
        <React.Fragment>
        <Breadcrumbs
                breadCrumbTitle="Contact Us"
                breadCrumbParent="Contact"
                breadCrumbActive="Contact Us"
            />
      <Row className="d-flex vh-200 align-items-center justify-content-center m-0">
        <Col xl="5" md="8" className="px-md-0 px-2">
          <Card className="mb-0">
            <CardHeader className="justify-content-center">
              <h3>Butuh bantuan? hubungi kami yaa..</h3>
            </CardHeader>
            <CardBody className="text-center">
              <img src={csImg} alt="csImg" className="img-fluid width-350" />
              {/* <div className="text-center getting-started pt-2 d-flex justify-content-center flex-wrap">
                <Countdown
                  date={Date.now() + 50000000000}
                  renderer={this.renderTimer}
                />
              </div> */}
              <div className="divider">
                <div className="divider-text">Kontak MSTD Dept. 3302/3304</div>
              </div>
              {/* <p className="text-left mb-2">
                If you would like to be notified when our app is live, Please
                subscribe to our mailing list by entering your email.
              </p> */}
              {/* <p className="text-left mb-2">
                MSTD Dept. 
              </p> */}


              <Form>
                <FormGroup className="form-label-group">
                  <Input type="text" placeholder="Mau kirim saran? ketik disini yaa.." 
                         onChange={(val)=>this.setState({feedback: val.target.value})}
                  />
                  <Label>Feedback</Label>
                </FormGroup>
              </Form>
              <Button block color="none" className="btn-block bg-gradient-success" onClick={() => this.submitForm()}>
                Kirim
              </Button>

            </CardBody>
          </Card>
        </Col>
      </Row>

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

    </React.Fragment>
    )
  }
}
export default ContactUs
