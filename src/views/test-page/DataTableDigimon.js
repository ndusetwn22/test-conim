import React from "react"
import { api_query } from "../../api/ApiConstant"
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
import ModalDigimon from "./ModalDigimon"
import { history } from "../../../src/history"

const CustomHeader = props => {
  return (
    <div className="d-flex flex-wrap justify-content-between">
      <div className="add-new">
        <Button.Ripple color="none" className="bg-gradient-success" onClick={() => props.tarikData()}>Add New</Button.Ripple>
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
        <Button.Ripple className="mr-1 mb-1 bg-gradient-success" color="none"
          onClick={()=> {
            console.log('props : ', props);
            console.log('digimon : ', props.row.name);
            return props.isVisible(props.row.name, props.row.img)
            }}> Showss </Button.Ripple>

      </div>
    )
  }

class DataTableDigimon extends React.Component {
  state = {
    modalVisible: false,
    modalImage: '',
    modalDigimonName: '',
    columns: [
      {
        name: "Name",
        selector: "name",
        sortable: true,
        minWidth: "200px",
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-img ml-xl-0 ml-2">
              <img
                className="img-fluid rounded-circle"
                height="36"
                width="36"
                src={row.img}
                alt={row.name}
              />
            </div>
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.name}
                className="d-block text-bold-500 text-truncate mb-0">
                {row.name}
              </span>
            </div>
          </div>
        )
      },
      {
        name: "Image",
        selector: "img",
        sortable: true,
        minWidth: "200px",
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-img ml-xl-0 ml-2">
              <img
                className="img-fluid rounded-circle"
                height="100"
                width="100"
                src={row.img}
                alt={row.name}
              />
            </div>
          </div>
        )
      },
      {
        name: "Digimon Status",
        selector: "level",
        sortable: true,
        minWidth: "200px",
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                title={row.level}
                className="d-block text-bold-500 text-truncate mb-0">
                {row.level}
              </span>
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
            // getData={this.state.data}
            isVisible= {this.toggleModalDigimon}
          />
        )
      }
    ],
    data: [
      {
        image: require("../../assets/img/portrait/small/avatar-s-12.jpg"),
        name: "Hortensia Soaper",
        email: "hsoaperh@mapy.cz",
        date: "June 1, 2017",
        status: "active",
        revenue: "$60,000",
        ratings: "good"
      }
    ],
    filteredData: [],
    value: ""
  }

  componentDidMount=async()=>{
    await this.isLogin();

    await this.tarikData();
    await this.tarikDataPostgre();

    // console.log('state data:', typeof(this.state.data))
    // console.log('local', JSON.parse(localStorage.getItem('account')).role)

  }

  isLogin = async() =>{
    if (localStorage.getItem('account') == undefined || localStorage.getItem('account') == null) {
      history.push("/pages/login")
    }
  }

  toggleModalDigimon = async(name, img) =>{
      console.log('LAUNCH TOGGLE DIGIMON')

      if (name == undefined) {
        await this.setState({
            modalVisible: false,
            modalImage: null,
            modalNameDigimon: ''
        })
      }else{
        await this.setState({
            modalVisible: !this.state.modalVisible,
            modalImage: img,
            modalDigimonName: name
        })
      }


  }

  tarikData = async() =>{
        var result = await axios.get('https://digimon-api.vercel.app/api/digimon')
            .then(result => {
                // console.log('result digimon : ', result)
                let res = result.data
                console.log('result : ', result)
                if (res.length == '') {
                return []
                }
                // console.log('result : ', (result.data))
                return res;
            }).catch(err => {
                return []
            })

        await this.setState({
            data: result
        })
    }

    tarikDataPostgre = async() =>{
      // console.log('tarik data')
      // let sql = `
      //     select * from employees_new limit 10000;
      // `
      console.log('test query')

      let sql = `
      select * from df_master_user
      `
      var result = await axios.post(api_query, {
                                  query : sql
                              })
                                  .then(result => {
                                  let res = result.data.response
                                  // console.log('result : ', result)
                                  console.log('result postgres : ', result)
                                  console.log('postgres : ', res)
                                  if (res.length == '') {
                                      return []
                                  }
                              }).catch(err => {
                                  console.log('error : ', err)
                                  return []
                              })
        await this.setState({position: result})
      }

  handleFilter = e => {
    let value = e.target.value
    let data = this.state.data
    let filteredData = this.state.filteredData
    this.setState({ value })

    if (value.length) {
      filteredData = data.filter(item => {
        // console.log('ITEM : ', item)
        let startsWithCondition =
          item.name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.img.toLowerCase().startsWith(value.toLowerCase()) ||
          item.level.toLowerCase().startsWith(value.toLowerCase())
          // item.name.toLowerCase().startsWith(value.toLowerCase())
          // item.date.toLowerCase().startsWith(value.toLowerCase()) ||
          // item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          // item.revenue.toLowerCase().startsWith(value.toLowerCase()) ||
          // item.status.toLowerCase().startsWith(value.toLowerCase())
        let includesCondition =
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.img.toLowerCase().includes(value.toLowerCase()) ||
          item.level.toLowerCase().includes(value.toLowerCase())
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
            <Card>
                <CardHeader>
                <CardTitle>Digimon Table</CardTitle>
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
                    <CustomHeader value={value} handleFilter={this.handleFilter} tarikData={this.tarikData}/>
                    }
                />
                </CardBody>
            </Card>
            <ModalDigimon {...this.state} {...this.props}
                        // modalImage={this.state.modalImage}
                        // modalVisible={this.state.modalVisible}
                        toggleModal={this.toggleModalDigimon}></ModalDigimon>
      </>
    )
  }
}

export default DataTableDigimon
