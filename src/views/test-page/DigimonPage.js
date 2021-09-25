import React from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb"
import DataTableDigimon from "./DataTableDigimon"
import DataTableCustom from "../tables/data-tables/DataTableCustom"


class DigimonPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Digimon Index"
          breadCrumbParent="Digimon"
          breadCrumbActive="Digimon Index"
        />
        <Row>
          <Col sm="12">
            <DataTableDigimon />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default DigimonPage
