import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CustomInput,
  FormGroup,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label,
  Spinner,
  Alert
} from "reactstrap"
import SweetAlert from 'react-bootstrap-sweetalert';
import Checkbox from "../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Check, User, Mail, Smartphone, Lock, Info } from "react-feather"
import Radio from "../../components/@vuexy/radio/RadioVuexy"
import Select from "react-select"
import axios from 'axios';
import { api_query } from "../../api/ApiConstant"
import firebase from "../../firebase/firebase"

const sweetAlert = (props) => {
    return (
        <SweetAlert warning title={props.title}
          show={props.warningAlert} 
          onConfirm={() => props.handleAlert("isSweetAlert", false)}
        >
            <p className={props.className}>
              {props.text}
            </p>
        </SweetAlert>
    )
}

class EmployeesAdd extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        first_name: '',
        last_name: '',
        emp_no: null,
        gender: "M",
        dept_name_selected: null,
        dept_name: [
          { value: "1", label: "Information Technology" }
        ],
        position_selected: null,
        position: [
          { value: "1", label: "Staff" }
        ],
        profileImage: null,
        isLoading: false,
        isSweetAlert: false,
        sweetAlertTitle: 'Judul',
        sweetAlertText: 'Text',
        sweetAlertType: 'warning'
        
      }
  }
  
  submitForm2 = async() => {
    var bucketName = 'images'
    var file = this.state.profileImage[0]
    var storageRef = await firebase.storage().ref(`${bucketName}/${file.name}`)
    let uploadTask = await storageRef.put(file)

   

    // uploadTask.on('state_changed', 
    // // Progress
    // (snapshot)=>{
    //   // Progess function
    // }, 
    // (error)=>{
    //   // Error function
    //   console.log('error firebase : ', error)
    // }, 
    // (complete)=>{
    //   // Complete function
    //   stora
    // })

    // const imageRef = storage().ref(`${firebasePath}/${name}`)
    // await imageRef.putFile(uri, { contentType: 'image/jpg'}).catch((error) => { throw error })
    // const url = await imageRef.getDownloadURL().catch((error) => { throw error });
    // return url

    var myurl = await storageRef.getDownloadURL().catch((error)=>{throw error});
    console.log('myurl : ', myurl)


  }

  submitForm = async() =>{

    var title = ''
    var text = ''
    var type = ''
    console.log('SUBMIT : ', this.state.first_name)
    console.log('SUBMIT : ', this.state.last_name)
    // console.log('event : ', e)


    if (this.state.first_name == '' || this.state.first_name == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Nama Awalan Tidak Boleh Kosong', 'warning')}
    if (this.state.last_name == '' || this.state.last_name == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Nama Akhiran Tidak Boleh Kosong', 'warning')}
    if (this.state.emp_no == '' || this.state.last_name == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'No Karyawan Tidak Boleh Kosong', 'warning')}
    if (this.state.gender == '' || this.state.gender == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Jenis Kelamin Tidak Boleh Kosong', 'warning')}
    if (this.state.dept_name_selected == '' || this.state.dept_name_selected == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Departement Tidak Boleh Kosong', 'warning')}
    if (this.state.position_selected == '' || this.state.position_selected == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Position Tidak Boleh Kosong', 'warning')}
    if (this.state.profileImage == '' || this.state.profileImage == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Foto Profile Tidak Boleh Kosong', 'warning')}
    else {

      this.setState({isLoading: true});

      var bucketName = 'images'
      var file = this.state.profileImage[0]
      var storageRef = await firebase.storage().ref(`${bucketName}/${file.name}`)
      let uploadTask = await storageRef.put(file)
      var myurl = await storageRef.getDownloadURL().catch((error)=>{throw error});
      console.log('myurl : ', myurl)

        let sql = `
            insert into employees_new(first_name, last_name, emp_no, gender, image_profile)
            value('`+this.state.first_name+`', '`+this.state.last_name+`', `+this.state.emp_no+`, '`+this.state.gender+`', '`+myurl+`');
        `
        var result = await axios.post(api_query, {
                                    query : sql
                                })
                                    .then(async(result) => {
                                    let res = result.data.response
                                    // console.log('result : ', result)
                                    
                                    // if (res.length == '') {
                                    //     return []
                                    // }

                                    // console.log('result insert : ', (result.data))
                                    // return res;

                                    let sql = `
                                      select LAST_INSERT_ID() as return_id;
                                    `
                                    var result = await axios.post(api_query, {
                                        query : sql
                                    })
                                      .then(async(result) => {
                                        // console.log('return first : ', result.data.response[0])
                                        console.log('return : ', result.data.response[0].return_id)
                                        let res = result.data.response[0].return_id
                                        // return res;

                                        let sql2 = `
                                            insert into dept_emp_new(emp_id, dept_id, position_id)
                                            value(`+res+`, `+this.state.dept_name_selected+`, `+this.state.position_selected+`);
                                        `

                                        var result2 = await axios.post(api_query, {
                                                                      query : sql2
                                                                    })
                                                                        .then(async(result) => {
                                                                          let res = result.data.response
                                                                          console.log('result : ', result)
                                                                          
                                                                          if (res.length == '') {
                                                                              return []
                                                                          }

                                                                          // console.log('result insert : ', (result.data))
                                                                          return res;

                                                                    }).catch(err => {
                                                                        console.log('error : ', err)
                                                                        return []
                                                                    })
                                        
                                      }).catch(err => {
                                        console.log('error : ', err)
                                        return []
                                    })

                                }).catch(err => {
                                    console.log('error : ', err)
                                    return []
                                })
        
        this.setState({isLoading: true});
        console.log('result query : ', result)
        this.props.changeViewPage('page')
        // return await this.handleAlert('isSweetAlert', true, 'Success', 'Data Berhasil Ditambahkan '+this.state.first_name+ " "+ this.state.last_name, 'success')
    }

  }

  handleAlert = (state, value, title, text, type) => {
      if (value) {
        this.setState({ [state] : value })
        this.setState({sweetAlertTitle: title, sweetAlertText: text, sweetAlertType: type});
      }else{
        this.setState({ [state] : value })
      }

  }

  testPrint = (e) =>{
    console.log("VALUE RADIO", e.currentTarget.value);
    console.log("value radio", e.target.value)
  }

  componentDidMount= async()=>{
    // console.log('edit page props : ', this.props)
    this.setState({isLoading: true});
    await this.tarikDataDept();
    await this.tarikDataPosition();
    this.setState({isLoading: false});
    // console.log('dept : ', this.state.dept_name)
}

  tarikDataDept = async() =>{
    console.log('tarik data')
    // let sql = `
    //     select * from employees_new limit 10000;
    // `

    let sql = `
    select * from departments_new
    `
    var result = await axios.post(api_query, {
                                query : sql
                            })
                                .then(result => {
                                let res = result.data.response
                                // console.log('result : ', result)
                                if (res.length == '') {
                                    return []
                                }

                                var tmp = []
                                for (let index = 0; index < res.length; index++) {
                                  const element = res[index];
                                  // console.log('dataaaaa : ', element)
                                  var data = {}
                                  data.id = element.id
                                  data.value = element.id
                                  data.label = element.dept_name
                                  tmp.push(data)
                                  // console.log('tiap push : ', tmp)
                                }
                                // console.log('hasil push : ', tmp)
                                // return res;
                                return tmp;
                            }).catch(err => {
                                console.log('error : ', err)
                                return []
                            })
    await this.setState({dept_name: result})
    }

  tarikDataPosition = async() =>{
      // console.log('tarik data')
      // let sql = `
      //     select * from employees_new limit 10000;
      // `
  
      let sql = `
      select * from position_management
      `
      var result = await axios.post(api_query, {
                                  query : sql
                              })
                                  .then(result => {
                                  let res = result.data.response
                                  // console.log('result : ', result)
                                  if (res.length == '') {
                                      return []
                                  }
  
                                  var tmp = []
                                  for (let index = 0; index < res.length; index++) {
                                    const element = res[index];
                                    // console.log('dataaaaa : ', element)
                                    var data = {}
                                    data.id = element.id
                                    data.value = element.id
                                    data.label = element.position
                                    tmp.push(data)
                                    // console.log('tiap push : ', tmp)
                                  }
                                  // console.log('hasil push : ', tmp)
                                  // return res;
                                  return tmp;
                              }).catch(err => {
                                  console.log('error : ', err)
                                  return []
                              })
        await this.setState({position: result})
      }

  render() {
    const customStyles = {
      control: (base, state) => ({
        ...base,
        background: "white",
        // match with the menu
        borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
        // Overwrittes the different states of border
        borderColor: state.isFocused ? "yellow" : "green",
        // Removes weird border around container
        boxShadow: state.isFocused ? null : null,
        "&:hover": {
          // Overwrittes the different states of border
          borderColor: state.isFocused ? "red" : "blue"
        }
      }),
      menu: base => ({
        ...base,
        // override border radius to match the box
        borderRadius: 0,
        // kill the gap
        marginTop: 0
      }),
      menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 0
      })
    };
    return (
      

        // <React.Fragment>
        //     <Breadcrumbs
        //     breadCrumbTitle="Form Layouts"
        //     breadCrumbParent="Form"
        //     breadCrumbActive="Form Layouts"
        //     />
        //     <Row>
        //         <Col lg="6" md="12">
        //             <Card>
        //                 <CardHeader>
        //                 <CardTitle>Vertical Form Icons</CardTitle>
        //                 </CardHeader>
        //                 <CardBody>
        //                 <Form>
        //                     <Row>
        //                     <Col sm="12">
        //                         <Label for="nameVerticalIcons">First Name</Label>
        //                         <FormGroup className="has-icon-left position-relative">
        //                         <Input
        //                             type="text"
        //                             name="name"
        //                             id="nameVerticalIcons"
        //                             placeholder="First Name"
        //                         />
        //                         <div className="form-control-position">
        //                             <User size={15} />
        //                         </div>
        //                         </FormGroup>
        //                     </Col>
        //                     <Col sm="12">
        //                         <Label for="EmailVerticalIcons">Email</Label>
        //                         <FormGroup className="has-icon-left position-relative">
        //                         <Input
        //                             type="email"
        //                             name="Email"
        //                             id="EmailVerticalIcons"
        //                             placeholder="Email"
        //                         />
        //                         <div className="form-control-position">
        //                             <Mail size={15} />
        //                         </div>
        //                         </FormGroup>
        //                     </Col>
        //                     <Col sm="12">
        //                         <Label for="IconsMobile">Mobile</Label>
        //                         <FormGroup className="has-icon-left position-relative">
        //                         <Input
        //                             type="number"
        //                             name="mobile"
        //                             id="IconsMobile"
        //                             placeholder="Mobile"
        //                         />
        //                         <div className="form-control-position">
        //                             <Smartphone size={15} />
        //                         </div>
        //                         </FormGroup>
        //                     </Col>
        //                     <Col sm="12">
        //                         <Label for="IconsPassword">Password</Label>
        //                         <FormGroup className="has-icon-left position-relative">
        //                         <Input
        //                             type="password"
        //                             name="password"
        //                             id="IconsPassword"
        //                             placeholder="Password"
        //                         />
        //                         <div className="form-control-position">
        //                             <Lock size={15} />
        //                         </div>
        //                         </FormGroup>
        //                     </Col>
        //                     <Col sm="12">
        //                         <FormGroup className="has-icon-left position-relative">
        //                         <Checkbox
        //                             color="primary"
        //                             icon={<Check className="vx-icon" size={16} />}
        //                             label="Remember Me"
        //                             defaultChecked={false}
        //                         />
        //                         </FormGroup>
        //                     </Col>
        //                     <Col sm="12">
        //                         <FormGroup className="has-icon-left position-relative">
        //                         <Button.Ripple
        //                             color="primary"
        //                             type="submit"
        //                             className="mr-1 mb-1"
        //                             onClick={e => e.preventDefault()}
        //                         >
        //                             Submit
        //                         </Button.Ripple>
        //                         <Button.Ripple
        //                             outline
        //                             color="warning"
        //                             type="reset"
        //                             className="mb-1"
        //                         >
        //                             Reset
        //                         </Button.Ripple>
        //                         </FormGroup>
        //                     </Col>
        //                     </Row>
        //                 </Form>
        //                 </CardBody>
        //             </Card>
        //         </Col>
        //     </Row>
        // </React.Fragment>
<>
        <Button.Ripple
          color="none"
          className="mr-1 mb-1 bg-gradient-warning"
          onClick={() => this.props.changeViewPage('page')}
        >
          Back
        </Button.Ripple>

{!this.state.isLoading?

        <Card>
        <CardHeader>
          <CardTitle>Tambah Karyawan</CardTitle>
        </CardHeader>
        <CardBody>
          <Form>
            <Row>
              <Col sm="12">
                <Label for="nameVerticalIcons">First Name</Label>
                <FormGroup className="has-icon-left position-relative">
                  <Input
                    type="text"
                    name="first_name"
                    id="nameVerticalIcons"
                    placeholder="First Name"
                    onChange={(val)=>this.setState({first_name: val.target.value})}
                  />
                  <div className="form-control-position">
                    <User size={15} />
                  </div>
                </FormGroup>
              </Col>
              <Col sm="12">
                <Label for="LastNameVI">Last Name</Label>
                <FormGroup className="has-icon-left position-relative">
                  <Input
                    type="text"
                    name="last_name"
                    id="LastNameVI"
                    placeholder="Last Name"
                    onChange={(val)=>this.setState({last_name: val.target.value})}
                  />
                  <div className="form-control-position">
                    <Mail size={15} />
                  </div>
                </FormGroup>
              </Col>
              <Col sm="12">
                <Label for="emp_no">No Karyawan</Label>
                <FormGroup className="has-icon-left position-relative">
                  <Input
                    type="number"
                    name="emp_no"
                    id="emp_no"
                    placeholder="No Karyawan"
                    onChange={(val)=>this.setState({emp_no: val.target.value})}
                  />
                  <div className="form-control-position">
                    <Info size={15} />
                  </div>
                </FormGroup>
              </Col>
              <Col sm="12">
                <Label for="gender">Gender</Label>
                <FormGroup className="has-icon-left position-relative">
                  <div className="d-inline-block mr-1">
                    <Radio label="Laki - laki" defaultChecked={true} name="gender" value="M" onChange={(val)=>this.setState({gender: val.target.value})}/>
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio label="Perempuan" defaultChecked={false} name="gender" value="F" onChange={(val)=>this.setState({gender: val.target.value})}/>
                  </div>
                </FormGroup>
              </Col>
              <Col sm="12">
                {/* <Label for="dept_name">Position</Label> */}
                <FormGroup className="has-icon-left position-relative">
                  <Label for="profileImage">Profile Image</Label>
                  <CustomInput
                    type="file"
                    id="exampleCustomFileBrowser"
                    name="profileImage"
                    accept="image/*"
                    onChange={(val)=>this.setState({profileImage:val.target.files})}
                    // onChange={(val)=>console.log('profileImage : ', val.target.files[0])}
                    // onChange={(val)=>console.log('profileImage : ', val.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col sm="12">
                <Label for="dept_name">Department</Label>
                <FormGroup className="has-icon-left position-relative">
                  <Select
                    className="React"
                    classNamePrefix="select"
                    defaultValue={null}
                    name="color"
                    options={this.state.dept_name}
                    onChange={(val)=>this.setState({dept_name_selected: val.value})}
                    // styles={customStyles}
                    theme={theme => ({
                      ...theme,
                      borderRadius: 0,
                      colors: {
                        ...theme.colors,
                        primary25: '#7367f0',
                        primary: '#7367f0',
                      },})}
                 />
                </FormGroup>
              </Col>
              <Col sm="12">
                <Label for="dept_name">Position</Label>
                <FormGroup className="has-icon-left position-relative">
                  <Select
                    className="React"
                    classNamePrefix="select"
                    defaultValue={null}
                    name="color"
                    options={this.state.position}
                    onChange={(val)=>this.setState({position_selected: val.value})}
                    // onChange={(val)=>console.log('val : ', val.value)}
                    // styles={customStyles}
                    theme={theme => ({
                      ...theme,
                      borderRadius: 0,
                      colors: {
                        ...theme.colors,
                        primary25: '#7367f0',
                        primary: '#7367f0',
                      },})}
                 />
                </FormGroup>
              </Col>
              
              <Col sm="12">
                <FormGroup className="has-icon-left position-relative">
                  <Button.Ripple
                    color="none"
                    className="mr-1 mb-1 bg-gradient-success"
                    onClick={() => this.submitForm()}
                    // onClick={e => e.preventDefault()}
                  >
                    Tambah Data
                  </Button.Ripple>
                  {/* <input type="submit" value="Submit" /> */}
                  <Button.Ripple
                    outline
                    color="warning"
                    type="reset"
                    className="mb-1"
                  >
                    Reset
                  </Button.Ripple>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
:
      <Card>
        <CardHeader>
          <CardTitle>Tambah Karyawan</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="text-center">
            <Spinner color="none"/>
          </div>
        </CardBody>
      </Card>
}
      {/* <sweetAlert handleAlert={this.handleAlert} {...this.state} {...this.props}/> */}

      <SweetAlert type={this.state.sweetAlertType} title={this.state.sweetAlertTitle}
          show={this.state.isSweetAlert} 
          onConfirm={() => this.handleAlert("isSweetAlert", false)}
        >
            <p className="sweet-alert-text">
              {this.state.sweetAlertText}
            </p>
        </SweetAlert>

      </>
    )
  }
}
export default EmployeesAdd
