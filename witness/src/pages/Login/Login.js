import React from 'react';
import { useHistory } from 'react-router-dom'; 
import { useForm } from '../../hooks/useForm';
import { Image, Button, Form, Container, Row, Col } from 'react-bootstrap';
import { loginEmailPassword } from '../../actions/loginAction';
import { useDispatch } from 'react-redux';

const Login = () => {

  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    email: '',
    password: '',
  });

  const { email, password } = formValues;
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch( loginEmailPassword(email, password, history));
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col sm={2} className="m-auto">
          <Image 
            src="https://res.cloudinary.com/djugjzinn/image/upload/v1620774320/jqfvhpfjlzn4vluaimpr.png"
            className="d-block mx-auto img-fluid w-50"
            style={{
              width:"100px"
            }} 
          />
          <h3>Admin Login</h3>
        </Col>
        
      </Row>
    
    <Form onSubmit={ handleSubmit }>
      <Row >
        <Col md={{ span: 4, offset: 4 }}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                value={ email } 
                type="email"
                name="email" 
                placeholder="Ingrese su email"
                onChange={ handleInputChange }
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mt-2">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                name="password"
                placeholder="Ingrese su contraseña"
                onChange={ handleInputChange } 
                value={ password }
                />
            </Form.Group>
            <Button 
              style={{width:"100%"}} 
              md="auto" 
              variant="primary" 
              type="submit" 
              className="mt-2">           
                Login
            </Button>
        </Col>
      </Row>
    </Form>
    </Container>
  )
}

export default Login