import React from "react"
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
  Spinner,
  CustomInput,
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

class EmployeesEdit extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        first_name: this.props.editData.first_name,
        last_name: this.props.editData.last_name,
        emp_no: this.props.editData.emp_no,
        gender: this.props.editData.gender,
        dept_name_selected: this.props.editData.id_dept_name,
        // dept_name: [
        //   { value: "1", label: "Information Technology" }
        // ],
        dept_name: this.props.editData.all_dept_name,
        position_selected: this.props.editData.id_position,
        // position: [
        //   { value: "1", label: "Staff" }
        // ],
        position: this.props.editData.all_position,
        profileImage: this.props.editData.image_profile == "" || this.props.editData.image_profile == null ? this.props.editData.image_profile : null,
        isLoading: false,
        isSweetAlert: false,
        sweetAlertTitle: 'Judul',
        sweetAlertText: 'Text',
        sweetAlertType: 'warning'
        
      }
  }

  componentDidMount= async()=>{
      console.log('edit page props : ', this.props)
      console.log('wkwkwk : ', this.props.editData.image_profile)
      // await this.tarikDataDept();
      // await this.tarikDataPosition();
      // setTimeout(() => {}, 3000);
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

  submitForm = async() =>{

    var title = ''
    var text = ''
    var type = ''
    console.log('SUBMIT : ', this.state.first_name)
    console.log('SUBMIT : ', this.state.last_name)
    // console.log('event : ', e)


    if (this.state.first_name == '' || this.state.first_name == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Nama Awalan Tidak Boleh Kosong', 'warning')}
    if (this.state.last_name == '' || this.state.last_name == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Nama Akhiran Tidak Boleh Kosong', 'warning')}
    if (this.state.emp_no == '' || this.state.emp_no == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'No Karyawan Tidak Boleh Kosong', 'warning')}
    if (this.state.gender == '' || this.state.gender == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Gender Tidak Boleh Kosong', 'warning')}
    if (this.state.dept_name_selected == '' || this.state.dept_name_selected == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Departement Tidak Boleh Kosong', 'warning')}
    if (this.state.position_selected == '' || this.state.position_selected == null) {return await this.handleAlert('isSweetAlert', true, 'Warning', 'Position Tidak Boleh Kosong', 'warning')}
    else {

      this.setState({isLoading: true});

        let sql = `
            update employees_new set
                first_name = '`+this.state.first_name+`',
                last_name = '`+this.state.last_name+`',
                emp_no = `+this.state.emp_no+`,
                gender = '`+this.state.gender+`'
            where 
                id = `+this.props.editData.id+`
        `
        var result = await axios.post(api_query, {
                                    query : sql
                                })
                                    .then(async(result) => {
                                    // let res = result.data.response
                                    // console.log('result : ', result)
                                    // if (res.length == '') {
                                    //     return []
                                    // }
                                    // // console.log('result : ', (result.data))
                                    // return res;
                                    let sql2 = `
                                        update dept_emp_new set
                                            dept_id = `+this.state.dept_name_selected+`,
                                            position_id = `+this.state.position_selected+`
                                        where 
                                            emp_id = `+this.props.editData.id+`
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

        if (this.state.profileImage != null) {

            var bucketName = 'images'
            var file = this.state.profileImage[0]
            var storageRef = await firebase.storage().ref(`${bucketName}/${file.name}`)
            let uploadTask = await storageRef.put(file)
            var myurl = await storageRef.getDownloadURL().catch((error)=>{throw error});
            console.log('myurl : ', myurl)

            let sql = `
              update employees_new set
                  image_profile = '`+myurl+`'
              where 
                  id = `+this.props.editData.id+`
          `
          var result = await axios.post(api_query, {
                                      query : sql
                                  })
                                      .then(async(result) => {
                                      
                                      
                                  }).catch(err => {
                                      console.log('error : ', err)
                                      return []
                                  })
        }

        
        this.setState({isLoading: false});
        console.log('result query : ', result)
        this.props.changeViewPage('page')
        // return await this.handleAlert('isSweetAlert', true, 'Success', 'Data Berhasil Ditambahkan '+this.state.first_name+ " "+ this.state.last_name, 'success')

        // console.log('state dept: ', this.state.dept_name_selected)
        // console.log('state posit: ', this.state.position_selected)
        // var x = this.state.dept_name.filter(x => x.label === this.state.dept_name_selected)
        // console.log('x : ', x)
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

  render() {
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
          <CardTitle>Edit Karyawan</CardTitle>
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
                    value={this.state.first_name}
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
                    value={this.state.last_name}
                    onChange={(val)=>this.setState({last_name: val.target.value})}
                  />
                  <div className="form-control-position">
                    <Mail size={15} />
                  </div>
                </FormGroup>
              </Col>
              <Col sm="12">
                <Label for="Karyawan">No Karyawan</Label>
                <FormGroup className="has-icon-left position-relative">
                  <Input
                    type="number"
                    name="no_karyawan"
                    id="Karyawan"
                    placeholder="No Karyawan"
                    value={this.state.emp_no}
                    onChange={(val)=>this.setState({emp_no: val.target.value})}
                  />
                  <div className="form-control-position">
                    {/* <Mail size={15} /> */}
                    <Info size={15} />
                  </div>
                </FormGroup>
              </Col>
              <Col sm="12">
                <Label for="gender">Gender</Label>
                <FormGroup className="has-icon-left position-relative">
                  <div className="d-inline-block mr-1">
                    <Radio label="Laki - laki" defaultChecked={this.state.gender == 'M' ? true:false} name="gender" value="M" onChange={(val)=>this.setState({gender: val.target.value})}/>
                  </div>
                  <div className="d-inline-block mr-1">
                    <Radio label="Perempuan" defaultChecked={this.state.gender == 'F' ? true:false} name="gender" value="F" onChange={(val)=>this.setState({gender: val.target.value})}/>
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
                    // placeholder="wkwkw"
                    // value={'wkwkwk'}
                    // value={this.state.profileImage}
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
                    // defaultValue={this.state.dept_name.filter(x => x.label === this.state.dept_name_selected)}
                    defaultValue={this.state.dept_name.filter(x => x.value === this.state.dept_name_selected)}
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
                    // defaultValue={this.state.position.filter(x => x.label === this.state.position_selected)}
                    defaultValue={this.state.position.filter(x => x.value === this.state.position_selected)}
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
              {/* <Col sm="12">
                <FormGroup className="has-icon-left position-relative">
                  <Checkbox
                    color="primary"
                    icon={<Check className="vx-icon" size={16} />}
                    label="Remember Me"
                    defaultChecked={false}
                  />
                </FormGroup>
              </Col> */}
              <Col sm="12">
                <FormGroup className="has-icon-left position-relative">
                  <Button.Ripple
                    color="none"
                    className="mr-1 mb-1 bg-gradient-success"
                    onClick={() => this.submitForm()}
                    // onClick={e => e.preventDefault()}
                  >
                    Edit Data
                  </Button.Ripple>
                  {/* <input type="submit" value="Submit" /> */}
                  {/* <Button.Ripple
                    outline
                    color="warning"
                    type="reset"
                    className="mb-1"
                  >
                    Reset
                  </Button.Ripple> */}
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>

:
      <Card>
        <CardHeader>
          <CardTitle>Edit Karyawan</CardTitle>
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
export default EmployeesEdit
