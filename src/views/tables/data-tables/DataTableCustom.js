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
import { Star, Search } from "react-feather"
import axios from 'axios'

const CustomHeader = props => {
  return (
    <div className="d-flex flex-wrap justify-content-between">
      <div className="add-new">
        <Button.Ripple color="primary" onClick={() => props.tarikData()}>Add New</Button.Ripple>
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

// const tarikData = async() =>{
//   console.log('tarik data')
//   let sql = `
//   select * from employees limit 100;
// `
// var result = await axios.post('http://localhost:3001/api/query', {
//                           query : sql
//                         })
//                           .then(result => {
//                             let res = result.data.response
//                             console.log('result : ', result)
//                             if (res.length == '') {
//                               return []
//                             }
//                             // console.log('result : ', (result.data))
//                             return res;
//                         }).catch(err => {
//                           console.log('error : ', err)
//                             return []
//                         })
// await this.setState({data: result})
// }

class DataTableCustom extends React.Component {
  state = {
    columns: [
      {
        name: "Name",
        selector: "name",
        sortable: true,
        minWidth: "200px",
        cell: row => (
          <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
            <div className="user-img ml-xl-0 ml-2">
              {/* <img
                className="img-fluid rounded-circle"
                height="36"
                width="36"
                src={row.image}
                alt={row.name}
              /> */}
            </div>
            <div className="user-info text-truncate ml-xl-50 ml-0">
              <span
                // title={row.name}
                title={row.first_name+' '+row.last_name}
                className="d-block text-bold-500 text-truncate mb-0">
                {/* {row.name} */}
                {row.first_name+' '+row.last_name}
              </span>
              {/* <small title={row.email}>{row.email}</small> */}
              <small title={row.emp_no}>{row.emp_no}</small>
            </div>
          </div>
        )
      },
    ],
    data: [
      {
        image: require("../../../assets/img/portrait/small/avatar-s-12.jpg"),
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
    console.log('table custom : ')
    // var result = await axios.get('https://jsonplaceholder.typicode.com/users')
    //                         .then(result => {
    //                             let res = result.data
    //                             console.log('result : ', result)
    //                             if (res.length == '') {
    //                               return []
    //                             }
    //                             // console.log('result : ', (result.data))
    //                             return res;
    //                         }).catch(err => {
    //                             return []
    //                         })


      let sql = `
        select * from employees limit 100;
      `
      var result = await axios.post('http://localhost:3001/api/query', {
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



    // await this.setState({
    //   data: [
    //     {
    //       image: require("../../../assets/img/portrait/small/avatar-s-12.jpg"),
    //       name: "Hortensia Soaper",
    //       email: "hsoaperh@mapy.cz",
    //       date: "June 1, 2017",
    //       status: "active",
    //       revenue: "$60,000",
    //       ratings: "good"
    //     },
    //     {
    //       image: require("../../../assets/img/portrait/small/avatar-s-12.jpg"),
    //       name: "Hortensia SOTARSSSS",
    //       email: "hsoaperh@mapy.cz",
    //       date: "June 1, 2017",
    //       status: "active",
    //       revenue: "$60,000",
    //       ratings: "good"
    //     }
    //   ]
    // })

    await this.setState({
      data: result
    })


    console.log('state data:', this.state.data)
    console.log('state data:', typeof(this.state.data))

  }

  tarikData = async() =>{
      console.log('tarik data')
      let sql = `
      select * from employees limit 10001;
    `
    var result = await axios.post('http://localhost:3001/api/query', {
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

  handleFilter = e => {
    let value = e.target.value
    let data = this.state.data
    let filteredData = this.state.filteredData
    this.setState({ value })

    if (value.length) {
      filteredData = data.filter(item => {
        // console.log('ITEM : ', item)
        let startsWithCondition =
          item.first_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.last_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.emp_no.toString().toLowerCase().startsWith(value.toLowerCase())
          // item.name.toLowerCase().startsWith(value.toLowerCase())
          // item.date.toLowerCase().startsWith(value.toLowerCase()) ||
          // item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          // item.revenue.toLowerCase().startsWith(value.toLowerCase()) ||
          // item.status.toLowerCase().startsWith(value.toLowerCase())
        let includesCondition =
          item.first_name.toLowerCase().includes(value.toLowerCase()) ||
          item.last_name.toLowerCase().includes(value.toLowerCase()) ||
          item.emp_no.toString().toLowerCase().includes(value.toLowerCase())
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
      <Card>
        <CardHeader>
          <CardTitle>Custom</CardTitle>
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
    )
  }
}

export default DataTableCustom
