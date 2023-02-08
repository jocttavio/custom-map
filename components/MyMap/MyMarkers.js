import { Marker, Popup, useMapEvents } from 'react-leaflet'
export default function MyMarkers({ locations, MarkerIcon }) {
    const map = useMapEvents({})

    return (
        <>
            {locations.length > 0 &&
                (<>
                    {
                        locations.map((info, index) => {
                            return (
                                <Marker key={index} position={{ lat: info.latitud , lng: info.longitud }} icon={MarkerIcon} eventHandlers={{
                                    click: (e) => {
                                        map.locate()
                                        map.flyTo([(e.latlng.lat + 0.0009).toString(), e.latlng.lng.toString()], 18)
                                    },
                                }}>
                                    <Popup>
                                        hola
                                    </Popup>
                                </Marker>
                            )
                        })
                    }
                </>)
            }
        </>
    )
}
