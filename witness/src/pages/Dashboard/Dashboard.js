import React, { useState, useEffect } from 'react';
import Navigation from '../../components/Navbar/Navigation';
import { Row, Col, Container, Alert} from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import PieChart from '../../components/PieChart/PieChart';
import Map from '../../components/Map/Map';

const Dashboard = () => {

  const [data, setData] = useState({});

  useEffect(async () => {
    
    try {
      const  { data }  = await axios({
        method: 'GET',
        baseURL: 'http://localhost:8000',
        url: '/pollingStation',
      });
      setData(data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Fallo de Conexion',
        text: `${error}`,
      });
    }
      
  }, []);

    const {
      percentageCovered,
      stations,
      tablesLeft,
      totalStations,
      totalTables,
      totalWitneses,
    } = data;

  return (
    <>
      <Navigation />
      <Container>
        <Row>
          <Col className="mt-3" xs={12} md={8}>
            <Map pollingStations={ stations }/>
          </Col>
          <Col className="mt-3" xs={12} md={4}>
            <Alert variant='primary'>
              Total puestos de votación: { totalStations }
            </Alert>
            <Alert variant='primary'>
              Total de mesas: { totalTables }
            </Alert>
            <Alert variant='success'>
              Porcentaje cubierto: { percentageCovered } %
            </Alert>
            <PieChart 
              tables={ tablesLeft } 
              witness={ totalWitneses } style={{ innerWidth:"300px"}} />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Dashboard
