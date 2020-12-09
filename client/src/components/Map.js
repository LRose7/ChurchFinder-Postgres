import React, { useState, useRef, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';


const Map = () => {
    const [selectedChurch, setSelectedChurch] = useState(null);
    const [churches, setChurches] = useState([]);
    const [viewport, setViewport] = useState({
        longitude: -85.1386015,
        latitude: 41.0799898,
        width: '97vw',
        height: '70vh',
        zoom: 11
    });

    const mapRef = useRef();

    const getchurches = async () => {
        try {
            const response = await fetch('/churches');
            const jsonData = await response.json();

            setChurches(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getchurches();
    }, []);

    return (
        <div>
            <ReactMapGL
            className='mapContainer'
            {...viewport}
            mapStyle='mapbox://styles/mapbox/streets-v9'
            maxZoom={20}
            mapboxApiAccessToken= {process.env.REACT_APP_MAPBOX_TOKEN}
            onViewportChange={(newViewport) => {
                setViewport({ ...newViewport });
              }}
              ref={mapRef}
              >
                  {churches.map(church =>

                    <Marker
                    key={church.church_id}
                    longitude={parseFloat(church.longitude)}
                    latitude={parseFloat(church.latitude)}
                    offsetLeft={-20}
                    offsetTop={-10}
                    >
                        <div>
                            <button
                            className='marker-btn'
                            onClick={e => {
                                e.preventDefault();
                                setSelectedChurch(church);
                              }}
                            >
                            <img src='/theOne.svg' alt='Church Clipart Photos' />
                            </button>
                        </div>
                      </Marker>
                  )}

                {/* ternary operator - if it is the selectedChurch then show Popup.  If not null. */}

                  {selectedChurch ? (

                    <Popup
                    className='popup'
                    latitude={parseFloat(selectedChurch.latitude)}
                    longitude={parseFloat(selectedChurch.longitude)}
                    >

                        {/* Using a simple redirect to close the popup window.  Looking for a smoother way to do so. */}
                        <div className='close-popup-btn'>
                            <button className='close-popup'
                            onClick={e => {
                                e.preventDefault();
                                window.location.href = '/churchmap'
                            }}
                            >
                                x
                            </button>
                        </div>
                        <div>
                            <ul className='marker-popup'>
                                <li>
                                <h2>{selectedChurch.name}</h2>
                                </li>
                                <li>
                                <h4>
                                    {selectedChurch.mailing_one}<br></br>
                                    {selectedChurch.mailing_two}<br></br>
                                    {selectedChurch.city}, {selectedChurch.state} {selectedChurch.postal_code}
                                </h4>
                                </li>
                                <li>
                                <a className='church-links' href={selectedChurch.web_url} target='_blank' rel='noopener noreferrer'>{selectedChurch.web_url}</a>
                                </li>
                            </ul>
                        </div>
                    </Popup>
                  ) : null}

            </ReactMapGL>
        </div>
    )
}

export default Map;