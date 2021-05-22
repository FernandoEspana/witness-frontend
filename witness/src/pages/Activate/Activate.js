import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';
import { Container, Col, Form, Button, Row } from 'react-bootstrap';
import { useForm } from '../../hooks/useForm';

const Activate = () => {
  let { token } = useParams();
  let decoded = jwt_decode(token);
  let history = useHistory();

  const [stations, setStations] = useState({});
  const [formValues, handleInputChange] = useForm({
    email: decoded.email,
    name: decoded.name,
    cellphone: '',
    idCard: '',
    pollingStationID: '',
    city: '',
    password: '',
    password2:'',
  });

  const { 
    email, 
    name, 
    cellphone, 
    idCard, 
    city,
    password,
    password2,
    pollingStationID,
  } = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.table(formValues);
    try {
      await axios({
        method: 'POST',
        baseURL: 'http://localhost:8000',
        url: '/witness/activate',
        data: {
          token,
          cellphone,
          city,
          idCard,
          password,
          pollingStationID,
        }
      });
      Swal.fire(
        'Testigo creado satisfactoriamente',
        'Click para terminar',
        'Success'
      )
      history.push('/');
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Algo salido mal',
        text: 'EL link ha expirado',
        footer: 'Comunicate con un administrador del sistema'
      })
    }

  }
  const handleCancel = (e) => {
    e.preventDefault();
    console.log('se oprime canclear');
    history.push('/');
  }
  useEffect(() => {
    async function fetchData(){
      try {
        const  { data : { stations } }  = await axios({
          method: 'GET',
          baseURL: 'http://localhost:8000',
          url: '/pollingStation',
        });
        setStations( stations );
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Fallo de Conexion',
          text: `${error}`,
        });
      }
    }
    
    fetchData();
    
  }, []);

  return (
    <>
      <h2 className="mt-4" style={{ textAlign:"center" }}>Confirmar Perfil</h2>
      <Container style={{ paddingRight:"20%", paddingLeft:"20%"}}>
        <Form onSubmit={ handleSubmit }>
          <Row>
            <Col>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  value={ email }
                  disabled={ true } 
                  type="email"
                  name="email" 
                  onChange={ handleInputChange }
                  />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control 
                  value={ name }
                  disabled={ true } 
                  type="text"
                  name="name" 
                  onChange={ handleInputChange }
                  />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Form.Group controlId="formBasicPhone">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control 
                  value={ cellphone } 
                  type="text"
                  name="cellphone" 
                  placeholder="Ingrese su número de teléfono"
                  onChange={ handleInputChange }
                  />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicIdCard">
                <Form.Label>Documento de Identidad</Form.Label>
                <Form.Control 
                  value={ idCard } 
                  type="text"
                  name="idCard" 
                  placeholder="Ingrese su número de documento"
                  onChange={ handleInputChange }
                  />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Form.Group controlId="selectStation">
                <Form.Label>Puesto de votación</Form.Label>
                <Form.Control
                  name="pollingStationID"
                  onChange={ handleInputChange } 
                  as="select">
                    <option>Seleccione puesto de votación</option>
                    {
                      !!stations && stations.length > 0 && stations.map( station => {
                        return(
                          <option 
                            key={station._id} 
                            value={station._id}>
                              {station.name}
                          </option>
                        )
                      })
                    }
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="selectCity">
                <Form.Label>Ciudad</Form.Label>
                <Form.Control
                  value={ city }
                  name="city"
                  onChange={ handleInputChange } 
                  as="select">
                  <option>Selecciones la ciudad</option>
                  <option>Pasto</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control 
                  type="password" 
                  name="password"
                  placeholder="Ingrese su contraseña"
                  onChange={ handleInputChange } 
                  value={ password }
                  />
              </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="formBasicPassword_2">
              <Form.Label>Confirma Contraseña</Form.Label>
              <Form.Control 
                type="password" 
                name="password2"
                placeholder="Confirme su contraseña"
                onChange={ handleInputChange } 
                value={ password2 }
                />
            </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Button 
                style={{width:"100%"}} 
                md="auto" 
                variant="primary" 
                type="submit">           
                  Enviar
              </Button>
            </Col>
            <Col>
              <Button 
                style={{width:"100%"}} 
                md="auto"
                onClick={ handleCancel }
                variant="outline-danger" 
                type="submit">           
                  Cancelar
              </Button>
            </Col>
          </Row>
        </Form>
        
      </Container>
    </>
  )
}

export default Activate
