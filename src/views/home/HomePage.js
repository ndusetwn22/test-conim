import React from "react"
import { Row, Col, Spinner, Card, CardBody, FormGroup, Input } from "reactstrap"
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb"
import { Search } from "react-feather"
import KnowledgeCards from "../pages/knowledge-base/KnowledgeCards"
import { history } from "../../../src/history"


class HomePage extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          value: ""

      }
  }

  componentDidMount = async() =>{
    await this.isLogin();
  }

  isLogin = async() =>{
    if (localStorage.getItem('account') == undefined || localStorage.getItem('account') == null) {
      history.push("/pages/login")
    }else{
      var myProfile = JSON.parse(localStorage.getItem('account'))
      console.log('myProfile', myProfile)
      this.setState({myProfile: myProfile})
    }
  }

  render() {
    return (
      <React.Fragment>
            <Breadcrumbs
                breadCrumbTitle="Home"
                breadCrumbParent="Home"
                breadCrumbActive="Home page"
            />
        <Row>

          <Col sm="12">
            <Card className="knowledge-base-bg">
              <CardBody>
                <h1 className="white text-center">Dankos Farma</h1>
                <p className="mb-2 white text-center">
                  Digitalization Suggestion System
                </p>
                <form>
                  <FormGroup className="position-relative has-icon-left mb-0">
                    <Input
                      type="text"
                      placeholder="Search a topic or a keyword"
                      bsSize="lg"
                      value={this.state.value}
                      onChange={this.onChange}
                    />
                    <div className="form-control-position">
                      <Search size={14} />
                    </div>
                  </FormGroup>
                </form>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12">
            {/* <KnowledgeCards value={this.state.value} /> */}
          </Col>

        </Row>
      </React.Fragment>
    )
  }
}

export default HomePage
