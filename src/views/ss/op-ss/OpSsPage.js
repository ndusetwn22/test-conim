import React from "react"
import { Row, Col, Spinner } from "reactstrap"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import WizardBasic from "./op-ss-component/WizardBasic"
import WizardIcons from "./op-ss-component/WizardIcons"
import WizardValidation from "./op-ss-component/WizardValidation"
import FormWizard from "./op-ss-component/FormWizard"
import axios from 'axios';
import { api_query } from "../../../api/ApiConstant"
import OpSsTable from "./OpSsTable"
import OpSsCreate from "./op-ss-component/OpSsCreate"
import OpSsEdit from "./op-ss-component/OpSsEdit"
import { history } from "../../../../src/history"



class OpSsPage extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        addPage: false,
        editPage: false,
        editData: null,
        myProfile: null,
        dataAtasan: []



      }
  }

  componentDidMount = async() =>{
    await this.isLogin('op_df');
  }

  changeViewPage = async(typeView, resultEdit) =>{
    if (typeView == 'add') {
        await this.setState({addPage: true, editPage: false})
    }else if (typeView == 'edit') {
      //
      var tmpDataAtasan = this.tarikAtasan();
      var tmp = resultEdit
      // console.log('new data tmp : ', tmp)
      await this.setState({addPage: false, editPage: true, editData: tmp, dataAtasan: tmpDataAtasan})
    }
    else{
        await this.setState({addPage: false, editPage: false})
    }
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

  render() {
    return (
      <React.Fragment>
              {this.state.addPage ?
                <Breadcrumbs
                  breadCrumbTitle="SS Operator Create"
                  breadCrumbParent="SS"
                  breadCrumbActive="SS Operator Create"
                />
              :
              this.state.editPage ?
                <Breadcrumbs
                    breadCrumbTitle="SS Operator View"
                    breadCrumbParent="SS"
                    breadCrumbActive="SS Operator View"
                />
              :
                <Breadcrumbs
                    breadCrumbTitle="SS Operator"
                    breadCrumbParent="SS"
                    breadCrumbActive="SS Operator"
                />
              }

        <Row>
          <Col sm="12">
              {this.state.addPage ?
                  // <FormWizard {...this.state} {...this.props} changeViewPage={this.changeViewPage}/>
                  // <EmployeesAdd {...this.state} {...this.props} changeViewPage={this.changeViewPage}/>
                  <OpSsCreate {...this.state} {...this.props} changeViewPage={this.changeViewPage}/>
              :
              this.state.editPage ?
                <OpSsEdit {...this.state} {...this.props} changeViewPage={this.changeViewPage}/>
              :
                <OpSsTable {...this.state} {...this.props} changeViewPage={this.changeViewPage}/>
              }
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default OpSsPage
