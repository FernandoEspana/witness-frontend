import React, { useState } from 'react';
import { 
  Button,
  Spinner,
  Alert, 
  Container, 
  Form, 
  Modal, 
  Row, 
  Col 
} from 'react-bootstrap';
import { useForm } from '../../hooks/useForm';
import axios from 'axios';

const NewStationModal = (props) => {


  const [formValues, handleInputChange] = useForm({
    name: '',
    address: '',
    lat: 0,
    long: 0,
    tables: 0,
    city: '',
  });
  const [response, setResponse] = useState(0);
  const [loading, setLoading] = useState(false);
  const { name, address, lat, long, tables, city } = formValues;

  const handleSubmit= async(e) => {
    e.preventDefault();
    console.table(formValues);
    
    try {
      await axios({
        method: 'POST',
        baseURL: 'http://localhost:8000',
        url: '/pollingStation/create',
        data: {
          name,
          address,
          latitud: parseFloat(lat),
          longitud: parseFloat(long),
          tablesNumber: parseInt(tables),
          witnessIDs: []
        }
      });
      setResponse(1);
      setLoading(false);
      } catch (error) {
        setResponse(2);
        setLoading(false);
      }
  }
  


  return (
    <>
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header>
          <Modal.Title>
            Agregar puesto de votación
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={ handleSubmit }>
              <Row>
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
                <Col>
                  <Form.Group controlId="formBasicAddress">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control 
                      value={ address }
                      type="text"
                      name="address" 
                      onChange={ handleInputChange }/>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <Form.Group controlId="formBasicLatitud">
                    <Form.Label>Latitud</Form.Label>
                    <Form.Control 
                      value={ lat }
                      type="text"
                      name="lat" 
                      onChange={ handleInputChange }/>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicLongitud">
                    <Form.Label>Longitud</Form.Label>
                    <Form.Control 
                      value={ long }
                      type="text"
                      name="long" 
                      onChange={ handleInputChange }/>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <Form.Group controlId="formBasicTables">
                    <Form.Label>Nro. de mesas</Form.Label>
                    <Form.Control 
                      value={ tables }
                      type="text"
                      name="tables" 
                      onChange={ handleInputChange }/>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicCity">
                    <Form.Label>Ciudad</Form.Label>
                    <Form.Control 
                      value={ city }
                      type="text"
                      name="city" 
                      onChange={ handleInputChange }/>
                  </Form.Group>
                </Col>
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
                  Nuevo Puesto se creo correctamente
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
          <Button onClick={ handleSubmit }>Enviar</Button>
          <Button variant="outline-danger" onClick={ props.onHide }>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default NewStationModal
