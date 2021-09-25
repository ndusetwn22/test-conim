import React from "react"
import Wizard from "./WizardComponent"
import {
  FormGroup,
  Input,
  Label,
  CustomInput,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  Button,
} from "reactstrap"
import Checkbox from "../op-ss-component/CheckBoxesVuexy"
import { Check, Home, Briefcase, Image } from "react-feather"
import { history } from "../../../../../src/history"
class FormWizard extends React.Component {
  state = {
    myProfile: null,
    nik: '',
    first_name: '',
    steps: [
      {
        title: <Home size={20} />,
        content:
        <>
        <h4>CFF Form </h4>
        <Row>
          <Col md="6" sm="12">
            <FormGroup>
              <Label> First Name </Label>
              <Input type="text"
                    //  placeholder={'wkwk'}
                    //  value={this.state.myProfile == null? '':this.state.myProfile.name}
                     onChange={(val)=>this.setState({first_name: val.target.value})}
              />
            </FormGroup>
          </Col>
          <Col md="6" sm="12">
            <FormGroup>
              <Label> Last Name </Label>
              <Input type="text" />
            </FormGroup>
          </Col>
          <Col md="6" sm="12">
            <FormGroup>
              <Label> Email Name </Label>
              <Input type="email" />
            </FormGroup>
          </Col>
          <Col md="6" sm="12">
            <FormGroup>
              <Label> City Name </Label>
              <CustomInput type="select" name="select" id="city">
                <option>New York</option>
                <option>Chicago</option>
                <option>San Francisco</option>
                <option>Boston</option>
              </CustomInput>
            </FormGroup>
          </Col>
        </Row>
        </>
      },
      {
        title: <Briefcase size={20} />,
        content: <Row>
          <Col md="6" sm="12">
            <FormGroup>
              <Label> Proposal Title </Label>
              <Input type="text" />
            </FormGroup>
            <FormGroup>
              <Label> Job Title </Label>
              <Input type="text" />
            </FormGroup>
          </Col>
          <Col md="6" sm="12">
            <FormGroup>
              <Label> Proposal Title </Label>
              <Input type="textarea" rows="5" />
            </FormGroup>
          </Col>
        </Row>
      },
      {
        title: <Image size={20} />,
        content: <Row>
          <Col md="6" sm="12">
            <FormGroup>
              <Label> Event Name </Label>
              <Input type="text" />
            </FormGroup>
          </Col>
          <Col md="6" sm="12">
            <FormGroup>
              <Label> Event Location </Label>
              <CustomInput type="select" name="select" id="location">
                <option>New York</option>
                <option>Chicago</option>
                <option>San Francisco</option>
                <option>Boston</option>
              </CustomInput>
            </FormGroup>
          </Col>
          <Col md="6" sm="12">
            <FormGroup>
              <Label> Event Status </Label>
              <CustomInput type="select" name="select" id="status">
                <option>Planning</option>
                <option>In Process</option>
                <option>Finished</option>
              </CustomInput>
            </FormGroup>
          </Col>
          <Col md="6" sm="12">
            <FormGroup>
              <Label> Event Status </Label>
              <Label className="mr-2">Requirements :</Label>
              <div className="stacked-checkbox">
                <div className="d-inline-block mr-2">
                  <Checkbox
                    color="primary"
                    icon={<Check className="vx-icon" size={16} />}
                    label="Staffing"
                    defaultChecked={false}
                  />
                </div>
                <div className="d-inline-block">
                  <Checkbox
                    color="primary"
                    icon={<Check className="vx-icon" size={16} />}
                    label="Catering"
                    defaultChecked={false}
                  />
                </div>
              </div>
            </FormGroup>
          </Col>
        </Row>
      }
    ]
  }

  componentDidMount = async()=>{
    await this.isLogin('op_df');
    console.log('props form : ', this.props)
  }

  isLogin = async(role) =>{
    if (localStorage.getItem('account') == undefined || localStorage.getItem('account') == null) {
      history.push("/pages/login")
    }else if(JSON.parse(localStorage.getItem('account')).role !== role){
      history.push("/pages/login")
    }
    else{
      var myProfile = JSON.parse(localStorage.getItem('account'))
      console.log('myProfile : ', myProfile)
      this.setState({myProfile: myProfile})
    }
  }

  render() {
    const { steps } = this.state
    return (
      <Card>
        <CardHeader>
          <CardTitle>Suggestion System</CardTitle>
        </CardHeader>
        <CardBody>
          <Wizard
            steps={steps}
          />
          <Button.Ripple color="none" className="bg-gradient-success" onClick={() => console.log(this.state.first_name)}>Print Something</Button.Ripple>
        </CardBody>
      </Card>
    )
  }
}

export default FormWizard
