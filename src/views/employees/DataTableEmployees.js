import React from "react"
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Badge,
  Input,
  Button
} from "reactstrap"
import DataTable from "react-data-table-component"
import { Star, Search, 
    Edit,
    Trash,
    ChevronDown,
    Plus,
    Check,
    ChevronLeft,
    ChevronRight } from "react-feather"
import axios from 'axios'
import { api_query } from "../../api/ApiConstant"
import { Link, NavLink } from "react-router-dom"
import {Spinner} from "reactstrap"
import { connect } from "react-redux"
// import { changeRole } from "../../redux/actions/auth/loginActions"

var dummy_profile = require('../../assets/img/profile/user-uploads/user-07.jpg') // local
var dummy_profile = 'https://www.attendit.net/images/easyblog_shared/July_2018/7-4-18/b2ap3_large_totw_network_profile_400.jpg' //url/internet


const CustomHeader = props => {
  return (
    <div className="d-flex flex-wrap justify-content-between">
      <div className="add-new">
        <Button.Ripple color="none" className="bg-gradient-success" onClick={() => props.employeesAddPage()}>Tambah Data</Button.Ripple>
        {/* <Link to="/">
          <Button color="none" className="bg-gradient-success">Pindah</Button>
        </Link> */}
      </div>
      <div className="position-relative has-icon-left mb-1">
        <Input value={props.value} onChange={e => props.handleFilter(e)} />
        <div className="form-control-position">
          <Search size="15" />
        </div>
      </div>
    </div>
  )
}

const ActionsComponent = props => {
    return (
      <div className="data-list-action">
        <Button className="bg-gradient-success" color="none" size={'sm'}  style={{margin: 5}}
          onClick={()=> { 
            console.log('props : ', props); 
            return props.isEdit(props.row)
           }}> Edit 
        </Button>

        <Button className="bg-gradient-danger" color="none" size={'sm'} style={{margin: 5}}
          onClick={()=> { 
            console.log('props : ', props); 
            return props.isDelete(props.row)
           }}> Delete 
        </Button>

      </div>
    )
  }

class DataTableDigimon extends React.Component {

  static getDerivedStateFromProps(props, state) {
    if (props.role !== state.role) {
      return {
        role: props.role
      }
    }
    // Return null if the state hasn't changed
    return null
  }

