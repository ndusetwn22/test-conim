import React from "react"
import { Row, Col, Spinner } from "reactstrap"
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb"
import DataTableEmployees from "./DataTableEmployees"
import EmployeesAdd from "./EmployeesAdd"
import EmployeesEdit from "./EmployeesEdit"
import axios from 'axios';
import { api_query } from "../../api/ApiConstant"


class EmployeesPage extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          addPage: false,
          editPage: false,
          editData: null,
          dept_name: null,
          position: null,

      }
  }

  changeViewPage = async(typeView, resultEdit) =>{
    if (typeView == 'add') {
        await this.setState({addPage: true, editPage: false})
    }else if (typeView == 'edit') {
      await this.tarikDataDept();
      await this.tarikDataPosition();
      var tmp = resultEdit
      tmp.all_dept_name = this.state.dept_name
      tmp.all_position = this.state.position
      // console.log('new data tmp : ', tmp)
      await this.setState({editPage: true, editData: tmp, addPage: false})
      // await this.setState({editPage: true, editData: resultEdit, addPage: false})
    }
    else{
        await this.setState({addPage: false, editPage: false})
    }
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
    return (
      <React.Fragment>
        {this.state.addPage ? 
            <Breadcrumbs
                breadCrumbTitle="Employees Add"
                breadCrumbParent="Employees"
                breadCrumbActive="Employees Add"
            />
        :
        this.state.editPage ? 
            <Breadcrumbs
                breadCrumbTitle="Employees Edit"
                breadCrumbParent="Employees"
                breadCrumbActive="Employees Edit"
            />
        :
            <Breadcrumbs
                breadCrumbTitle="Employees"
                breadCrumbParent="Employees"
                breadCrumbActive="Employees"
            />
         }
        <Row>

          <Col sm="12">
              {this.state.addPage ? 
                <EmployeesAdd {...this.state} {...this.props} changeViewPage={this.changeViewPage}/>
                // <Spinner color="primary" />
              : 
              this.state.editPage ? 
                <EmployeesEdit {...this.state} {...this.props} changeViewPage={this.changeViewPage}/>
              : 
                <DataTableEmployees {...this.state} {...this.props} changeViewPage={this.changeViewPage}/>
              }
          </Col>

        </Row>
      </React.Fragment>
    )
  }
}

export default EmployeesPage