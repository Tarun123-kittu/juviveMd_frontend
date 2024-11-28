import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { Row,Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Default_women from '../../Images/default_women.svg'
import './Modal.css'
const AddUsermodal = ({show,setShow}) => {

    const handleClose = () => setShow(false);
  return (
    <div>
         <Modal show={show} onHide={handleClose} className='cmn_modal'>
            <div className='modal_head text-end'>
                <svg onClick={handleClose} width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path fill-rule="evenodd" clip-rule="evenodd" d="M23.545 3.63369C23.6891 3.48976 23.8034 3.31885 23.8815 3.13073C23.9595 2.9426 23.9998 2.74094 23.9999 2.53726C24 2.33359 23.96 2.13188 23.8822 1.94366C23.8044 1.75543 23.6902 1.58438 23.5463 1.44027C23.4024 1.29616 23.2315 1.18181 23.0433 1.10375C22.8552 1.02569 22.6536 0.985454 22.4499 0.985328C22.2462 0.985203 22.0445 1.0252 21.8563 1.10302C21.668 1.18085 21.497 1.29499 21.3529 1.43893L11.9995 10.7923L2.64883 1.43893C2.35779 1.14788 1.96305 0.984375 1.55145 0.984375C1.13985 0.984375 0.745107 1.14788 0.454063 1.43893C0.163018 1.72997 -0.000488278 2.12471 -0.000488281 2.53631C-0.000488284 2.94791 0.163018 3.34265 0.454063 3.63369L9.80744 12.9844L0.454063 22.3351C0.309952 22.4792 0.195638 22.6502 0.117645 22.8385C0.0396535 23.0268 -0.000488281 23.2286 -0.000488281 23.4324C-0.000488281 23.6362 0.0396535 23.838 0.117645 24.0263C0.195638 24.2146 0.309952 24.3857 0.454063 24.5298C0.745107 24.8209 1.13985 24.9844 1.55145 24.9844C1.75525 24.9844 1.95706 24.9442 2.14535 24.8662C2.33364 24.7882 2.50472 24.6739 2.64883 24.5298L11.9995 15.1764L21.3529 24.5298C21.6439 24.8205 22.0385 24.9837 22.4499 24.9834C22.8612 24.9832 23.2556 24.8195 23.5463 24.5285C23.837 24.2374 24.0002 23.8428 23.9999 23.4315C23.9996 23.0201 23.836 22.6257 23.545 22.3351L14.1916 12.9844L23.545 3.63369Z" fill="black"/>
                </svg>
            </div>
           <Modal.Body className='p-0'>
            <h5 className='mb-3 modal_heading'>Profile Photo</h5>
            <Row className='border-bottom pb-4 m-0'>
                <Col lg={6} className='border-end'>
                <div className='d-flex gap-4 align-items-center'>
                    <img src={Default_women} alt="user image" />
                    <div className='upload_image '>
                        <div className='upload_file position-relative'>  <Form.Control className='opacity-0 position-absolute p-0' type="file" placeholder="name@example.com" />Upload Photo</div>
                        <span className='remove_file'>Remove</span>
                    </div>
                </div>
                </Col>
                <Col lg={6}>
                <div className='image_req'>
                    <p>Image requirments:</p>
                    <span>1. Max. 2MB</span>
                    </div>
                    </Col>
            </Row>
            <h5 className='mb-3 modal_heading mt-3'>User Details</h5>
            <Row className='authWrapper '>
                <Col lg={6}>
                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" />
                </Form.Group>
                </Col>
                <Col lg={6}>
                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name" />
                </Form.Group>
                </Col>
                <Col lg={12}>
                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="number" placeholder="Enter phone number" />
                </Form.Group>
                </Col>
                <Col lg={12}>
                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                </Col>
                <Col lg={12}>
                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="address" placeholder="Enter address" />
                </Form.Group>
                </Col>
                <Col lg={12}>
                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                    <Form.Label>Select role</Form.Label>
                    <Form.Select>
                    <option>Select user role</option>
                </Form.Select>
                </Form.Group>
                </Col>
                <Col lg={12}>
                    <div className='text-end mt-1'>
                    <button className="cmn_btn px-4">Add User</button>
                    </div>
                </Col>
            </Row>
           </Modal.Body>
        </Modal>     
    </div>
  )
}

export default AddUsermodal