  state = {
    columns: [
      {
        name: "Name",
        selector: "name",
        sortable: true,
        minWidth: "200px",
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.first_name+' '+row.last_name}
                className="d-block text-bold-500 text-truncate mb-0">
                {row.first_name} {row.last_name}
              </span>
            </div>
          </div>
        )
      },
      {
        name: "Gender",
        selector: "gender",
        sortable: true,
        minWidth: "200px",
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.gender == 'M' ? 'Laki - Laki' : 'Perempuan'}
                className="d-block text-bold-500 text-truncate mb-0">
                {row.gender == 'M' ? 'Laki - Laki' : 'Perempuan'}
              </span>
            </div>
          </div>
        )
      },
      {
        name: "No Karyawan",
        selector: "emp_no",
        sortable: true,
        minWidth: "200px",
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.emp_no}
                className="d-block text-bold-500 text-truncate mb-0">
                {row.emp_no}
              </span>
            </div>
          </div>
        )
      },
      {
        name: "Department",
        selector: "dept_name", // ini harus sama kyk title
        sortable: true,
        minWidth: "200px",
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.dept_name}
                className="d-block text-bold-500 text-truncate mb-0">
                {row.dept_name}
              </span>
            </div>
          </div>
        )
      },
      {
        name: "Position",
        selector: "position",
        sortable: true,
        minWidth: "200px",
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.position}
                className="d-block text-bold-500 text-truncate mb-0">
                {row.position}
              </span>
            </div>
          </div>
        )
      },
      {
        name: "Profile",
        selector: "image_profile",
        sortable: true,
        minWidth: "200px",
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-img ml-xl-0 ml-2">
              <img
                className="img-fluid rounded-circle"
                height="36"
                width="36"
                src={row.image_profile == null || row.image_profile == "" ? dummy_profile:row.image_profile}
                alt={row.image_profile == null || row.image_profile == "" ? dummy_profile:row.image_profile}
                // src={row.img}
                // alt={row.name}
              />
            </div>
          </div>
        )
      },
      {
        name: "Actions",
        sortable: true,
        cell: row => (
          <ActionsComponent
            row={row}
            isEdit={this.isEdit}
            isDelete={this.isDelete}
          />
        )
      }
    ],
    data: [],
    tarikDataInterval : null,
    date: new Date().toLocaleString(),
    digit: 0,
    isLoading: false,
    filteredData: [],
    role: this.props.role,
    value: ""
  }

  componentDidMount=async()=>{
    
    this.setState({isLoading: true});
    await this.tarikData();
    await this.tarikDataInterval();
    // localStorage.setItem('user', 'admin')
    console.log('my role : ', this.state.role)
    this.setState({isLoading: false});
    // var tarikData = setInterval(this.tarikData(), 10000); // runs every 5 seconds.
    // await this.setState({tarikDataInterval: tarikData})
  }

  isEdit = async(result) => {
    console.log('edit : ', result)
    await this.props.changeViewPage('edit', result)
  }

  isDelete = async(result) =>{
    console.log('delete : ', result)

    let sql = `
        delete from employees_new where id = `+result.id+`;
    `
    var result = await axios.post(api_query, {
                                query : sql
                            })
                              .then(result => {
                                console.log('result query delete : ', result)
                                return
                              }).catch(err => {
                                return
                              })
    await this.tarikData();
  }

  tarikDataInterval = async() =>{
        // Untuk refresh data setiap skala detik

        setInterval(()=>{
          this.tarikData();
        }, 20000);

        setInterval(()=>{
          this.setState({
            date: new Date().toLocaleString()
          })
        },1000)
        
  }

  // componentWillUnmount=async()=>{
  //   // clearInterval(this.state.tarikDataInterval);
  // }

  componentDidUpdate=async(prevProps, prevState, snapShot)=>{
    // console.log('prevProps', prevProps)
    // if (prevState.data.length < this.state.data.length || prevState.data.length > this.state.data.length) {
    //   console.log('didUpdate')
    // }
    // console.log('prevState data : ', prevState.data.length)
  }


  tarikData = async() =>{
    console.log('tarik data')
    // let sql = `
    //     select * from employees_new limit 10000;
    // `

    let sql = `
    select	en.id,
            en.first_name, 
            en.last_name, 
            en.emp_no, 
            en.gender,
            en.image_profile,
            dn.id as id_dept_name,
            dn.dept_name,
            pm.id as id_position,
            pm.position
        from dept_emp_new den
        join employees_new en  
        on  en.id = den.emp_id
        join departments_new dn 
        on dn.id = den.dept_id 
        join position_management pm 
        on pm.id  = den.position_id
    `
    var result = await axios.post(api_query, {
                                query : sql
                            })
                                .then(result => {
                                let res = result.data.response
                                console.log('result : ', result)
                                if (res.length == '') {
                                    return []
                                }
                                // console.log('result : ', (result.data))
                                return res;
                            }).catch(err => {
                                console.log('error : ', err)
                                return []
                            })
    await this.setState({data: result})
    }

  employeesAddPage = async() =>{
      // console.log('props', this.props)
      await this.props.changeViewPage('add')
  }

  handleFilter = e => {
    let value = e.target.value
    let data = this.state.data
    let filteredData = this.state.filteredData
    this.setState({ value })

    if (value.length) {
      filteredData = data.filter(item => {
        
        // all_name gabisa karena ada spasi
        var all_name = item.first_name + ' ' + item.last_name
        var gender = item.gender
        var emp_no = item.emp_no
        var dept_name = item.dept_name
        var position = item.position
        if (emp_no == null || emp_no == undefined) {
          emp_no = ''
        }else{emp_no = item.emp_no}
        if (gender == 'M') {
            gender = 'Laki - Laki'
        }else {
          gender = 'Perempuan'
        }
        // if(dept_name.split(" ").length > 1){

        // }
        // console.log('ITEM : ', item)
        let startsWithCondition =
          item.first_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.last_name.toLowerCase().startsWith(value.toLowerCase()) ||
          gender.toLowerCase().startsWith(value.toLowerCase()) ||
          // all_name.toLowerCase().startsWith(value.toLowerCase()) ||
          emp_no.toString().toLowerCase().includes(value.toLowerCase()) ||
          dept_name.toLowerCase().startsWith(value.toLowerCase()) ||
          position.toLowerCase().startsWith(value.toLowerCase())
          // item.emp_no.toString().toLowerCase().startsWith(value.toLowerCase())
          // item.name.toLowerCase().startsWith(value.toLowerCase())
          // item.date.toLowerCase().startsWith(value.toLowerCase()) ||
          // item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          // item.revenue.toLowerCase().startsWith(value.toLowerCase()) ||
          // item.status.toLowerCase().startsWith(value.toLowerCase())
        let includesCondition =
          item.first_name.toLowerCase().includes(value.toLowerCase()) ||
          item.last_name.toLowerCase().includes(value.toLowerCase()) ||
          gender.toLowerCase().includes(value.toLowerCase()) ||
          // all_name.toLowerCase().startsWith(value.toLowerCase()) ||
          emp_no.toString().toLowerCase().includes(value.toLowerCase()) ||
          dept_name.toLowerCase().startsWith(value.toLowerCase()) ||
          position.toLowerCase().startsWith(value.toLowerCase())
          // item.emp_no.toString().toLowerCase().includes(value.toLowerCase())
          // item.name.toLowerCase().includes(value.toLowerCase())
          // item.date.toLowerCase().includes(value.toLowerCase()) ||
          // item.email.toLowerCase().includes(value.toLowerCase()) ||
          // item.revenue.toLowerCase().includes(value.toLowerCase()) ||
          // item.status.toLowerCase().includes(value.toLowerCase())

        if (startsWithCondition) {
          return startsWithCondition
        } else if (!startsWithCondition && includesCondition) {
          return includesCondition
        } else return null
      })
      this.setState({ filteredData })
    }
  }

  render() {
    let { data, columns, value, filteredData } = this.state
    return (
        <>
        
{!this.state.isLoading?
            <Card>
                <CardHeader>
                <CardTitle>Employees Table ({this.state.date})</CardTitle>
                </CardHeader>
                <CardBody className="rdt_Wrapper">
                <DataTable
                className="dataTable-custom"
                data={value.length ? filteredData : data}
                columns={columns}
                noHeader
                pagination
                subHeader
                subHeaderComponent={
                <CustomHeader value={value} handleFilter={this.handleFilter} employeesAddPage={this.employeesAddPage}/>
                }
            />
                </CardBody>
            </Card>
:
            <Card>
                <CardHeader>
                <CardTitle>Employees Table ({this.state.date})</CardTitle>
                </CardHeader>
                <CardBody className="rdt_Wrapper">
                  <div className="text-center">
                    <Spinner color="none"/>
                  </div>
                </CardBody>
            </Card>

}

            {/* {this.state.isLoading?
              <div className="text-center">
                <Spinner color="primary" className="bg-gradient-success"/>
              </div>
            :null} */}
      </>
    )
  }
}

// export default DataTableDigimon

const mapStateToProps = state => {
  return {
    role: state.auth.login.userRole
  }
}
export default connect(mapStateToProps, { 
  // changeRole 
})(DataTableDigimon)
