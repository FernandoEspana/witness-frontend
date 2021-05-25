import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import axios from 'axios';
import { 
  Alert, 
  Form, 
  Button, 
  Container, 
  Modal, 
  Col, 
  Row, 
  Spinner, 
} from 'react-bootstrap';


const NewWitnessModal = (props) => {
  const [formValues, handleInputChange] = useForm({
    email: '',
    name:'',
    role:'WITNESS_ROLE',
  });
  const [response, setResponse] = useState(0);
  const [loading, setLoading] = useState(false);
  const { email, name, role } = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    setLoading(true);
    try {
      await axios({
        method: 'POST',
        baseURL: 'http://localhost:8000',
        url: '/witness/register',
        data: {
          name,
          role,
          email,
        }
      });
      setResponse(1);
      setLoading(false);
      } catch (error) {
      setResponse(2);
      setLoading(false);
      }
  }
  
  const handleOnclose= () =>{
    setResponse(0);
    props.onHide();
  }
 
  return (
    <>
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header >
          <Modal.Title id="contained-modal-title-vcenter">
            Agregar nuevo testigo electoral
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={ handleSubmit }>
              <Row>
                <Col>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                      value={ email }
                      type="email"
                      name="email" 
                      onChange={ handleInputChange }/>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control 
                      value={ name }
                      type="text"
                      name="name" 
                      onChange={ handleInputChange }/>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3">
                <Form.Group onChange={ handleInputChange }>
                  <Form.Check 
                    inline 
                    label="Testigo"
                    type="radio" 
                    value="WITNESS_ROLE"
                    defaultChecked={ true }
                    name="role"/>
                  <Form.Check 
                    inline
                    label="Admin" 
                    type="radio" 
                    value="ADMIN_ROLE" 
                    name="role"/> 
                </Form.Group>
              </Row>
            </Form>
            <Row>
              {
                loading &&
                <Spinner animation="border" variant="primary" />
              }
              {
                response === 1 && 
                <Alert variant="success">
                  Email se envio correctamente
                </Alert>
              }
              {
                response === 2 && 
                <Alert variant="danger">
                  Ooopss! Algo salió mal
                </Alert>
              }
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button  variant="primary" onClick={ handleSubmit }>Enviar</Button>
          <Button variant="outline-danger" onClick={ handleOnclose }>Cerrar</Button>
        </Modal.Footer>
      </Modal>  
    </>
  );
}

export default NewWitnessModal
