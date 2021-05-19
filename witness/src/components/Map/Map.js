import React, { useState, useRef } from 'react'
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import ReactMapGL, { Marker } from 'react-map-gl';
import stationIcon from '../../assets/station.svg';

const Map = ({pollingStations}) => {
  let history = useHistory();
  const [viewport, setViewport] = useState({
    latitude: 1.214926,
    longitude: -77.276670,
    zoom: 10, 
  });

  const handleStation = ( stationId ) => {
    history.push(`/home/${ stationId }`)
  }
 
  return (
    <Container>
      <ReactMapGL 
        {...viewport}
        width="100vh"
        height="90vh"
        mapboxApiAccessToken={ process.env.REACT_APP_MAPBOX_TOKEN }
        mapStyle="mapbox://styles/spaincode/ckotflupp1bgk18s1na0n3unz"
        onViewportChange={ viewport => {
          setViewport(viewport);
        }}
      >
        {!!pollingStations && pollingStations.length>0 && pollingStations.map((station) => {
          return (
            <Marker 
              key={ station._id } 
              latitude={ station.latitud } 
              longitude={ station.longitud }
            >
              <div><small>{ station.name }</small></div>
              <button onClick={ () => handleStation(station._id) } className="marker-btn">
                <img src={ stationIcon } alt="station icon" />
              </button>
            </Marker>
          )
        })}
      </ReactMapGL>
    </Container>
  )
}

export default Map
