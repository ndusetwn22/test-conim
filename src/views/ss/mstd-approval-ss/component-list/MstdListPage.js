import React from "react"
import { Row, Col, Spinner } from "reactstrap"
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb"
import axios from 'axios';
import { api_query } from "../../../../api/ApiConstant"
import MstdListSs from "./MstdListSs";
import MstdListSsView from "./MstdListSsView"


class MstdListPage extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        addPage: false,
        editPage: false,
        editData: null,
      }
  }

  changeViewPage = async(typeView, resultEdit) =>{
    if (typeView == 'add') {
        await this.setState({addPage: true, editPage: false})
    }else if (typeView == 'edit') {
      //
      var tmp = resultEdit
      // console.log('new data tmp : ', tmp)
      await this.setState({addPage: false, editPage: true, editData: tmp})
    }
    else{
        await this.setState({addPage: false, editPage: false})
    }
  }

  render() {
    return (
      <React.Fragment>
            {/* <Breadcrumbs
                breadCrumbTitle="List SS"
                breadCrumbParent="SS"
                breadCrumbActive="List SS"
            /> */}
        <Row>
          <Col sm="12">
          {this.state.editPage ?
            <MstdListSsView {...this.state} {...this.props} changeViewPage={this.changeViewPage}/>
                :
            <MstdListSs {...this.state} {...this.props} changeViewPage={this.changeViewPage}/>
          }

          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default MstdListPage
