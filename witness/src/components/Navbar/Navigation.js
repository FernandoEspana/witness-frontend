import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/loginAction';
import { useSelector } from 'react-redux';

const Navigation = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const { name } = useSelector(state => state.loginReducer);
  const handleClick = (whatLinkIs) => {
    switch (whatLinkIs) {
      case 'home':
          history.push('/home');
        break;
      case 'newStation':
        //TODO: Modal para agregar puesto de votación
        break;
      case 'newWitness':
        //TODO: Modal para agregar puesto
        break;
      case 'logout':
          history.push('/');
          dispatch(logout());
        break;
      default:

        break;
    
    }
  }

  return (
    <Navbar  bg="dark" variant="dark" style={{ padding: "20px"}}>
      <Navbar.Brand>{ name }</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link onClick={ () => handleClick('home') }>Home</Nav.Link>
        <Nav.Link onClick={ () => handleClick('newStation') }>Nuevo Puesto</Nav.Link>
        <Nav.Link onClick={ () => handleClick('newWitness') }>Nuevo Testigo</Nav.Link>
        <Nav.Link onClick={ () => handleClick('logout') }>Logout</Nav.Link>
      </Nav>
    </Navbar>
  )
}
    
export default Navigation
    

