import React from "react"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardTitle,
  CardImg,
  CardImgOverlay,
  CardBody,
  Row,
  Col
} from "reactstrap"

import overlayImg1 from "../../assets/img/pages/card-image-6.jpg"

class ModalDigimon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: this.props.modalVisible
            // modal: true
        };
    }

    componentDidMount = async() =>{
        console.log('props modal : ', this.props)
    }

    toggleModal = () => {
        // this.setState(state => ({
        // modal: !this.state.modal
        // }))
        // this.setState({
        //     modal: !this.state.modal
        // })

        this.props.toggleModal()
    }

  render(){
    return(
        <>
        {/* <Button
            color="primary"
            className="btn-block"
            size="lg"
            outline
            onClick={this.toggleModal}
            >
            Launch Modal
        </Button> */}
        <Modal
            isOpen={this.props.modalVisible}
            toggle={this.toggleModal}
            className="modal-dialog-centered"
            style={{padding: '6rem'}}
            >
            <ModalHeader toggle={this.toggleModal}>
                Digimon Detail
            </ModalHeader>
            <ModalBody className="modal-dialog-centered">
                {/* Oat cake ice cream candy chocolate cake chocolate cake
                cotton candy dragée apple pie. Brownie carrot cake candy
                canes bonbon fruitcake topping halvah. Cake sweet roll cake
                cheesecake cookie chocolate cake liquorice. */}
                {/* <Col lg="4" md="6" sm="12"> */}
                    <Card className="text-white overlay-img-card">
                        <CardImg src={this.props.modalImage} alt="overlay img" style={{justifyContent: 'center', alignSelf: 'center', justifySelf: 'center'}}/>
                        <CardImgOverlay className="d-flex flex-column justify-content-between">
                            {/* overlay-black */}
                        <CardTitle className="text-black">{this.props.modalDigimonName}</CardTitle>
                        {/* <p>
                            Cake sesame snaps cupcake gingerbread danish I love gingerbread.
                            Apple pie pie jujubes chupa chups muffin halvah lollipop.
                        </p> */}
                        </CardImgOverlay>
                    </Card>
                {/* </Col> */}
            </ModalBody>
            <ModalFooter>
                <Button color="none" className='bg-gradient-success' onClick={this.toggleModal}>
                Accept
                </Button>{" "}
            </ModalFooter>
        </Modal>
    </>
    );
 }
}
export default ModalDigimon