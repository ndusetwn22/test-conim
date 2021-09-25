import React from "react"
import { Link } from "react-router-dom"
import { CardBody, FormGroup, Form, Input, Button, Label } from "reactstrap"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Mail, Lock, Check, Info, User } from "react-feather"
// import { loginWithJWT, loginWithCustom } from "../../../../redux/actions/auth/loginActions"
import { loginWithCustom } from "../../../../redux/actions/auth/loginActions"
import { connect } from "react-redux"
import { history } from "../../../../history"
import SweetAlert from 'react-bootstrap-sweetalert';
import { useParams } from 'react-router-dom';

class LoginCustom extends React.Component {
  state = {
    // email: "admin@gmail.com",
    // password: "admin",
    nik:"",
    password:"",
    alertWrongPassword: false,
    alertUserNotFound: false,
    alertUserNotActive: false,
    remember: (localStorage.getItem('rememberMe') != undefined || localStorage.getItem('rememberMe') != null) && localStorage.getItem('rememberMe') == 'true' ? true:false
    // remember: false
  }

  handleLogin = async(e) => {
    e.preventDefault()
    this.props.loginWithCustom(this.state)

    if (this.state.remember) {
      // console.log('trueee')
      localStorage.setItem('rememberMe', this.state.remember);
      localStorage.setItem('nik', this.state.remember ? this.state.nik : '');
      localStorage.setItem('pw', this.state.remember ? this.state.password : '');
    }
    
    if(!this.state.remember){
      localStorage.setItem('rememberMe', this.state.remember);
      localStorage.removeItem('nik');
      localStorage.removeItem('pw');

    }
    // const queryParams = await new URLSearchParams(window.location.search);
    // const name = await queryParams.get('status');
    // console.log(name); // 55 test null

    // console.log('res',this.props.match.params   )
    // this.props.loginWithJWT(this.state)
  }

  componentDidMount= async(e) =>{
    // console.log('e :', e)
    // console.log('login props: ', this.props)

    console.log('didmount : ', e)
    const queryParams = await new URLSearchParams(window.location.search);
    const name = await queryParams.get('status');
    console.log(name); // 55 test null

    if (name === 'wrong_password') {
      this.setState({alertWrongPassword: true});
    }

    if(name === 'user_not_found'){
      this.setState({alertUserNotFound: true})
    }

    if(name === 'user_not_active'){
      this.setState({alertUserNotActive: true})
    }

    console.log('get remember me 0', typeof(localStorage.getItem('rememberMe')))

    if (localStorage.getItem('rememberMe') != undefined || localStorage.getItem('rememberMe') != null) {
      console.log('get remember me 1')
      if(localStorage.getItem('rememberMe') == 'true'){
        console.log('get remember me 2')
        await this.setState({nik: localStorage.getItem('nik'), password: localStorage.getItem('pw')})
        // await this.setState({remember: true})
        
      }
    }
  }


  handleAlertWrongPassword = (state, value) => {
    this.setState({ [state] : value })
  }

  handleAlertUserNotFound = (state, value) => {
    this.setState({ [state] : value })
  }

  handleAlertUserNotActive = (state, value) => {
    this.setState({ [state] : value })
  }


  handleRemember = async(e) =>{
    var input = e.target
    var value = input.type === 'checkbox' ? await this.setState({remember: input.checked}) : input.value;

    console.log('input', input)
    console.log('input', input.checked)
  }

  render() {
    return (
      <React.Fragment>
        <CardBody className="pt-1">
          <Form action="/home" onSubmit={this.handleLogin}>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="text"
                placeholder="NIK"
                value={this.state.nik}
                onChange={e => this.setState({ nik: e.target.value })}
                required
              />
              <div className="form-control-position">
                {/* <Mail size={15} /> */}
                <User size={15} />
              </div>
              <Label>NIK</Label>
            </FormGroup>
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
                required
              />
              <div className="form-control-position">
                <Lock size={15} />
              </div>
              <Label>Password</Label>
            </FormGroup>
            <FormGroup className="d-flex justify-content-between align-items-center">
              <Checkbox
                color="primary"
                icon={<Check className="vx-icon" size={16} />}
                label="Remember me"
                defaultChecked={this.state.remember}
                onChange={(e)=>this.handleRemember(e)}
              />
              <div className="float-right">
                {/* <Link to="/pages/forgot-password">Forgot Password?</Link> */}
              </div>
            </FormGroup>
            {/* <div className="d-flex justify-content-between">
              <Button.Ripple
                color="primary"
                outline
                onClick={() => {
                  history.push("/pages/register")
                }}
              >
                Register
              </Button.Ripple>
              <Button.Ripple color="primary" type="submit">
                Login
              </Button.Ripple>
            </div> */}
            <div className="d-flex justify-content-end">
              <Button.Ripple color="primary" type="submit">
                Login
              </Button.Ripple>
            </div>
          </Form>

          <SweetAlert error title="Error"
              show={this.state.alertWrongPassword}
              onConfirm={() => this.handleAlertWrongPassword("alertWrongPassword", false)}
            >
                <p className="sweet-alert-text">
                  Ooops, password anda salah!
                </p>
            </SweetAlert>

            <SweetAlert error title="Error"
              show={this.state.alertUserNotFound}
              onConfirm={() => this.handleAlertUserNotFound("alertUserNotFound", false)}
            >
                <p className="sweet-alert-text">
                  Ooops, user tidak ditemukan!
                </p>
            </SweetAlert>

            <SweetAlert error title="Error"
              show={this.state.alertUserNotActive}
              onConfirm={() => this.handleAlertUserNotActive("alertUserNotActive", false)}
            >
                <p className="sweet-alert-text">
                  Ooops, user tidak aktif!
                </p>
            </SweetAlert>

        </CardBody>
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    values: state.auth.login
  }
}
export default connect(mapStateToProps, {
  // loginWithJWT,
  loginWithCustom
})(LoginCustom)
