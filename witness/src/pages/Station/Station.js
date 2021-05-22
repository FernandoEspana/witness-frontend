import React, { useState, useEffect } from 'react'
import Navigation from '../../components/Navbar/Navigation';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Container, Row, Col, Alert, Table, Button } from 'react-bootstrap';
import PieChart from '../../components/PieChart/PieChart';

const Station = () => {
  let{ stationId } = useParams();
  const [data, setData] = useState({});
  const [cont, setCont] = useState(0);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const  { data }  = await axios({
          method: 'PUT',
          baseURL: 'http://localhost:8000',
          url: `/pollingStation/${ stationId }`,
        });
        setData(data);
        
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Fallo de Conexion',
          text: `${error}`,
        });
      }
    }
    
    fetchData();
  },[cont]);

  const { percentageCovered, pollingStation, tablesLeft } = data;
  
  console.log(data);

  const handleDelete= async ( witnessId, witnessName ) => {
    console.log(witnessId, witnessName );
    try {
      await axios({
        method: 'DELETE',
        baseURL: 'http://localhost:8000',
        url: '/witness/delete',
        data: {
          user: `${ witnessId }`,
        }

      })
    } catch(error) {
      console.log(error);
    }
    setCont(cont + 1);
  }
  
  return (
    
    <>
      <Navigation />
      <Container className="mt-3">
        <Row style={{ textAlign:"center" }}>
          <h2>Puesto de votacion: { pollingStation?.name } </h2>
        </Row>
        <Row className="mt-3">
          <Col md={4} xs={12}>
            <PieChart 
              tables={ tablesLeft } 
              witness={ pollingStation?.witnessIDs.length }
              style={{ Width:"300px"}} 
            />          
          </Col>
          <Col>
            <Alert variant='primary'>
              Total de mesas: { pollingStation?.tablesNumber }
            </Alert>
            <Alert variant='primary'>
              Testigos inscritos: { pollingStation?.witnessIDs.length }
            </Alert>
            <Alert variant='success'>
              Porcentaje cubierto: { percentageCovered } %
            </Alert>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nro.</th>
                  <th>Nombre</th>
                  <th>Cedula Nro.</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  pollingStation?.witnessIDs.length > 0 
                  && 
                  pollingStation.witnessIDs.map((witness, idx) => {
                    return( 
                      <tr key={ witness._id }>
                        <td>{ idx + 1  }</td>
                        <td>{ witness.name }</td>
                        <td>{ witness.idCard }</td>
                        <td>{ witness.email }</td>
                        <td><Button 
                              variant="danger" 
                              onClick= { ()=> handleDelete( witness._id, witness.name ) }>
                                Eliminar
                            </Button>
                        </td>
                      </tr>)
                    }) 
                }
              </tbody>
            </Table>
          </Col>
        </Row>

      </Container>
    </>
  )
}

export default Station
